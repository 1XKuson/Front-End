import React, { useState , useEffect } from 'react'
import '../css/SearchProfile.css'
import { Dropdown } from 'primereact/dropdown';
import api from '../../api/api';

import SearchProfessor from './SearchProfessor.js';

function SearchProfile() {
    const [departmentID,setdepartmentID] = useState(0) ;
    const [programID,setprogramID] = useState(0) ;
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedField, setSelectedField] = useState(null);
    const [name,setName] = useState('');
    const [lastname,setLastname] = useState('');
    const [departmentSearch, setDepartmentSearch] = useState(null);
    const [fieldSearch, setFieldSearch] = useState(null);
    const [searchData, setSearchData] = useState(null);
    
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const departmentData = await api.get('/department/GET');
                setDepartmentSearch(departmentData.data.results);
                const programData = await api.get('/program/GET_ProgramID_ProgramName');
                setFieldSearch(programData.data.results); 
                setLastname('');
                setName('');
                setprogramID(0);
                setdepartmentID(0);
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchdata();
    }, []); 
    // console.log(departmentSearch);
    // console.log(fieldSearch);
    /* ----------------------------- Data Dropdown Department ----------------------------- */
   
    const selectedDepartmentTemplate = (option, props) => {
        if (option) {
            return (
                <div className='selectDrop'>
                    <div>{option.Department}</div>
                </div>
            );
        };
        return <span>{props.placeholder}</span>;
    };

    const departmentOptionTemplate = (option) => {
        return (
            <div className='selectDrop'>
                <div>{option.Department}</div>
            </div>
        );
    };

    /* ----------------------------- Data Dropdown Field -------------------------------- */



    const selectedFieldTemplate = (option, props) => {
        if (option) {
            return (
                <div className='selectDrop'>
                    <div>{option.ProgramName}</div>
                </div>
            );
        };
        return <span>{props.placeholder}</span>;
    };

    const fieldOptionTemplate = (option) => {
        return (
            <div className='selectDrop'>
                <div>{option.ProgramName}</div>
            </div>
        )
    }

    async function search_data(){
        try{
            // console.log('*******************************')
            console.log(name);
            console.log(lastname);
            console.log(departmentID);
            console.log(programID);
            // console.log(typeof(name));
            // console.log(typeof(lastname));
            // console.log(typeof(departmentID));
            // console.log(typeof(programID));
            // console.log(searchdata)
            // console.log('*******************************')
            const response = await api.post('/filters/search_by_acdemic_professor_department_program',{
                Name : name,
                Lastname : lastname,
                DepartmentID : departmentID,
                ProgramID : programID
            })
            //console.log("Here : ",response.data.results);
            setSearchData(response.data.results);
        }catch(error){
            console.log('error :',error);
            setSearchData(null);
        }
    }

  return (
    <>
        <div className='contentSearch'>
            <div className='headerSearch'>ค้นหาอาจารย์</div>
            <div className='searchInputBox'>
                <div className='fullNameSearch'>
                    <input 
                        type='text' 
                        placeholder='ชื่อ' 
                        className='searchInput' 
                        value={name}
                        onChange={(e) => {
                            console.log(e.target.value);
                            setName(e.target.value)
                        }}
                    />
                    <div className='spaceBtwName'></div>
                    <input 
                        type='text' 
                        placeholder='นามสกุล' 
                        className='searchInput'
                        onChange={(e) => {
                            console.log(e.target.value);
                            setLastname(e.target.value)
                        }}
                    />
                </div>
                
                <div className='dropdownSelect flex justify-content-center'>
                    <Dropdown
                        value={selectedDepartment}
                        onChange={(e) =>{
                            console.log(e.target.value)
                            if(e.target.value === undefined || e.target.value===null || e.target.value.length === 0){
                                setdepartmentID(0)
                                setSelectedDepartment(null);
                            }
                            else{
                                setdepartmentID(e.target.value.DepartmentID)
                                setSelectedDepartment(e.target.value);
                            }
                            
                            //console.log(e.target.value.DepartmentID)
                        }}
                        options={departmentSearch}
                        optionLabel="Department"
                        showClear
                        placeholder="เลือกภาควิชา"
                        filter
                        valueTemplate={selectedDepartmentTemplate}
                        itemTemplate={departmentOptionTemplate}
                        className="w-full md:w-100%"
                    />
                </div>
                <div className='dropdownSelect flex justify-content-center'>
                    <Dropdown
                        value={selectedField}
                        onChange={(e) =>{
                            console.log(e.target.value)
                            if(e.target.value === undefined || e.target.value===null || e.target.value.length === 0){
                                setprogramID(0)
                                setSelectedField(null);
                            }
                            else{
                                setprogramID(e.target.value.ProgramID)
                                setSelectedField(e.target.value);
                            }
                            //console.log(e.target.value.ProgramID)
                        }}
                        options={fieldSearch}
                        optionLabel="ProgramName"
                        showClear
                        placeholder="เลือกสาขาวิชา"
                        filter
                        valueTemplate={selectedFieldTemplate}
                        itemTemplate={fieldOptionTemplate}
                        className="w-full md:w-100%"
                    />
                </div>
            </div>

            <div className='btnSpace'><button className='toSearch' onClick={search_data}>ค้นหา</button></div>

            <div className='ProfessorOut'>
                <div className='headResult'>ผลลัพธ์การค้นหา</div>
                <SearchProfessor searchData={searchData}/>
            </div>

        </div>
    </>
  )
}

export default SearchProfile