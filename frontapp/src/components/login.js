import {useState} from "react";
import axios from "axios";
import Cookie from "cookie-universal"
import {useNavigate} from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const cookies = Cookie()
    const cookies_resp = cookies.get('token')
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        let data = {email, password}
        axios.post('http://0.0.0.0:8000/api/token/', data)
            .then(res=>cookies.set('token', res.data.access, {path:'/', maxAge:30*24*60*60}))
        console.log(cookies_resp)
        navigate("/tables", { replace: true } );
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>email: </label>
                <input value={email} onChange={event => setEmail(event.target.value)}/>
                <br/>
                <label>password: </label>
                <input type={"password"} value={password} onChange={event => setPassword(event.target.value)}/>
                <input type={"submit"}/>
            </form>
        </div>
    )
}
export default Login