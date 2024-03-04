import React from 'react'
import { Link } from 'react-router-dom'
import '../css/EducationEdit1.css'
import IconEdit from '../css/edit.png'
import { useLocation } from 'react-router-dom'

function EducationEdit1() {
    const location = useLocation()
    const { from } = location.state
    console.log(from);
    const dataEducate = [
        {headList: "ปริญญาเอก", year: "2562", group: "วิศวกรรมศาสตร์", field:"วิศวกรรมไฟฟ้า", institue: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง"},
        {headList: "ปริญญาโท", year: "2560", group: "วิศวกรรมศาสตร์", field:"วิศวกรรมสารสนเทศ", institue: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง"},
        {headList: "ปริญญาตรี", year: "2556", group: "วิศวกรรมศาสตร์", field:"วิศวกรรมสารสนเทศ", institue: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง"}
      ];



    return (
        <>
            <div className="contentEditPage1">
                <div className="headerEditPage1">แก้ไขข้อมูล</div>
                <Link to="/EducationBackground" className="backToPage">ประวัติการศึกษา</Link>
                <div className="menuEditData">
                    {from.map((element)=>{
                        return(
                            <>
                                <div className="selectEditData">
                                    <div className='inText'>
                                        <span className='textEll'>{element.Degree} </span>
                                        <span className='textEll'>{element.Year}</span>
                                        <div className='textEll'>{element.Program}    {element.Faculty}</div>
                                        <div className='textEll'>{element.Institute}</div>
                                    </div>
                                    <Link to="/EducationBackground/Edit" state={{ data: element }}><img src={IconEdit}></img></Link>
                                </div>
                            </>
                        )
                    })}
                </div>
        
                <div className='centerButton'>
                    <Link to="/EducationBackground/Add" className='addButton'>+ เพิ่มประวัติการศึกษา</Link>
                </div>
            </div>
        </>
        
    )
}

export default EducationEdit1