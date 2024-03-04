import './edit.css';
import ProFileEdit from './profile.js';

import { BrowserRouter as Router,Routes,Route,Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';

//contents
import Profile from "./profile.js"

function EditInfo(){
    return (
        <div>
            <Router>
                <div className='EditInfo'>
                    <div className='left-content'>
                        <div className='leftcontainer'>
                            <ul>
                                <li>
                                    <NavLink exact to="/" activeClassName="on-page-active">ประวัติส่วนตัว</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/edu" activeClassName="on-page-active">ประวัติการศึกษา</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/research" activeClassName="on-page-active">งานวิจัย</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/edu-work" activeClassName="on-page-active">งานวิชาการ</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/interest" activeClassName="on-page-active">สิ่งที่สนใจ</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/teach" activeClassName="on-page-active">ภาระงานสอน</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/student" activeClassName="on-page-active">จำนวนนักศึกษา</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='right-content'>
                        <Routes>
                        <Route path="/" element={<ProFileEdit/>} exact></Route>
                        {/* <Route path="/insert" element={<><FormComponent onAddItem={onAddNewItem}/> <Transaction items = {items}/> </>}></Route> */}
                        </Routes>
                    </div>
                </div>
            </Router>
        </div>
    )
}

export default EditInfo;