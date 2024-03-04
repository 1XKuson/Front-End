import './educateEdit.css';
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { NavLink } from 'react-router-dom';
import profilePic from '../../page/EditInfo/profilePic.png';

const ProfileEdit = () => {
    const professDetail = {thname: "ดร. ธนวิชญ์ อนุวงศ์พินิจ", enname: "Dr. Thanavit Anuwonpinit",position: "อาจารย์ประจำหลักสูตรวิศวกรรมระบบไอโอทีและสารสนเทศ"};
    const professProfile = {birth: "5 มีนาคม 2550", gender: "ชาย", department: "วิศวกรรมคอมพิวเตอร์", group: "วิศวกรรมระบบไอโอทีและสารสนเทศ", email: "thanavit.an@kmitl.ac.th", tel: "000 - 000 - 0000", room: "E12 - 1105"};

    return (
        <Router>
            <div className='content'>
                <div className='header'>
                    <div className='text'>ประวัติการศึกษา</div>
                    <NavLink to="/" className='link'>แก้ไขข้อมูล</NavLink>
                </div>

                <div className='profileimg'>
                    <img src={profilePic} alt="profile" className='profilepic'/>
                </div>

                <div className='profess-detail'>
                    <div className='th-name'>{professDetail.thname}</div>
                    <div className='en-name'>{professDetail.enname}</div>
                    <div className='position'>{professDetail.position}</div>
                </div>

                <div className='profile-detail'>
                    <table>
                        <tr>
                            <th>วันเกิด</th>
                            <td>: {professProfile.birth}</td>
                        </tr>
                        <tr>
                            <th>เพศ</th>
                            <td>: {professProfile.gender}</td>
                        </tr>
                        <tr>
                            <th>ภาควิชา</th>
                            <td>: {professProfile.department}</td>
                        </tr>
                        <tr>
                            <th>หลักสูตร</th>
                            <td>: {professProfile.group}</td>
                        </tr>
                        <tr>
                            <th>อีเมล</th>
                            <td>: {professProfile.email}</td>
                        </tr>
                        <tr>
                            <th>เบอร์โทรศัพท์</th>
                            <td>: {professProfile.tel}</td>
                        </tr>
                        <tr>
                            <th>สถานที่ทำงาน</th>
                            <td>: {professProfile.room}</td>
                        </tr>
                    </table>
                </div>

                <div className='to-top-btn'></div>
            </div>

            <Routes>
                {/* <Route path="/" element={}></Route> */}
            </Routes>
        </Router>
    )
}

export default ProfileEdit;