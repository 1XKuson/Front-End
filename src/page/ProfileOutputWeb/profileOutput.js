import React, { useState, useEffect } from 'react';
import './profileOutput.css';
import ProfileName from './profileName.js';
import ProfileContract from './profileContract.js';
import ProfileEdu from './profileEdu.js';
import ProfilePerformance from './profilePerformance.js';
import ProfileNumStd from './profileNumStd.js';
//api 
import api from '../../api/api.js';

const Profile = () => {


    const [backendData, setBackendData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            // Fetch data from the API using Axios
            const response = await api.get("/users/GETData",{
                headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imt1c29uMTFAZ21haWwuY29tIiwiVXNlcklEIjo2LCJSb2xlIjoicHJvZmVzc29yIiwiUHJvZmVzc29ySUQiOiJhNzVmOGNlNS0wMTZjLTRiOTUtYjgyMS1jNDIyNzgyMjI4YzUiLCJpYXQiOjE3MDg2MTE3NzIsImV4cCI6MTcwODYxNTM3Mn0.uBsUovnSQ1D-u59S4flxA14sY9Jz07V5LTtb-9FIqzQ'},
            });
            // Log the data to the console
            console.log(response.data.Info);
            // Store the data in state
            setBackendData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };
    
        fetchData();
    }, []);
    


    const numHeadPerformance = [
        {hPerformance: "ผลงานวิชาการ"},
        {hPerformance: "สิ่งที่สนใจ"}
    ];
    
    return (
        <div className="profile-output">
            <ProfileName/>
            <div className="cont-edu">
                <ProfileContract/>
                <ProfileEdu/>
            </div>
            {/* <ProfilePerformance hPerformance="ผลงานวิชาการ"/> */}
            {numHeadPerformance.map((element) => {
                return <ProfilePerformance hPerformance={element.hPerformance}/>
            })}
            <div className="line-Nstd marginBottom"></div>
            <ProfileNumStd/>
        </div>
    )
}

export default Profile