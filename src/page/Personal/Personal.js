import './personalEdit.css';
import profilePic from '../../page/EditInfo/profilePic.png';
import { useState, useEffect,useContext } from 'react';
import api from '../../api/api.js';
import ThaiDate from '../../components/date-convert/thaidate.js';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import { ImageContext } from '../../components/imageContext/imageContext.js';


function ProfileEdit() {
    const { setImageUrl } = useContext(ImageContext);
   
    const cookies = new Cookies();
    const [profdata, setProfdata] = useState([])
    const [academic, setAcademic] = useState([])
    const ProfessorID = cookies.get('ProfessorID');
    const [image,setImage] = useState([]);

    
    const fetchTodo = async () => {
        try {
            const imgURL = await api.get(`/image/read/${ProfessorID}`)
            const response1 = await api.get(`/jointtablecv/professor_academic/${ProfessorID}`)
            setProfdata(response1.data.results[0])
            const response2 = await api.get(`/Academic/getdataby_profID/${ProfessorID}`)
            setAcademic(response2.data.results[0])
            setImage(imgURL.data[0].url);
            setImageUrl(imgURL.data[0].url);
            console.log(imgURL.data[0].url);
        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(() => {
        fetchTodo()
    },[])

    return (
        <>
            <div className='content'>
                <div className='header'>
                    <div className='text'>ประวัติส่วนตัว</div>
                    <Link to="/Personal/Edit" className='link' state={{ data: {academic,profdata} }}>แก้ไขข้อมูล</Link>
                </div>

                <div className='profileimg'>
                    <div>
                        {image? (
                            <img src={image} alt="profile" className='profilepic' />
                        ) : (
                            <img src={profilePic} alt="default-profile" className='profilepic' />
                        )}
                    </div>
                </div>

                <div className='profess-detail'>
                    <div className='th-name'>{profdata.AcademicRankPosition} {profdata.FirstNameTH} {profdata.LastNameTH}</div>
                    <div className='en-name'>{profdata.AcademicRankPositionEng} {profdata.FirstNameEng} {profdata.LastNameEng}</div>
                    <div className='position'>อาจารย์ประจำหลักสูตร{academic.Department}</div>
                </div>

                <div className='profile-detail'>
                    <table>
                        <tr>
                            <th>วันเกิด</th>
                            <td>:</td>
                            <td>{profdata.DateOfBirth && (<ThaiDate isoDate={profdata.DateOfBirth} />)}</td>

                        </tr>
                        <tr>
                            <th>เพศ</th>
                            <td>:</td>
                            <td>{profdata.Gender}</td>
                        </tr>
                        <tr>
                            <th>ภาควิชา</th>
                            <td>:</td>
                            <td>{academic.Department}</td>
                        </tr>
                        <tr>
                            <th>หลักสูตร</th>
                            <td>:</td>
                            <td>{academic.ProgramName}</td>
                        </tr>
                        <tr>
                            <th>อีเมล</th>
                            <td>:</td>
                            <td>{profdata.Email}</td>
                        </tr>
                        <tr>
                            <th>เบอร์โทรศัพท์</th>
                            <td>:</td>
                            <td>{profdata.Phone}</td>
                        </tr>
                        <tr>
                            <th>สถานที่ทำงาน</th>
                            <td>:</td>
                            <td>{profdata.OfficeLocation}</td>
                        </tr>
                    </table>
                </div>

                <div className='to-top-btn'></div>
            </div>
        </>
    )
}

export default ProfileEdit;