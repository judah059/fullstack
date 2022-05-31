import Login from "./components/login";
import {Routes, Route,} from "react-router-dom";
import Table from "./components/tables";

function App() {
    return (
        <div>
            <Routes>
                <Route path='/tables' element={<Table/>}/>
                <Route path='/login' element={<Login/>}/>
            </Routes>

        </div>
    )
}

export default App