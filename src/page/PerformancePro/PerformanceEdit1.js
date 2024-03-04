import React from 'react'
import { Link } from 'react-router-dom'
import '../css/EducationEdit1.css'
import IconEdit from '../css/edit.png'

function EducationEdit1() {
    const dataEducate = [
        {headList: "ชื่อเรื่อง", year: "2562", head: "โครงการบริการวิชาการ"},
        {headList: "ชื่อเรื่อง", year: "2562", head: "โครงการวารสารวิชาการ"}
      ];

    return (
        <>
            <div className="contentEditPage1">
                <div className="headerEditPage1">แก้ไขข้อมูล</div>
                <Link to="/PerformancePro" className="backToPage">งานวิชาการ</Link>
                <div className="menuEditData">
                    {dataEducate.map((element)=>{
                        return(
                            <>
                                <div className="selectEditData">
                                    <div className='inText'>
                                        <span className='textEll'>{element.headList} </span>
                                        <span className='textEll'>{element.year}</span>
                                        <div className='textEll'>{element.head}</div>
                                    </div>
                                    <Link to="/PerformancePro"><img src={IconEdit}></img></Link>
                                </div>
                            </>
                        )
                    })}
                </div>
                <div className='centerButton'>
                    <Link to="/PerformancePro" className='addButton'>+ เพิ่มประวัติการศึกษา</Link>
                </div>
            </div>
        </>
        
    )
}

export default EducationEdit1