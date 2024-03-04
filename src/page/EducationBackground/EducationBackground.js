import './educateEdit.css';
import profilePic from '../../page/EditInfo/profilePic.png';
import { useState , useEffect,useContext } from 'react';
import api from '../../api/api.js';
import EducateYear from '../../components/date-convert/educateYear';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { ImageContext } from '../../components/imageContext/imageContext.js';


function EducationBackground() {
    const { imageUrl } = useContext(ImageContext);

    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState([])
    const [todo1, setTodo1] = useState([])
    const cookies = new Cookies();
    const ProfessorID = cookies.get('ProfessorID');

    const fetchTodo = async () => {
        try {
            const response1 = await api.get(`/jointtablecv/professor_academic/${ProfessorID}`)
            setTodos(response1.data.results[0])
        } catch (error) {
            console.log('error', error)
        }
    }
    const fetchAcademic = async () => {
        try {
        const response2 = await api.get(`/Academic/getdataby_profID/${ProfessorID}`)
        setTodo(response2.data.results[0])
        }
        catch(error) {
            console.log('error', error)
        }
    }
    const fetchEdu = async () => {
        try{
        const EducationBackground = await api.get(`/EduBackground/getdataby_profID/${ProfessorID}`)
        setTodo1(EducationBackground.data.results)
        console.log(EducationBackground.data)
        }
        catch(error) {
            console.log('error', error)
        }
    }


    useEffect(() => {
        fetchTodo()
        fetchAcademic()
        fetchEdu()
    }, [])

    return(
        <>
            <div className='content'>
            <div className='header'>
                    <div className='text'>ประวัติการศึกษา</div>
                    <Link to="/EducationEdit" state={{ from: todo1 }} className='link'>แก้ไขข้อมูล</Link>
                </div>

                <div className='profileimg'>
                    <div>
                        <img src={imageUrl} alt="profile" className='profilepic'/>
                    </div>
                </div>

                <div className='profess-detail'>
                    <div className='th-name'>{todos.AcademicRankPosition} {todos.FirstNameTH} {todos.LastNameTH}</div>
                    <div className='en-name'>{todos.AcademicRankPositionEng} {todos.FirstNameEng} {todos.LastNameEng}</div>
                    <div className='position'>อาจารย์ประจำหลักสูตร{todo.Department}</div>
                </div>

                <div className='edu-detail'>
                    {todo1.map((element,index)=>{
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
            </div>
        </>
 )
}

export default EducationBackground;