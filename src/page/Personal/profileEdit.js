import './educateEdit.css';
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { NavLink } from 'react-router-dom';
import profilePic from '../../page/EditInfo/profilePic.png';
import { useState , useEffect } from 'react';
import api from '../../api/api.js';
import { ThaiDateString } from '../Mobile-App/thai_date_format.js';

const ProfileEdit = () => {

    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState([])

    const ProfessorID = "2e76190e-8eb5-49c1-b47f-b66f6a33d2e6";

    const fetchTodo = async () => {
        try {
            const response1 = await api.get(`/jointtablecv/professor_academic/${ProfessorID}`)
            setTodos(response1.data.results[0])
            const response2 = await api.get(`/Academic/getdataby_profID/${ProfessorID}`)
            setTodo(response2.data.results[0])
            console.log(response1.data)
            console.log(response2.data)
        } catch (error) {
            console.log('error', error)
        }
    }

    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchTodo()
    }, [])

    const monthNames = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
        "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม.",
        "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];

    const thaidate1 = ThaiDateString(todos.DateOfBirth);

    // const professDetail = {thprefix: "ดร.",thfname: "ธนวิชญ์",thlname: "อนุวงศ์พินิจ", enprefix: "Dr.",enfname: "Thanavit", enlname: "Anuwonpinit", position: "อาจารย์ประจำหลักสูตรวิศวกรรมระบบไอโอทีและสารสนเทศ"};
    // const professProfile = {birth: "5 มีนาคม 2550", gender: "ชาย", department: "วิศวกรรมคอมพิวเตอร์", group: "วิศวกรรมระบบไอโอทีและสารสนเทศ", email: "thanavit.an@kmitl.ac.th", tel: "000 - 000 - 0000", room: "E12 - 1105"};

    return (
        <>
            <div className='content'>
                <div className='header'>
                    <div className='text'>ประวัติส่วนตัว</div>
                    {/* <NavLink to="/" className='link'>แก้ไขข้อมูล</NavLink> */}
                </div>

                <div className='profileimg'>
                    <img src={profilePic} alt="profile" className='profilepic'/>
                </div>

                <div className='profess-detail'>
                    <div className='th-name'>{todos.AcademicRankPosition} {todos.FirstNameTH} {todos.LastNameTH}</div>
                    <div className='en-name'>{todos.AcademicRankPositionEng} {todos.FirstNameEng} {todos.LastNameEng}</div>
                    <div className='position'>อาจารย์ประจำหลักสูตร{todo.Department}</div>
                </div>

                <div className='profile-detail'>
                    <table>
                        <tr>
                            <th>วันเกิด</th>
                            <td>: {thaidate1}</td>
                        </tr>
                        <tr>
                            <th>เพศ</th>
                            <td>: {todos.Gender}</td>
                        </tr>
                        <tr>
                            <th>ภาควิชา</th>
                            <td>: {todo.Department}</td>
                        </tr>
                        <tr>
                            <th>หลักสูตร</th>
                            <td>: {todo.ProgramName}</td>
                        </tr>
                        <tr>
                            <th>อีเมล</th>
                            <td>: {todos.Email}</td>
                        </tr>
                        <tr>
                            <th>เบอร์โทรศัพท์</th>
                            <td>: {todos.Phone}</td>
                        </tr>
                        <tr>
                            <th>สถานที่ทำงาน</th>
                            <td>: {todos.OfficeLocation}</td>
                        </tr>
                    </table>
                </div>

                <div className='to-top-btn'></div>
            </div>
        </>
    )
}

export default ProfileEdit;