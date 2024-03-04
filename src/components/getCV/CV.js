import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './CV.css';
import email from './email.png';
import phone from './phone-call.png';
import building from './building-silhouette.png';


const CV = () => {

    const [name_contact, setNameContact] = useState(null);
    const [program, setProgram] = useState(null);
    const [edubackground, setEdubackground] = useState(null);
    const [proceeding, setProceeding] = useState(null);
    const [journal, setJournal] = useState(null);
    const [project, setProject] = useState(null);
    const [otherProject, setOtherProject] = useState(null);
    const [interestTopic, setInterestTopic] = useState(null);
    const [image, setImage] = useState(null);
    const [course, setCourse] = useState(null);
    const fetchData = async () => {
        const ID = "2e76190e-8eb5-49c1-b47f-b66f6a33d2e6";
        try {

            const response1 = await api.get(`/jointtablecv/professor_academic/${ID}`);
            setNameContact(response1.data.results[0]);


            const response2 = await api.get(`/Academic/getdataby_profID/${ID}`);
            setProgram(response2.data.results);


            const response3 = await api.get(`/EduBackground/getdataby_profID/${ID}`);
            setEdubackground(response3.data.results);

            //--------------------------------------------------
            //part4

            const response4 = await api.get(`/proceeding/GETProceeding/${ID}`)
            setProceeding(response4.data.results);

            const response5 = await api.get(`/proceeding/GETJournal/${ID}`);
            setJournal(response5.data.results);

            const response6 = await api.get(`/project/GETProject/${ID}`);
            setProject(response6.data.results);

            const response7 = await api.get(`/project/GETOtherProject/${ID}`);
            setOtherProject(response7.data.results);

            //--------------------------------------------------
            //part5

            const response8 = await api.get(`/ResearchInterestTopic/getdataby_profID/${ID}`);
            setInterestTopic(response8.data.results);

            //--------------------------------------------------

            const response9 = await api.get(`/coursetaught/getdataby_profID/${ID}`)
            setCourse(response9.data.results);

            //--------------------------------------------------
            const imagedata = await api.get(`/image/read/${ID}`)
            setImage(imagedata.data[0].url);

        } catch (err) {
            console.error('Error fetching data:', err);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const generatePDF = () => {
        const input = document.getElementById('pdf-container');

        html2canvas(input)
            .then((canvas) => {
                const pdf = new jsPDF('p', 'mm', 'a4');
                pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);
                pdf.save('cv.pdf');
            });
    }

    if (!name_contact || !program || !edubackground || !proceeding || !journal || !project || !otherProject || !interestTopic || !image || !course) {
        // console.log(name_contact)
        // console.log(program)
        // console.log(edubackground)
        console.log(name_contact)

        return <p>Loading...</p>; // You can replace this with a loading indicator
    }

    return (
        <>
            <div id="pdf-container">
                <div className="outProfile">
                    <div className="nameProfile">
                        <div className="nameThai">{name_contact.AcademicRankPosition} {name_contact.FirstNameTH} {name_contact.LastNameTH}</div>
                        <div className="nameEng">{name_contact.AcademicRankPositionEng} {name_contact.FirstNameEng} {name_contact.LastNameEng}</div>
                        <div className="statusLecture">{program.ProgramName}</div>
                    </div>
                    <div className="pictureProfile"><img src={image} alt="" /></div>
                </div>

                <div className="under-line"></div>
                <div className="cont-edu">
                    <div className="profileContract">
                        <div className="headcont-edu">ช่องทางการติดต่อ</div>
                        <div className="con-list">
                            <label><img src={phone} alt="" /></label>
                            <label className="dCont">{name_contact.Phone}</label>
                        </div>
                        <div className="con-list">
                            <label><img src={email} alt="" /></label>
                            <label className="dCont">{name_contact.Email}</label>
                        </div>
                        <div className="con-list">
                            <label><img src={building} alt="" /></label>
                            <label className="dCont">{name_contact.OfficeLocation}</label>
                        </div>
                    </div>
                    <div className="groupEdu">
                        <div className="line-st"></div>
                        <div className="profileEdu">
                            <div className="headcont-edu">ประวัติการศึกษา</div>
                            {
                                edubackground.map((element) => {
                                    return (
                                        <div className="eduBackground">
                                            <div className="years">{ }</div>
                                            <div className="coll">
                                                <div className="degreeCourse"> {element.Degree} {element.Faculty} {element.Program}</div>
                                                <div className="university">{element.Institute}</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="profilePerformance">
                    <div className="headPerformance">ผลงานวิชาการ</div>
                    <ol>
                        {
                            journal.map((element) => {
                                return (
                                    <div className="profileList">

                                        <li className="h-list-performance">
                                            <div className="h-list-performance">
                                                {element.Topic}
                                            </div>
                                            <div className="p-list-performance">
                                                {element.PublishedDate.slice(0, 4)} | {element.Publisher}
                                            </div>
                                            <div className="p-list-performance">
                                                {element.Description}
                                            </div>
                                        </li>
                                    </div>
                                )
                            })
                        }
                        {
                            proceeding.map((element) => {
                                return (
                                    <div className="profileList">
                                        <li className="h-list-performance">
                                            <div className="h-list-performance">
                                                {element.Topic}
                                            </div>
                                            <div className="p-list-performance">
                                                {element.PublishedDate.slice(0, 4)} | {element.Publisher}
                                            </div>
                                            <div className="p-list-performance">
                                                {element.Description}
                                            </div>
                                        </li>
                                    </div>
                                )
                            })
                        }
                        {
                            project.map((element) => {
                                return (
                                    <div className="profileList">
                                        <li className="h-list-performance">
                                            <div className="h-list-performance">
                                                {element.ProjectName}
                                            </div>
                                            <div className="p-list-performance">
                                                {element.StartDate.slice(0, 4)} - {element.EndDate.slice(0, 4)} | {element.FundingType} : {element.Funder}
                                            </div>
                                            <div className="p-list-performance">
                                                {element.Description}
                                            </div>
                                        </li>
                                    </div>
                                )
                            })
                        }
                        {
                            otherProject.map((element) => {
                                return (
                                    <div className="profileList">
                                        <li className="h-list-performance">
                                            <div className="h-list-performance">
                                                {element.Title}
                                            </div>
                                            <div className="p-list-performance">
                                                {element.Description}
                                            </div>
                                        </li>
                                    </div>
                                )
                            })
                        }
                    </ol>
                </div>
                <div className="groupEdu">
                    <div className="teachInterest">
                        <div className="headPerformance">ภาระงานสอน</div>
                        <div className="profileList">
                            <ul>
                                {
                                    course.map((element) => {
                                        return (
                                            <li>
                                                <div className="d-list-performance">{element.Course}</div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="teachInterest">
                        <div className="headPerformance">ความสนใจ</div>
                        <div className="profileList">
                            <ul>
                                {
                                    interestTopic.map((element) => {
                                        return (
                                            <li>
                                                <div className="d-list-performance">{element.Topic}</div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <button id="contactButton" onClick={generatePDF}>Get CV</button>
        </>
    )
}
export default CV;