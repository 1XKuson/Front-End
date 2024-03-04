const profilePerformance = (props) => {
  const {hPerformance} = props;

  const dataPerformances = [
    {headListPerformance: "Internet of Things", yearPerformance: "2566", typePerformance: "Conference", pulisherPerformance: "IEEE", descriptionPerformance: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo ipsum. Sed accumsan quam vitae est varius fringilla. Pellentesque placerat vestibulum lorem sed porta. Nullam mattis tristique iaculis. Nullam pulvinar sit amet risus pretium auctor. Etiam quis massa pulvinar, aliquam quam vitae, tempus sem. Donec elementum pulvinar odio."},
    {headListPerformance: "Embedded System", yearPerformance: "2566", typePerformance: "Journal", pulisherPerformance: "IEEE", descriptionPerformance: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo ipsum. Sed accumsan quam vitae est varius fringilla. Pellentesque placerat vestibulum lorem sed porta. Nullam mattis tristique iaculis. Nullam pulvinar sit amet risus pretium auctor. Etiam quis massa pulvinar, aliquam quam vitae, tempus sem. Donec elementum pulvinar odio."}
  ];

  //const headListPerformance = "Internet of Things"
  //const yearPerformance = "2566"
  //const typePerformance = "Conference" //conference, Journal
  //const pulisherPerformance = "IEEE"
  //const descriptionPerformance = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo ipsum. Sed accumsan quam vitae est varius fringilla. Pellentesque placerat vestibulum lorem sed porta. Nullam mattis tristique iaculis. Nullam pulvinar sit amet risus pretium auctor. Etiam quis massa pulvinar, aliquam quam vitae, tempus sem. Donec elementum pulvinar odio."

    return (
      <div className="profile-Per marginBottom">
        <div className="head-profile">{hPerformance}</div>
        <ul className="profile-list">
          {dataPerformances.map((element)=>{
            return(
            <li>
              <div className="h-list-performance">{element.headListPerformance}</div>
              <div className="d-list-performance">{element.yearPerformance} | {element.typePerformance} | {element.pulisherPerformance}</div>
              <div className="p-list-performance">{element.descriptionPerformance}</div>
            </li>
            )
          })}
        </ul>
      </div>
    )
}

export default profilePerformance