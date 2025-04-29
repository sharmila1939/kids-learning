import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ParentStudentDashboard from './Dashboard';
import Parentsidebar from './sidebar';

export default function ParentHome() {

  const [studentInfo, setStudentInfo] = useState(null);
  const [progress, setProgress] = useState([]);

  let studentId=JSON.parse(localStorage.getItem("parent"))
console.log();


    useEffect(()=>{

        const fetchStudentInfo = async () => {
              try {
                const { data } = await axios.get(`http://localhost:8888/api/parent/${studentId._doc.children[0]}`);
                setStudentInfo(data.studentInfo);
                setProgress(data.progress);

              } catch (error) {
                console.error("Error fetching student info:", error);
              }
            };

            fetchStudentInfo()
        

    },[])

  return (
    <div>

        <h1>Parent Dashboard</h1>

        {
            studentInfo && (
                <div>
                      <Parentsidebar/>
               <ParentStudentDashboard studentInfo={studentInfo} progress={progress} />
                </div>
            )
        }


    </div>
  )
}
