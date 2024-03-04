const profileContract = (data) => {


    
    //------------- Head -----------------------------

    //------------- E-mail --------------------
    const emailLecture = "thanavit.an@kmitl.ac.th"

    //------------- Phone Number --------------------
    const phoneNumber = "000-000-0000"
    //------------- Room Name --------------------
    const officeLocation = "E12 - 1109"

    return (
        <div className="profile-Cont shadowBox marginBottom">
            <div className="head-profile">ข้อมูลติดต่อ</div>
            <div className="data-cont-group">
                <div className="h-profile">E-mail : </div>
                <div className="data-cont">{emailLecture}</div>
            </div>
            <div className="data-cont-group">
                <div className="h-profile">เบอร์โทรศัพท์ : </div>
                <div className="data-cont">{phoneNumber}</div>
            </div>
            <div className="data-cont-group">
                <div className="h-profile">ที่ทำงาน : </div>
                <div className="data-cont">{officeLocation}</div>
            </div>
        </div>
    )
}

export default profileContract