import axios from "axios";
import {useEffect, useState} from "react";
import 'reactjs-popup/dist/index.css';
import Modal from 'react-modal';
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";

function Table() {

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [patients, setPatient] = useState([]);
    const [first_name, setPatient_firstname] = useState('')
    const [last_name, setPatient_lastname] = useState('')
    const [modalScreen, setModalScreen] = useState(0)
    const [patient, setPatientDetail] = useState([])
    const [notes, setNotes] = useState([])
    let [patient_obj, setPatient_obj] = useState('')
    const [content, setContent] = useState('')
    const [notesResult, setNotesResults] = useState([])
    const [patientResult, setPatientResult] = useState([])
    const [keywords, setKeywords] = useState('')
    const cookies = Cookie()
    const cookies_resp = cookies.get('token')
    const auth_header = {headers:{Authorization: 'Bearer ' + cookies_resp}}
    const navigate = useNavigate()
    const addClickHandler = (event) => {
        event.preventDefault()
        let data = {first_name, last_name}
        console.log(data)
        axios.post('http://127.0.0.1:8000/patients/', data).then(res=>console.log(res.data))
    }
    const noteClickHandler = (event) => {
        event.preventDefault()
        let data = {patient_obj, content}
        data.patient_obj = patient.id
        console.log(data)
        axios.post('http://127.0.0.1:8000/notes/', data).then(res=>console.log(res.data))
    }
    const logoutClickHandler = (event) => {
        cookies.remove('token');
        navigate('/pizdec-login', {replace: true})
        return false;
    }

    function OpenModal(param, patient = null) {
        setIsOpen(true);
        setModalScreen(1);
        if (param === 0) {
            setModalScreen(0)
        }
        if (param === 2) {
            setModalScreen(2)
            axios.get(`http://0.0.0.0:8000/patients/?kw=${keywords}`, auth_header).then(res=>setPatientResult(res.data))
            axios.get(`http://0.0.0.0:8000/notes/?kw=${keywords}`, auth_header).then(res=>setNotesResults(res.data))
        }


        if (patient) {
            let converted_patient = Object.entries(patient)
            let patient_id = converted_patient[0][1].id
            axios.get(`http://0.0.0.0:8000/patients/${patient_id}/`, auth_header).then(res=>setPatientDetail(res.data))
            axios.get(`http://0.0.0.0:8000/notes/?id=${patient_id}`, auth_header).then(res=>setNotes(res.data))
        }
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(()=>{
        axios.get('http://0.0.0.0:8000/patients/', auth_header)
        .then(res=>setPatient(res.data))
    }, [addClickHandler])

    return (
        <div>
            <button onClick={OpenModal}>
                Add
            </button>

                <input value={keywords} onChange={event => setKeywords(event.target.value)}/>
                <button onClick={()=>OpenModal(2)}>Search</button>
            <button onClick={logoutClickHandler}>
                Logout
            </button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
                {modalScreen === 1 && (
                    <div>
                        <div>Personal info:</div>
                        <form onSubmit={addClickHandler}>
                        <label> First name </label>
                        <input value={first_name} onChange={event => setPatient_firstname(event.target.value)}/>
                        <label> Last name </label>
                        <input value={last_name} onChange={event => setPatient_lastname(event.target.value)}/>
                        <input type={"submit"}/>
                        </form>
                        <button onClick={closeModal}>close</button>
                    </div>
                )}
                {modalScreen === 0 && (
                    <div>
                        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                        <div>Personal info:</div>
                        <div>
                            Firstname: {patient.first_name}
                            <br/>
                            Lastname: {patient.last_name}
                            <br/>
                            Notes:
                            <br/>
                            {notes.map(note=>
                                <div key={note.id}>
                                    {new Date(note.created_at).getUTCDate()}/
                                    {new Date(note.created_at).getUTCMonth()}/
                                    {new Date(note.created_at).getUTCFullYear()} &nbsp;
                                    {new Date(note.created_at).getUTCHours()}:
                                    {new Date(note.created_at).getUTCMinutes()} &nbsp;
                                    {note.content}
                                </div>
                            )}
                        </div>
                        <form onSubmit={noteClickHandler}>

                            <input type={"hidden"} value={patient_obj} onChange={event => setPatient_obj(event.target.value)}/>
                            <label>Content: </label>
                            <input value={content} onChange={event => setContent(event.target.value)}/>
                            <input type={"submit"}/>
                        </form>
                        <button onClick={closeModal}>close</button>
                    </div>
                )}
                {modalScreen === 2 && (
                    <div>
                        Patients:
                        <br/>
                        {patientResult.map(res_patient=>
                            <div key={res_patient.id}>
                                {res_patient.first_name}
                                &nbsp;
                                {res_patient.last_name}
                                <br/>
                            </div>
                        )}
                        <br/>
                        Notes:
                        <br/>
                        {notesResult.map(res_note=>
                            <div>
                            {res_note.content}
                                </div>
                        )}

                    </div>

                )
                }

            </Modal>

            <table>
                <tbody>
                <tr>
                    <th>
                        Number
                    </th>
                    <th>
                        Fullname
                    </th>
                </tr>
                {patients.map(patient =>
                    <tr key={patient.id}>
                        <td>
                            {patient.id}
                        </td>
                        <td onClick={() => OpenModal(0, {patient})} >
                            {patient.first_name} {patient.last_name}
                        </td>
                    </tr>
                )
                }
                </tbody>
            </table>

        </div>
    )
}
export default Table
