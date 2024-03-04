import React, { useState, useEffect } from 'react';
import api from '../../../api/api';
import { useLocation, useNavigate, Link } from 'react-router-dom'
import Cookies from 'universal-cookie';
// import './m-info1.css'

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

const RadioOptions = ({ options, selectedValue, name, onChange }) => {
    return (
        <div className="radio-options-container">
            {options.map((option, index) => (
                <div key={index} className="radio-option">
                    <input
                        type="radio"
                        id={option.value}
                        name={name}
                        value={option.value}
                        className="radio-input"
                        checked={selectedValue == option.value}
                        onChange={onChange}
                    />
                    <label htmlFor={option.value}>{option.label}</label>
                </div>
            ))}
        </div>
    );
};



const JournalEdit = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const { data } = location.state
    const cookies = new Cookies();
    console.log(data);
    const ProfessorID = cookies.get('ProfessorID');

    const [Journal, setJournal] = useState(
        {
            JournalID: data.JournalID,
            Topic: data.Topic,
            PublishedDate: data.PublishedDate,
            TypeID: data.TypeID,
            Description: data.Description,
            Publisher: data.Publisher,
            ProfessorID: data.ProfessorID,
            Level: data.Level,
            AcadDatabase: data.AcadDatabase,
            URL: data.URL,
            DOI: data.DOI,
            Quatile: data.Quatile,
            RefData: "SJR"  ///add by tanadon
        },


    );
    const [Choice, setChoice] = useState(null)
    const choiceRadio = [
        // { value: 'proceeding', label: 'โครงการบริการวิชาการ' },
        { value: 'journal', label: 'วารสารวิชาการ' },
    ]
    const typeRadio = [,
        { value: 1, label: 'มีผลงานนำเสนอในที่ประชุมวิชาการ/วิชาชีพ ที่สภาวิชาการรับรอง และมีผลงานเรื่องเต็มตีพิมพ์ใน Proceeding' },
        { value: 2, label: 'Proceeding ตีพิมพ์ในฐานข้อมูล Scopus' },
        { value: 3, label: 'Research paper / Review article' },
        { value: 4, label: 'Short communication / Note' },
    ];

    const levelRadio = [
        { value: 'ชาติ', label: 'ชาติ' },
        { value: 'นานาชาติ', label: 'นานาชาติ' },
    ];

    const databaseRadio = [
        { value: 'TCI', label: 'TCI กลุ่ม 1' },
        { value: 'SJR', label: 'SCImago Journal Rank (SJR)' },
        { value: 'WoS', label: 'Web of Science (WoS)' },
    ];

    const refRadio = [
        { value: 'SJR', label: 'SCImago Journal Rank (SJR)' },
        { value: 'WoS', label: 'Web of Science (WoS)' },
    ];

    const quartileRadio = [
        { value: 'Q4', label: 'Q4' },
        { value: 'Q3', label: 'Q3' },
        { value: 'Q2', label: 'Q2' },
        { value: 'Q1low', label: 'Q1 (ต่ำกว่า 90)' },
        { value: 'Q1high', label: 'Q1 (สูงกว่า 90)' },
    ];

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

    // const fetch_info = async () => {
    //     try {
    //         const response = await api.get(`http://localhost:8080/proceeding/GETJournal/${ProfessorID}`);
    //         setJournal(response.data.results);
    //     } catch (error) {
    //         console.error('Error fetching or setting data:', error);
    //     }
    // }
    // useEffect(() => {
    //     fetch_info();
    //     setChoice(Journal.type);

    // }, [], [Journal.type]);

    const updateJournal = (key, value) => {
        setJournal(prevJournal => ({
            ...prevJournal,
            [key]: value
        }));
    };

    const handleTypeChange = (e) => {
        const selectedValue = e.target.value;
        setChoice(selectedValue);
        console.log('Selected option:', selectedValue);
    }
    const handleTypeIDChange = (e) => {
        const selectedLevel = e.target.value;
        setJournal(prevState => ({ ...prevState, Level: selectedLevel }));
        updateJournal('TypeID', e.target.value);
        console.log(Journal);
    }

    const handleLevelChange = (e) => {
        const selectedLevel = e.target.value;
        setJournal(prevState => ({ ...prevState, Level: selectedLevel }));
        console.log(Journal);
    }

    const handleAcadDatabaseChange = (e) => {
        const selectedAcadDatabase = e.target.value;
        setJournal(prevState => ({ ...prevState, AcadDatabase: selectedAcadDatabase }));
        console.log(Journal);
    }

    const handleRefChange = (e) => {
        const selectedRef = e.target.value;
        setJournal(prevState => ({ ...prevState, RefData: selectedRef }));
        console.log(Journal);
    }

    const handleQuartileChange = (e) => {
        const selectedQuartile = e.target.value;
        setJournal(prevState => ({ ...prevState, Quatile: selectedQuartile }));
        console.log(Journal);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        updateJournal(e.target.value);
        console.log(Journal);

        if (!Journal.Topic || !Journal.Description || !Journal.URL || !Journal.DOI || !Journal.PublishedDate) {
            alert('กรุณากรอกข้อมูลให้ครบ');
            // You may display an error message or take other actions
            return;
        }

        try {
            console.log(Journal);
            // Assuming you have an API endpoint for submitting data
            const response = await api.put('/proceeding/PUTProceeding', {

                type: "journal",
                Topic: Journal.Topic,
                PublishedDate: Journal.PublishedDate,
                TypeID: Journal.TypeID,
                Description: Journal.Description,
                Publisher: Journal.Publisher,
                Level: Journal.Level,
                AcadDatabase: Journal.AcadDatabase,
                URL: Journal.URL,
                DOI: Journal.DOI,
                Quatile: Journal.Quatile,
                JournalID: Journal.JournalID,
                ProfessorID: Journal.ProfessorID,
                AuthorProfessorID: 'NULL'

            });

            console.log('Submission successful:', response.data);
            navigate('/Journal');
        } catch (error) {
            console.error('Error submitting data:', error);
        }
        console.log(Journal)
    };


    const DeleteJournal = async() => {
        try{
            const response = await api.delete('proceeding/DELETEJournal',{
               data: {
                ProfessorID: ProfessorID,
                JournalID: data.JournalID,
               }
            })
            console.log("delete success")
            navigate('/Journal');
        }
        catch (error) {
            console.error('Error delete data:',error);
        }
    }
    return (
        <>
            <div className="container">
                <div className="centre">

                    <label className="lh1">แก้ไขข้อมูล</label>

                </div>
                <Link to="/Journal">
                    <label className="lh2">งานวิชาการ</label>
                </Link>
                <form className="edit-data">
                    <label>ประเภทงานวิชาการ</label>
                    <select onChange={handleTypeChange} value={Choice || ''}>
                        <SelectOptions options={choiceRadio} defaultValueKey="value" labelKey="label" />
                    </select>
                    <div className="lh3">*กรณีเป็นวารสารวิชาการ</div>
                    <label>ชื่อเรื่อง</label>
                    <input
                        type="text"
                        placeholder=""
                        value={Journal.Topic}
                        onChange={(e) => updateJournal('Topic', e.target.value)}
                    />
                    <label>ชื่อวารสาร / งานประชุมวิชาการ</label>
                    <input
                        type="text"
                        placeholder=""
                        value={Journal.Publisher}
                        onChange={(e) => updateJournal('Publisher', e.target.value)}
                    />
                    <label>ประเภทระดับผลงาน</label>
                    <RadioOptions options={typeRadio} selectedValue={Journal.TypeID} name={"type"} onChange={handleTypeIDChange} />
                    <label>ระดับ</label>
                    <RadioOptions options={levelRadio} selectedValue={Journal.Level} name={"level"} onChange={handleLevelChange} />
                    <label>ตีพิมพ์ในวารสารที่อยู่ในฐานข้อมูล</label>
                    <RadioOptions options={databaseRadio} selectedValue={Journal.AcadDatabase} name={"database"} onChange={handleAcadDatabaseChange} />
                    {/* <label>อ้างอิงจากฐานข้อมูล</label>
                    <RadioOptions options={refRadio} selectedValue={Journal.RefData} name={"refData"} onChange={handleRefChange} /> */}
                    <label>ระดับ Quartile</label>
                    <RadioOptions options={quartileRadio} selectedValue={Journal.Quatile} name={"quartile"} onChange={handleQuartileChange} />
                    <label>URL</label>
                    <input
                        type="text"
                        placeholder=""
                        value={Journal.URL}
                        onChange={(e) => updateJournal('URL', e.target.value)}
                    />
                    <label>DOI</label>
                    <input
                        type="text"
                        placeholder=""
                        value={Journal.DOI}
                        onChange={(e) => updateJournal('DOI', e.target.value)}
                    />
                    <label>วันที่ตอบรับการพิมพ์</label>
                    <input
                        type="date"
                        placeholder=""
                        value={Journal.PublishedDate ? formatDate(Journal.PublishedDate) : ''}
                        onChange={(e) => updateJournal('PublishedDate', e.target.value)}
                    />
                     <label>คำอธิบาย</label>
                     <input
                        type="text"
                        placeholder=""
                        value={Journal.Description}
                        onChange={(e) => updateJournal('Description', e.target.value)}
                    />
                    {/* <label>ผลงาน</label>
          <table className="participator">
            <tr><th>ผู้มีส่วนร่วม</th></tr>
            <tr><td>hello</td></tr>
            <tr><td>hello</td></tr>
            <tr><td>hello</td></tr>
          </table> */}
                    <button type="button" className="buttonInfo cancel" onClick={() => {
                        navigate('/Journal')
                    }}>
                        ยกเลิกการแก้ไข
                    </button>
                    <button type="button" className="buttonInfo submitl" onClick={DeleteJournal}>
                       ลบข้อมูล
                    </button>
                    <button type="submit" className="buttonInfo submit" onClick={handleSubmit}>
                        บันทึก
                    </button>
                </form>
            </div>
        </>
    );
};

export default JournalEdit;