//import React, { Component } from 'react'
import profilepic from './businessman.png'

const profileName = () => {
    //--------------- Name Thai --------------------------------
    const titleNameThai = "ดร."
    const firstNameThai = "ธนวิชญ์"
    const lastNameThai = "อนุวงศ์พินิจ"

    //--------------- Name Eng ---------------------------------
    const titleNameEng = "Dr."
    const firstNameEng = "Thanavit"
    const lastNameEng = "Anuwongpinit"

    //--------------- Status Lecture ---------------------------------
    const statusLecture = "อาจารย์ประจำหลักสูตรวิศวกรรมระบบไอโอทีและสารสนเทศ"

    return (
        <div className="profile-name">
            <img className="profile-picture" src={profilepic} alt=""/>
            <div className="box-name">
                <div className="name-thai">{titleNameThai} {firstNameThai} {lastNameThai}</div>
                <div className="name-eng">{titleNameEng} {firstNameEng} {lastNameEng }</div>
                <div className="status-le">{statusLecture}</div>
            </div>
        </div>
    )
}

export default profileName