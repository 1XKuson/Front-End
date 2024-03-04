import './Journal.css';
import profilePic from '../../page/EditInfo/profilePic.png';
import { useState , useEffect, useContext } from 'react';
import api from '../../api/api.js';
import ThaiDate from '../../components/date-convert/thaidate.js';
import Cookies from 'universal-cookie';
import { ImageContext } from '../../components/imageContext/imageContext.js';
import { Link } from 'react-router-dom';
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

function JournalPage() {

    const cookies = new Cookies();
    const ProfessorID = cookies.get('ProfessorID');
    const { imageUrl } = useContext(ImageContext);

    const [proceeding, setProceeding] = useState([])
    const [journal, setJournal] = useState([])
    const [info1, setInfo1] = useState([])
    const [info2, setInfo2] = useState([])


    const fetchdata = async () => {
        try {
            const response1 = await api.get(`/proceeding/GETProceeding/${ProfessorID}`)
            setProceeding(response1.data.results)
            const response2 = await api.get(`/proceeding/GETJournal/${ProfessorID}`)
            setJournal(response2.data.results)
            const response3 = await api.get(`/jointtablecv/professor_academic/${ProfessorID}`)
            setInfo1(response3.data.results[0])
            const response4 = await api.get(`/Academic/getdataby_profID/${ProfessorID}`)
            setInfo2(response4.data.results[0])
            // console.log(todo)
            // console.log(info1)
            // console.log(info2)

        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(() => {
       fetchdata()
    }, [])
      
    return (
        <>
            <div className='content'>
                <div className='header'>
                    <div className='text'>งานวิชาการ</div>
                    <Link to="/JournalSelect"  className='link' state={{ data: {proceeding,journal} }} >แก้ไขข้อมูล</Link>
                </div>

                <div className='profileimg'>
                    <div>
                        <img src={imageUrl} alt="profile" className='profilepic'/>
                    </div>
                </div>

                <div className='profess-detail'>
                    <div className='th-name'>{info1.AcademicRankPosition} {info1.FirstNameTH} {info1.LastNameTH}</div>
                    <div className='en-name'>{info1.AcademicRankPositionEng} {info1.FirstNameEng} {info1.LastNameEng}</div>
                    <div className='position'>อาจารย์ประจำหลักสูตร{info2.Department}</div>
                </div>

                <div className='edu-detail'>
                    {proceeding.map((element,index)=>{
                            return(
                                <div className='project' key={index}>
                                    <div className='headlist'>โครงการบริการวิชาการ</div>
                                    <div className='headPer'>{element.Topic} ({element.PublishedDate && (<ThaiDate isoDate={element.PublishedDate}/>)})</div>
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
                                    <div className='headPer'>{element.Topic} ({element.PublishedDate && (<ThaiDate isoDate={element.PublishedDate}/>)})</div>
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

export default JournalPage;