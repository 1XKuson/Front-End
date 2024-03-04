import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/EducationEdit1.css'
import IconEdit from '../../css/edit.png'
import { useLocation } from 'react-router-dom'

function JournalSelect() {
    const location = useLocation()
    const { data } = location.state
    console.log(data);
    const proceeding = data.proceeding;
    const journal = data.journal;
    if (data == null )
        return 
    return (
        <>
            <div className="contentEditPage1">
                <div className="headerEditPage1">แก้ไขข้อมูล</div>
                <Link to="/Journal" className="backToPage">งานวิชาการ</Link>
                <p>โครงการบริการวิชาการ</p>
                <div className="menuEditData">
                    {proceeding.map((element)=>{
                        return(
                            <>
                                <div className="selectEditData">
                                    <div className='inText'>
                                        <div className='textEll'>{element.Topic} </div>
                                        <div className='textEll'>{element.Year}</div>
                                        <div className='textEll'>{element.Program}    {element.Faculty}</div>
                                        <div className='textEll'>{element.Institute}</div>
                                    </div>
                                    <Link to="/Journal/Edit" state={{ data: element }}><img src={IconEdit}></img></Link>
                                </div>
                            </>
                        )
                    })}
                </div>
                <p>โครงการวารสารวิชาการ</p>
                <div className="menuEditData">
                    {journal.map((element)=>{
                        return(
                            <>
                                <div className="selectEditData">
                                    <div className='inText'>
                                        <div className='textEll'>{element.Topic} </div>
                                        <div className='textEll'>{element.Year}</div>
                                        <div className='textEll'>{element.Program}    {element.Faculty}</div>
                                        <div className='textEll'>{element.Institute}</div>
                                    </div>
                                    <Link to="/Journal/Edit" state={{ data: element }}><img src={IconEdit}></img></Link>
                                </div>
                            </>
                        )
                    })}
                </div>
        
                <div className='centerButton'>
                    <Link to="/Journal/Add" className='addButton'>+ เพิ่มประวัติการศึกษา</Link>
                </div>
            </div>
        </>
        
    )
}

export default JournalSelect