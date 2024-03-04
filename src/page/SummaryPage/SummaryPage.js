import '../Journal/Journal.css';
import '../Personal/personalEdit.css';
import '../EducationBackground/educateEdit.css';
import profilePic from '../../page/EditInfo/profilePic.png';
import { useState , useEffect, useContext } from 'react';
import api from '../../api/api.js';
import ThaiDate from '../../components/date-convert/thaidate.js';
import Cookies from 'universal-cookie';
import { ImageContext } from '../../components/imageContext/imageContext.js';
import { Link, useLocation } from 'react-router-dom';
import undefinedImg from '../Search/undefinedPerson.jpeg'
function setType(ID) {
    const typeList = [
        {typeID: 1, value: "มีผลงานนำเสนอในที่ประชุมวิชาการ/วิชาชีพ ที่สภาวิชาการรับรอง และมีผลงานเรื่องเต็มตีพิมพ์ใน Proceeding"},
        {typeID: 2, value: "Proceeding ตีพิมพ์ในฐานข้อมูล Scopus"},
        {typeID: 3, value: "Reasearch paper/Review article "},
        {typeID: 4, value: "Short  communication/Note"}
    ]
    const selectedType = typeList.find(type => type.typeID === ID)
    return selectedType.value
}

function SummaryProfile() {

    const location = useLocation();
    const { data } = location.state

    const ProfessorID = data.ProfessorID


    const [proceeding, setProceeding] = useState([])
    const [journal, setJournal] = useState([])
    const [eduBackground, setEduBackground] = useState([])
    const [professor, setProfessor] = useState([]);
    const [academic, setAcademic] = useState([]);

    const fetchAcademic = async() => {
        try{
            const response2 = await api.get(`/Academic/getdataby_profID/${ProfessorID}`)
            setAcademic(response2.data.results[0])
            console.log("Herer",response2.data.results[0]);
        }
        catch(err){

        }
    }
    const fetchProf = async () => {
        try {
            
            const response1 = await api.get(`/jointtablecv/professor_academic/${ProfessorID}`)
            setProfessor(response1.data.results[0]);
        } catch (error) {
            console.log('error', error)
        }
    }

    const fetchEdu = async () => {
        try{
        const EducationBackground = await api.get(`/EduBackground/getdataby_profID/${ProfessorID}`)
        setEduBackground(EducationBackground.data.results)
        }
        catch(error) {
            console.log('error', error)
        }
    }


    const fetchJournal = async () => {
        try {
            
            const _Journal = await api.get(`/proceeding/GETJournal/${ProfessorID}`)
            setJournal(_Journal.data.results)

        } catch (error) {
            console.log('error', error)
        }
    }
    const fetchProceeding = async () => {
        const _Proceeding = await api.get(`/proceeding/GETProceeding/${ProfessorID}`)
            setProceeding(_Proceeding.data.results)
    }
    useEffect(() => {
       fetchJournal();
       fetchEdu();
       fetchProceeding();
       fetchProf();
       fetchAcademic();
    },[])

    return (
        <>
            <div className='content'>
                <div className='header'>
                    <div className='text'>ประวัติส่วนตัว</div>
                </div>

                <div className='profileimg'>
                    <div>
                        {data.url? (
                            <img src={data.url} alt="profile" className='profilepic' />
                        ) : (
                            <img src={undefinedImg} alt="default-profile" className='profilepic' />
                        )}
                    </div>
                </div>

                <div className='profess-detail'>
                    <div className='th-name'>{professor.AcademicRankPositionEng} {professor.FirstNameTH} {professor.LastNameTH}</div>
                    <div className='en-name'>{professor.AcademicRankPositionEng} {professor.FirstNameEng} {professor.LastNameEng}</div>
                    <div className='position'>อาจารย์ประจำหลักสูตร{professor.Department}</div>
                </div>

                <div className='profile-detail'>
                    <table>
                        <tr>
                            <th>วันเกิด</th>
                            <td>:</td>
                            <td>{professor.DateOfBirth && (<ThaiDate isoDate={professor.DateOfBirth} />)}</td>

                        </tr>
                        <tr>
                            <th>เพศ</th>
                            <td>:</td>
                            <td>{professor.Gender}</td>
                        </tr>
                        <tr>
                            <th>ภาควิชา</th>
                            <td>:</td>
                            <td>{academic.Department}</td>
                        </tr>
                        <tr>
                            <th>หลักสูตร</th>
                            <td>:</td>
                            <td>{data.ProgramName}</td>
                        </tr>
                        <tr>
                            <th>อีเมล</th>
                            <td>:</td>
                            <td>{professor.Email}</td>
                        </tr>
                        <tr>
                            <th>เบอร์โทรศัพท์</th>
                            <td>:</td>
                            <td>{professor.Phone}</td>
                        </tr>
                        <tr>
                            <th>สถานที่ทำงาน</th>
                            <td>:</td>
                            <td>{professor.OfficeLocation}</td>
                        </tr>
                    </table>
                </div>
                
                <div className='to-top-btn'></div>
             
                <div className='edu-detail'>
                    {eduBackground.map((element,index)=>{
                        return(
                                <div className='group' key={index}>
                                    <div className="degree-list">{element.Degree} {element.Year}</div>
                                    <div className="field-list">{element.Faculty} | {element.Program}</div>
                                    <div className="institue-list">{element.Institute}</div>
                                </div>
                        )
                    })}
                </div>

                <div className='to-top-btn'>
                    {/* <ArrowUpToLine/> */}
                </div>

                <div className='edu-detail'>
                    {proceeding.map((element,index)=>{
                            return(
                                <div className='project' key={index}>
                                    <div className='headlist'>โครงการบริการวิชาการ</div>
                                    <div className='headPer'>{element.Topic} <br/>({element.PublishedDate && (<ThaiDate isoDate={element.PublishedDate}/>)})</div>
                                    {/* <div className='j-name'>{element.journalName}</div> */}
                                    <table>
                                        <tr>
                                            <th>ประเภทระดับผลงาน</th>
                                            <td>:</td>
                                            <td>{setType(element.TypeID)}</td>
                                        </tr>
                                        <tr>
                                            <th>ระดับ</th>
                                            <td>:</td>
                                            <td>{element.Level}</td>
                                        </tr>
                                        <tr>
                                            <th>ตีพิมพ์ในวารสารที่อยู่ในฐานข้อมูล</th>
                                            <td>:</td>
                                            <td>{element.AcadDatabase}</td>
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
                                            <td>{element.AuthorProfessorID}</td>
                                        </tr>
                                        <tr>
                                            <th>คำอธิบาย</th>
                                            <td>:</td>
                                            <td>{element.Description}</td>
                                        </tr>
                                    </table>
                                </div>
                            )
                        })}
                        {journal.map((element,index)=>{
                            return(
                                <div className='journal' key={index}>
                                    <div className='headlist'>วารสารวิชาการ</div>
                                    <div className='headPer'>{element.Topic} <br/>({element.PublishedDate && (<ThaiDate isoDate={element.PublishedDate}/>)})</div>
                                    {/* <div className='j-name'>{element.journalName}</div> */}
                                    <table>
                                        <tr>
                                            <th>ประเภทระดับผลงาน</th>
                                            <td>:</td>
                                            <td>{setType(element.TypeID)}</td>
                                        </tr>
                                        <tr>
                                            <th>ระดับ</th>
                                            <td>:</td>
                                            <td>{element.Level}</td>
                                        </tr>
                                        <tr>
                                            <th>ตีพิมพ์ในวารสารที่อยู่ในฐานข้อมูล</th>
                                            <td>:</td>
                                            <td>{element.AcadDatabase}</td>
                                        </tr>
                                        <tr>
                                            <th>อ้างอิงจากฐานข้อมูล</th>
                                            <td>:</td>
                                            <td>{element.Publisher}</td>
                                        </tr>
                                        <tr>
                                            <th>ระดับ Quartile</th>
                                            <td>:</td>
                                            <td>{element.Quatile}</td>
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
                                            <td>{element.AuthorProfessorID}</td>
                                        </tr>
                                        <tr>
                                            <th>คำอธิบาย</th>
                                            <td>:</td>
                                            <td>{element.Description}</td>
                                        </tr>
                                    </table>
                                </div>
                            )
                        })}
                    
                </div>

                <div className='to-top-btn'></div>
            </div>
        </>
    )

}

export default SummaryProfile;