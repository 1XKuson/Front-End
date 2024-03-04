import './m-info1.css'
import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import { ImageContext } from '../../../components/imageContext/imageContext.js';

const SelectOptions = ({ options, defaultValueKey, labelKey }) => {
  return (
    <>
      {options.map((option, index) => (
        <option
          key={index}
          value={option[defaultValueKey]}
          label={option[labelKey]}
        >
          {option[labelKey]}
        </option>
      ))}
    </>
  );
};

const EditPersonal = () => {
  const navigate = useNavigate();
  const { imageUrl } = useContext(ImageContext);
  const location = useLocation();
  const { data } = location.state
  const cookies = new Cookies();
  console.log(data);
  const ProfessorID = cookies.get('ProfessorID');
  const [info, setInfo] = useState(
    {
      ProfessorID: data.profdata.ProfessorID,
      FirstNameTH: data.profdata.FirstNameTH,
      LastNameTH: data.profdata.LastNameTH,
      DateOfBirth: data.profdata.DateOfBirth,
      Gender: data.profdata.Gender,
      Email: data.profdata.Email,
      Phone: data.profdata.Phone,
      OfficeLocation: data.profdata.OfficeLocation,
      imageID: 1,
      LastNameEng: data.profdata.LastNameEng,
      FirstNameEng: data.profdata.FirstNameEng,
      Faculty: "วิศวกรรมศาสตร์",
      AcademicRankPosition: data.profdata.AcademicRankPosition,
      DepartmentID: data.profdata.DepartmentID,
      ProgramID: data.profdata.ProgramID,
      AcademicRankPositionEng: data.profdata.AcademicRankPositionEng
    }
  );
  const [selectedDepartmentID, setSelectedDepartmentID] = useState(null);
  const [selectedProgramId, setSelectedProgramId] = useState(null);
  const [profileImage, setProfileImage] = useState('https://cdn.imgchest.com/files/e4gdcverzr4.png');
  const [departmentIDOptions, setdepartmentID] = useState([]);
  const [programOptions, setProgramOptions] = useState([]);

  const genderOptions = [
    { value: 'Male', label: 'เพศชาย' },
    { value: 'Female', label: 'เพศหญิง' }
  ];
  const fetch_info = async () => {
    try {
      const programResponse = await api.get(`/program/GET`);
      setProgramOptions(programResponse.data.results);

      const departmentResponse = await api.get(`/department/GET`);
      setdepartmentID(departmentResponse.data.results);


      // Assuming you want to set the default value based on some condition
      const defaultProgram = programResponse.data.results.find(program => program.ProgramID === info.ProgramID);
      setSelectedProgramId(defaultProgram ? defaultProgram.ProgramID : null);

      const defaultDepartment = departmentResponse.data.results.find(department => department.DepartmentID === info.DepartmentID);
      setSelectedDepartmentID(defaultDepartment ? defaultDepartment.DepartmentID : null);

    } catch (error) {
      console.error('Error fetching or setting data:', error);
    }
  };

  useEffect(() => {
    fetch_info();
  }, [], [info.type]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();

    // Add leading zero to month and day if needed
    if (month.length === 1) {
      month = '0' + month;
    }

    if (day.length === 1) {
      day = '0' + day;
    }

    return `${year}-${month}-${day}`;
  };

  const updateInfo = (key, value) => {
    setInfo(prevInfo => ({
      ...prevInfo,
      [key]: value
    }));

  };
  const handleProgramchange = (e) => {
    setSelectedProgramId(e.target.value);
    updateInfo('ProgramID', parseInt(e.target.value));
    console.log(info);
  };

  const handleDepartmentidchange = (e) => {
    setSelectedDepartmentID(e.target.value);
    updateInfo('DepartmentID', parseInt(e.target.value));
    console.log(info);
  };
  const handlegenderchange = (e) => {
    updateInfo('Gender', e.target.value);
    console.log('Selected option:', e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("here", info);
      const responsePUT1 = await api.put('/professor/PUTProf', {
        FirstNameTH: info.FirstNameTH,
        LastNameTH: info.LastNameTH,
        DateOfBirth: info.DateOfBirth,
        Gender: info.Gender,
        Email: info.Email,
        Phone: info.Phone,
        OfficeLocation: info.OfficeLocation,
        imageID: 1,
        LastNameEng: info.LastNameEng,
        FirstNameEng: info.FirstNameEng,
        ProfessorID: ProfessorID
      });

      const responsePUT2 = await api.put('/Academic/edit_academic', {
        Faculty: info.Faculty,
        AcademicRankPosition: "รศ.ดร.",
        DepartmentID: info.DepartmentID,
        ProgramID: info.ProgramID,
        ProfessorID: ProfessorID,

      });
      console.log('Submission PUT1 successful:', responsePUT1.data);
      console.log('Submission PUT1 successful:', responsePUT2.data);
      navigate('/Personal')
    } catch (error) {
      console.error('Error submitting data:', error);
      alert("กรุณากรอกข้อมูลให้ครบ")
    }
  };



  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result;
        setProfileImage(dataURL);
      };

      reader.readAsDataURL(file);
      console.log(profileImage)
    }
  };

  return (
    <>
      <div className="container">
        <div className="centre"><label className="lh1">แก้ไขข้อมูล</label></div>
        <Link to='/Personal'><label className="lh2">ประวัติส่วนตัว</label></Link>
        <div className="img-container">
          <div>
            <img className="profile" src={imageUrl} alt="profile" />
            <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} id="fileInput" />
            {/* <label htmlFor="fileInput">
                          <button onClick={() => {
                            console.log("Click for change");
                            document.getElementById('fileInput').click();
                          }}>
                            <img src="https://i.imgur.com/vevEqAz.png" alt="camera" />
                          </button>
                        </label> */}

          </div>
        </div>
        <form className="edit-data">
          <label>คำนำหน้า</label>
          <input
            type="text"
            placeholder="คำนำหน้า"
            value={info.AcademicRankPosition}
            onChange={(e) => updateInfo('Prefix', e.target.value)}
          />
          <label>ชื่อ (ภาษาไทย)</label>
          <input
            type="text"
            placeholder="ชื่อ (ภาษาไทย)"
            value={info.FirstNameTH}
            onChange={(e) => updateInfo('FirstNameTH', e.target.value)}
          />
          <label>นามสกุล (ภาษาไทย)</label>
          <input
            type="text"
            placeholder="นามสกุล (ภาษาไทย)"
            value={info.LastNameTH}
            onChange={(e) => updateInfo('LastNameTH', e.target.value)}
          />
          <label>ชื่อ (ภาษาอังกฤษ)</label>
          <input
            type="text"
            placeholder="ชื่อ (ภาษาอังกฤษ)"
            value={info.FirstNameEng}
            onChange={(e) => updateInfo('FirstNameEng', e.target.value)}
          />
          <label>นามสกุล (ภาษาอังกฤษ)</label>
          <input
            type="text"
            placeholder="นามสกุล (ภาษาอังกฤษ)"
            value={info.LastNameEng}
            onChange={(e) => updateInfo('LastNameEng', e.target.value)}
          />
          <label>วัน เดือน ปีเกิด</label>
          <input
            type="date"
            placeholder="วัน เดือน ปีเกิด"
            value={info.DateOfBirth ? formatDate(info.DateOfBirth) : ''}
            onChange={(e) => updateInfo('DateOfBirth', e.target.value)}
          />
          <label>เพศ</label>
          <select onChange={handlegenderchange} value={info.Gender || ''}>
            <SelectOptions options={genderOptions} defaultValueKey="value" labelKey="label" />
          </select>
          <label>ภาควิชา</label>
          <select onChange={handleDepartmentidchange} value={selectedDepartmentID || ''}>
            <SelectOptions options={departmentIDOptions} defaultValueKey="DepartmentID" labelKey="Department" />
          </select>
          <label>หลักสูตร</label>
          <select onChange={handleProgramchange} value={selectedProgramId || ''}>
            <SelectOptions options={programOptions} defaultValueKey="ProgramID" labelKey="ProgramName" />
          </select>
          <label>อีเมล</label>
          <input
            type="email"
            placeholder="อีเมล"
            value={info.Email}
            onChange={(e) => updateInfo('Email', e.target.value)}
          />
          <label>เบอร์โทรศัพท์</label>
          <input
            type="tel"
            placeholder="เบอร์โทรศัพท์"
            value={info.Phone}
            onChange={(e) => updateInfo('Phone', e.target.value)}
          />
          <label>สถานที่ทำงาน</label>
          <input
            type="text"
            placeholder="สถานที่ทำงาน"
            value={info.OfficeLocation}
            onChange={(e) => updateInfo('OfficeLocation', e.target.value)}
          />
          <button className="buttonInfo cancel" type="button" onClick={() => 
          {
            navigate('/Personal');
          }
          }>ยกเลิกการแก้ไข</button>
          <button className="buttonInfo submit" type="submit" onClick={handleSubmit}>บันทึก</button>
        </form>
      </div>
    </>
  )
}

export default EditPersonal