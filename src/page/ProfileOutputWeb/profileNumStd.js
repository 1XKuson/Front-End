
const profileNumStd = () => {
    const degreeStd = [
        10, 2
    ]

    return (
        <div className="profile-Per">
            <div className="head-profile">จำนวนนักศึกษาที่ยังรับเป็นอาจารย์ที่ปรึกษาได้</div>
            <div className="container-Nstd">
                <div className="p-Nstd">
                    <div className="h-Nstd">ปริญญาโท</div>
                    <div className="num-Nstd">{degreeStd[0]}</div>
                </div>
                <div className="line-NNstd"></div>
                <div className="p-Nstd">
                    <div className="h-Nstd">ปริญญาเอก</div>
                    <div className="num-Nstd">{degreeStd[1]}</div>
                </div>
            </div>
        </div>
    )
}


export default profileNumStd