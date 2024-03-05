import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './CV.css';
import email from './email.png';
import phone from './phone-call.png';
import building from './building-silhouette.png';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

  
const CV = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [name_contact, setNameContact] = useState({});
    const [program, setProgram] = useState({});
    const [edubackground, setEdubackground] = useState([]);
    const [journal, setJournal] = useState([]);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState([]);
    const [otherProject, setOtherProjects] = useState([]);
    const [course, setCourse] = useState([]);
    const [interestTopic, setInterestTopic] = useState([]);

    const ProfessorID = cookies.get('ProfessorID');

    const fetchCVData = async () => {
        try {
            const response1 = await api.get(`/jointtablecv/professor_academic/${ProfessorID}`);
            setNameContact(response1.data.results[0]);

            const response2 = await api.get(`/Academic/getdataby_profID/${ProfessorID}`);
            setProgram(response2.data.results);

            const imagedata = await api.get(`/image/read/${ProfessorID}`)
            setImage(imagedata.data[0].url);

            const _Journal = await api.get(`/proceeding/GETJournal/${ProfessorID}`)
            setJournal(_Journal.data.results)

            // const projectData = await api.get(`/project/GETProject/${ProfessorID}`)
            // setProject(projectData.data.results)

            // const otherProjectData = await api.get(`/project/GETOtherProject/${ProfessorID}`);
            // setOtherProjects(otherProjectData.data.results)
            
            const EducationBackground = await api.get(`/EduBackground/getdataby_profID/${ProfessorID}`)
            setEdubackground(EducationBackground.data.results)

            const courseData = await api.get(`/coursetaught/getdataby_profID/${ProfessorID}`)
            setCourse(courseData.data.results);

            const interestTopicData = await api.get(`/ResearchInterestTopic/getdataby_profID/${ProfessorID}`);
            setInterestTopic(interestTopicData.data.results)

            setLoading(false); // Mark data loading as complete
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    }

    useEffect(() => {
        fetchCVData();
    }, []);

    const generatePDF = async () => {
        const input = document.getElementById('pdf-container');
        const image = document.getElementById('pictureProfile');


        html2canvas(input,{
            allowTainted: true,
            useCORS: true
        }).then((canvas) => {
                const pdf = new jsPDF('p', 'mm', 'a4');
                pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);
                pdf.save('cv.pdf');
            });
    }

    const printAndSave = () => {
        // Get the element by its ID
        const contactButton = document.getElementById('contactButton');
    
        // Check if the element is found
        if (contactButton) {
            // Set the display property to 'none' to hide the element
            contactButton.style.visibility = 'hidden';
    
            // Trigger the browser's print functionality
            window.print();
            navigate('/Personal');
            // Listen for the 'afterprint' event to show the button again
            
        } else {
            console.error("Element with ID 'contactButton' not found.");
        }

 
    };
    
    
    
    

    return (
        <>
            <div className='pageExportCV'>
                <div id="pdf-container" className="pdf-container">
                    <div className="outProfile">
                        <div className="nameProfile">
                            <div className="nameThai">{name_contact.AcademicRankPosition} {name_contact.FirstNameTH} {name_contact.LastNameTH}</div>
                            <div className="nameEng">{name_contact.AcademicRankPositionEng} {name_contact.FirstNameEng} {name_contact.LastNameEng}</div>
                            <div className="statusLecture">{program.ProgramName}</div>
                        </div>
                        <div className="pictureProfile"><img id="pictureProfile" src={image} alt="" /></div>
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
                            {/* <div className="line-st"></div> */}
                            <div className="profileEdu">
                                <div className="headcont-edu">ประวัติการศึกษา</div>
                                {
                                    edubackground.map((element) => {
                                        return (
                                            <div className="eduBackground">
                                                <div className="years">2023 - 2024</div>
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
                    <div className="headPerformance">ผลงานวิชาการ</div>
                    <div className="profilePerformance">
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
                            {/* {
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
                            } */}
                            {/* {
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
                            } */}
                        </ol>
                    </div>
                    <div className="groupEdu-1">
                        <div className="teachInterest">
                            <div className="headPerformance">ภาระงานสอน</div>
                            <div className="profileList-1">
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
                            <div className="profileList-1">
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
                <div className='cv-btn'>
                    <button id="contactButton" className="contactButton" onClick={printAndSave}>Get CV</button>
                </div>
            </div>            
        </>
    )
}
export default CV;