import '../EducationBackground/educateEdit.css';
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { NavLink } from 'react-router-dom';
import profilePic from '../../page/EditInfo/profilePic.png';

const PerformanceEdit = () => {
    const professDetail = {thname: "ดร. ธนวิชญ์ อนุวงศ์พินิจ", enname: "Dr. Thanavit Anuwonpinit",position: "อาจารย์ประจำหลักสูตรวิศวกรรมระบบไอโอทีและสารสนเทศ"};

    const dataPerformances = [
        {headListPerformance: "โครงการบริการวิชาการ", PerformanceName: "ชื่อเรื่อง (วันที่ตอบรับการพิมพ์)", journalName: "ชื่อวารสาร/งานประขุมวิขาการ", typePerformance: "มีผลงานนำเสนอในที่ประชุมวิชาการ/วิชาชีพ ที่สภาวิชาการรับรอง และมีผลงานเรื่องเต็มตีพิมพ์ใน Proceeding", rank: "นานาชาติ", publish: "สภาวิชาการรับรอง", URL: "http://subjectguides.uwaterloo.ca", DOI: "http://dx.doi.org", 
        participant: "1. ดร.ธนวิชญ์ อนุวงศ์พินิจ"},
        {headListPerformance: "วารสารวิชาการ", PerformanceName: "ชื่อเรื่อง (วันที่ตอบรับการพิมพ์)", journalName: "ชื่อวารสาร/งานประขุมวิขาการ", typePerformance: "มีผลงานนำเสนอในที่ประชุมวิชาการ/วิชาชีพ ที่สภาวิชาการรับรอง และมีผลงานเรื่องเต็มตีพิมพ์ใน Proceeding", rank: "นานาชาติ", publish: "SCImago Journal Rank (SJR)", reference: "SCImago Journal Rank (SJR)", quartile: "Q1 (สูงกว่า 90)", URL: "http://subjectguides.uwaterloo.ca", DOI: "http://dx.doi.org", 
        participant: "1. ดร.ธนวิชญ์ อนุวงศ์พินิจ"}
      ];
      
    return (
            <div className='content'>
                <div className='header'>
                    <div className='text'>ประวัติการศึกษา</div>
                    <NavLink to="/PerformanceEdit1" className='link'>แก้ไขข้อมูล</NavLink>
                </div>

                <div className='profileimg'>
                    <img src={profilePic} alt="profile" className='profilepic'/>
                </div>

                <div className='profess-detail'>
                    <div className='th-name'>{professDetail.thname}</div>
                    <div className='en-name'>{professDetail.enname}</div>
                    <div className='position'>{professDetail.position}</div>
                </div>

                <div className='edu-detail'>
                    {dataPerformances.map((element)=>{
                        if (element.headListPerformance === "โครงการบริการวิชาการ") {
                            return(
                                <div className='project'>
                                    <div className='headlist'>{element.headListPerformance}</div>
                                    <div className='headPer'>{element.PerformanceName}</div>
                                    <div className='j-name'>{element.journalName}</div>
                                    <table>
                                        <tr>
                                            <th>ประเภทระดับผลงาน</th>
                                            <td>:</td>
                                            <td>{element.typePerformance}</td>
                                        </tr>
                                        <tr>
                                            <th>ระดับ</th>
                                            <td>:</td>
                                            <td>{element.rank}</td>
                                        </tr>
                                        <tr>
                                            <th>ตีพิมพ์ในวารสารที่อยู่ในฐานข้อมูล</th>
                                            <td>:</td>
                                            <td>{element.publish}</td>
                                        </tr>
                                        <tr>
                                            <th>URL</th>
                                            <td>:</td>
                                            <td>{element.URL}</td>
                                        </tr>
                                        <tr>
                                            <th>DOI</th>
                                            <td>:</td>
                                            <td>{element.DOI}</td>
                                        </tr>
                                        <tr>
                                            <th>ผู้มีส่วนร่วม</th>
                                            <td>:</td>
                                            <td>{element.participant}</td>
                                        </tr>
                                    </table>
                                </div>
                            )
                        } else if(element.headListPerformance === "วารสารวิชาการ") {
                            return(
                                <div className='journal'>
                                    <div className='headlist'>{element.headListPerformance}</div>
                                    <div className='headPer'>{element.PerformanceName}</div>
                                    <div className='j-name'>{element.journalName}</div>
                                    <table>
                                        <tr>
                                            <th>ประเภทระดับผลงาน</th>
                                            <td>:</td>
                                            <td>{element.typePerformance}</td>
                                        </tr>
                                        <tr>
                                            <th>ระดับ</th>
                                            <td>:</td>
                                            <td>{element.rank}</td>
                                        </tr>
                                        <tr>
                                            <th>ตีพิมพ์ในวารสารที่อยู่ในฐานข้อมูล</th>
                                            <td>:</td>
                                            <td>{element.publish}</td>
                                        </tr>
                                        <tr>
                                            <th>อ้างอิงจากฐานข้อมูล</th>
                                            <td>:</td>
                                            <td>{element.reference}</td>
                                        </tr>
                                        <tr>
                                            <th>ระดับ Quartile</th>
                                            <td>:</td>
                                            <td>{element.quartile}</td>
                                        </tr>
                                        <tr>
                                            <th>URL</th>
                                            <td>:</td>
                                            <td>{element.URL}</td>
                                        </tr>
                                        <tr>
                                            <th>DOI</th>
                                            <td>:</td>
                                            <td>{element.DOI}</td>
                                        </tr>
                                        <tr>
                                            <th>ผู้มีส่วนร่วม</th>
                                            <td>:</td>
                                            <td>{element.participant}</td>
                                        </tr>
                                    </table>
                                </div>
                            )
                        }
                        
                    })}
                </div>

                <div className='to-top-btn'></div>
            </div>
    )
}

export default PerformanceEdit