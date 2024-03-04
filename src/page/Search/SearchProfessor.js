import React from 'react'
import '../css/SearchProfessor.css'
import { Link } from 'react-router-dom'
import undefinedPersonImage from './undefinedPerson.jpeg';

function SearchProfessor({searchData}) {
   
    if (searchData && searchData.length > 0) {
        for (let i = 0; i < searchData.length; i++) {
            if (searchData[i].url === null) {
                searchData[i].url = undefinedPersonImage;
            }
        }
        console.log(searchData);
    }
    return (
        <>
            {searchData && searchData.map((element)=>{
                return(
                    <div className='cardNameProfessor'>
                        <div className='imageProfessor'>
                            <img src={element.url}/>
                        </div>
                        <div className='shortDetailProfessor'>
                            <div className='searchNameOutput'>{element.AcademicRankPosition} {element.FirstNameTH} {element.LastNameTH}</div>
                            <div className='searchDepartmentOutput'>{element.Department}</div>
                            <div className='searchAcademicRankPositionOutput'>{element.ProgramName}</div>
                            {/* <div className='searchPerformance'>
                                <div className='headPerformance'>Internet of Thing</div>
                                <div className='headPerformance'>Embedded System</div>
                            </div> */}
                            <div className='toPageProfile'>
                                <Link to="/Summary" className='btntoPageProfile' state = {{data:element}}>รายละเอียด</Link>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default SearchProfessor