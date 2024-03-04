import './m-info1.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../../api/api';
import Cookies from 'universal-cookie';
import {  useNavigate, Link } from 'react-router-dom'


const SelectOptions = ({ options, defaultValueKey, labelKey }) => {



  return (
    <>
      {options.map((option, index) => (
        <option
          key={index}
          value={option[defaultValueKey]}
          label={option[labelKey]}
          disabled={option.disabled}
          selected={option.selected}
        >
          {option.label}
        </option>
      ))}
    </>
  );
};

const AddEducationBackground = () => {

  const cookies = new Cookies();
  const navigate = useNavigate();

  const ProfessorID = cookies.get('ProfessorID');
  const [history, sethistory] = useState(
    {
      EducationID: "",
      Year: "",
      Faculty: "",
      Degree: "",
      Institute: "",
      Program: "",
      ProfessorID: ""
    },
  );

  const [Degree, setDegree] = useState(null);
  const degreeOptions = [
    { value: 'degrees', label: '------', disabled: true },
    { value: 'ปริญญาตรี', label: 'ปริญญาตรี' },
    { value: 'ปริญญาโท', label: 'ปริญญาโท' },
    { value: 'ปริญญาเอก', label: 'ปริญญาเอก' },
  ];


  const updatehistory = (key, value) => {
    sethistory(prevHistory => ({
      ...prevHistory,
      [key]: value
    }));
    console.log(history);
  };

  const handleDegreeChange = (e) => {
    setDegree(e.target.value);
    updatehistory('Degree', e.target.value);
    console.log(history);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(history);
    if (!history.Faculty || !history.Institute || !history.Program || !history.Year) {
      alert('กรุณากรอกข้อมูลให้ครบ');
      return;
    }
    try {
      // Assuming you have an API endpoint for submitting data
      const response = await api.post('/EduBackground/insert_to_educationbackground', {
        Year: history.Year,
        Faculty: history.Faculty,
        Degree: history.Degree,
        Institute: history.Institute,
        Program: history.Program,
        ProfessorID: ProfessorID
      });

      console.log('Submission successful:', response.data);
      navigate("/EducationBackground")
    } catch (error) {
      console.error('Error submitting data:', error);
    }
    console.log(history)
  };

  return (
    <>
      <div className="container">
        <div className="centre">
          <label className="lh1">แก้ไขข้อมูล</label>
        </div>
        <label className="lh2">ประวัติการศีกษา</label>
        <form className="edit-data">
          <label>ปริญญา</label>
          <select onChange={handleDegreeChange} value={Degree || ''}>
            <SelectOptions options={degreeOptions} defaultValueKey="value" labelKey="label" />
          </select>
          <label>ปีที่จบ (พุทธศักราช)</label>
          <input
            type="number"
            placeholder="ปีที่จบ"
            maxLength={4}
            value={parseInt(history.Year)}

            onChange={(e) => {
              const inputValue = e.target.value.replace(/\D/g, '').slice(0, 4);
              updatehistory('Year', inputValue)
            }}
          />
          <label>คณะ</label>
          <input
            type="text"
            placeholder="คณะ"
            value={history.Faculty}
            onChange={(e) => updatehistory('Faculty', e.target.value)}
          />
          <label>หลักสูตร</label>
          <input
            type="text"
            placeholder="หลักสูตร"
            value={history.Program}
            onChange={(e) => updatehistory('Program', e.target.value)}
          />
          <label>มหาวิทยาลัย</label>
          <input
            type="text"
            placeholder="มหาวิทยาลัย"
            value={history.Institute}
            onChange={(e) => updatehistory('Institute', e.target.value)}
          />
          <p />
       
            <button type="button" className="buttonInfo cancel" onClick={() => {
              console.log('Cancel clicked')
              navigate("/EducationBackground")
              
              }}>
              ยกเลิกการแก้ไข
            </button>
     
          <button type="submit" className="buttonInfo submit" onClick={handleSubmit}>
            บันทึก
          </button>
        </form>
      </div>
    </>
  );
};

export default AddEducationBackground;