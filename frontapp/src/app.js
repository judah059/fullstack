import Login from "./components/login";
import {Routes, Route,} from "react-router-dom";
import Table from "./components/tables";

function App() {
    return (
        <div>
            <Routes>
                <Route path='/pizdec' element={<Table/>}/>
                <Route path='/pizdec-login' element={<Login/>}/>
            </Routes>

        </div>
    )
}

export default App