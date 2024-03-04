const profileEdu = () => {

    const dataEdu = [
        {degree: "ปริญญาเอก", major: "Electrical Engineering", university: "King Mongkut's Institute of Technology Ladkrabang"},
        {degree: "ปริญญาโท", major: "Information Engineering", university: "King Mongkut's Institute of Technology Ladkrabang"},
        {degree: "ปริญญาตรี", major: "Information Engineering", university: "King Mongkut's Institute of Technology Ladkrabang"}
    ];

    // const degree = "ปริญญาเอก"
    // const major = "Electrical Engineering"
    // const university = "King Mongkut's Institute of Technology Ladkrabang"

    return (
      <div className="profile-edu shadowBox marginBottom">
        <div className="head-profile">ประวัติการศึกษา</div>
        <table className="table-edu">
            {dataEdu.map((element) => {
                return(
                    <tr>
                        <td><div className="h-profile">{element.degree} :</div></td>
                        <td>
                            <div className="data-edu">{element.major}</div>
                            <div className="data-edu">{element.university}</div>
                        </td>
                    </tr>
                )
            })}
        </table>
      </div>
    )
}

export default profileEdu