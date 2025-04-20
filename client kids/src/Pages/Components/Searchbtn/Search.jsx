import React, { useEffect, useState } from "react";
import "./Search.css";
import { useParams } from "react-router-dom";
import logo from "../../Images/logo.svg";
import Success from "./Success";

function Search() {
  const [data, setData] = useState("");
  const [course, setCourse] = useState([]);
  const [courseID, setCourseID] = useState([]);
  const [popup, setPopup] = useState(false);
  const [idArray, setIdArray] = useState([]);
  const { ID } = useParams();
  const [openTM, setOpenTM] = useState(false);
  const [Tdec, setTeacherDetails] = useState(null);
  const [tname, setTname] = useState({});

  const price = {
    math: 700,
    physics: 800,
    computer: 1000,
    chemistry: 600,
    biology: 500,
  };

  const daysName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const closePopup = () => {
    setPopup(false);
    window.location.reload();
  };

  const openTeacherDec = async(id,fname,lname,sub)=>{
    setTname({fname,lname,sub});

    const data = await fetch('http://localhost:8888/api/teacher/teacherdocuments',{
        method: 'POST',
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({teacherID : id}),
    })

    const res = await data.json();
    setTeacherDetails(res.data);
    setOpenTM(true);
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`http://localhost:8888/api/course/student/${ID}/enrolled`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
  
        if (!response.ok) throw new Error('Failed to fetch data');

        const user = await response.json();
        setCourseID(user.data);
        setIdArray(prevIdArray => [...prevIdArray, ...user.data.map(res => res._id)]);

      } catch (error) {
        console.log(error.message)
      }
    };
    getData();
  }, []);

  const SearchTeacher = async (sub) => {
    const subject = sub.toLowerCase();
    const Data = await fetch(`http://localhost:8888/api/course/${subject}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const response = await Data.json();

    if (response.statusCode === 200) {
      setCourse(response.data);
    }
    setData("");
  };

  const handleEnroll = async (courseName, id) => {
    let check = await fetch(
      `http://localhost:8888/api/course/${courseName}/${id}/verify/student/${ID}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const res = await check.json();
    if (res.statusCode === 200) {
      try {
        let response = await fetch(
          `http://localhost:8888/api/course/${courseName}/${id}/add/student/${ID}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        let res = await response.json();
        if (res.statusCode === 200) {
          setPopup(true);
        } else {
          alert("Enrollment failed");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert(res.message);
    }
  };
  
  return (
    <div className="px-4 py-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-center gap-4 mb-6">
        <img
          src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/6c476f454537d7f27cae2b4d0f31e2b59b3020f5"
          width={30}
          alt="search-icon"
        />
        <input
          type="text"
          placeholder="Ex: Math ..."
          className="border border-gray-300 px-3 py-2 rounded-md w-60"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <button className="bg-blue-700 text-white px-4 py-2 rounded-md" onClick={() => SearchTeacher(data)}>
          Find Teacher
        </button>
      </div>

      <div className="space-y-4">
        {course.map((Data) => (
          <div
            key={Data._id}
            className="relative bg-white shadow-md border border-gray-200 p-5 rounded-xl flex flex-col gap-3 md:flex-row md:items-center"
          >
            <div className="font-semibold text-xl text-blue-800 w-48">{Data.coursename.toUpperCase()}</div>
            <div
              onClick={() => openTeacherDec(Data.enrolledteacher.Teacherdetails, Data.enrolledteacher.Firstname, Data.enrolledteacher.Lastname, Data.coursename)}
              className="cursor-pointer font-medium text-gray-800 hover:text-blue-700"
            >
              {Data.enrolledteacher.Firstname} {Data.enrolledteacher.Lastname}
            </div>
            <div className="text-sm text-gray-600">Desc: {Data.description}</div>
            <div className="text-sm text-gray-500">{Data.enrolledStudent.length}/20 enrolled</div>

            <div className="ml-auto">
              {idArray.includes(Data._id) ? (
                <button
                  disabled
                  className="bg-green-700 text-white px-4 py-2 rounded cursor-not-allowed"
                  onClick={() => alert("You Already enrolled, pls find other course")}
                >
                  Already Enrolled
                </button>
              ) : Data.enrolledStudent.length < 20 ? (
                <button
                  className="bg-blue-700 text-white px-4 py-2 rounded"
                  onClick={() => handleEnroll(Data.coursename, Data._id)}
                >
                  Enroll Now
                </button>
              ) : (
                <button
                  disabled
                  className="bg-red-700 text-white px-4 py-2 rounded cursor-not-allowed"
                  onClick={() => alert("Already Full, pls find other course")}
                >
                  Already Full
                </button>
              )}
            </div>
            <div className="text-sm text-gray-700">
              <span className="font-medium">Timing:</span> [
              {Data.schedule.map(daytime => (
                `${daysName[daytime.day]} ${Math.floor(daytime.starttime / 60)}:${daytime.starttime % 60 === 0 ? "00" : daytime.starttime % 60} - ${Math.floor(daytime.endtime/60)}:${daytime.endtime % 60 === 0 ? "00" : daytime.endtime % 60}`
              )).join(', ')}
              ]
            </div>
          </div>
        ))}
      </div>

      {openTM && Tdec && (
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50'>
          <div className='bg-[#008280] w-96 rounded-lg p-6 relative text-white'>
            <button onClick={() => setOpenTM(false)} className='absolute top-2 right-2 text-black bg-white w-8 h-8 flex items-center justify-center rounded-full'>✖️</button>
            <h2 className='text-center text-2xl font-bold mb-4'>{tname.sub.toUpperCase()}</h2>
            <p><strong>Teacher Name:</strong> {tname.fname} {tname.lname}</p>
            <p><strong>Education:</strong> Postgraduate from <span className='text-gray-200'>{Tdec.PGcollege}</span> with {Tdec.PGmarks} CGPA</p>
            <p><strong>Experience:</strong> {Tdec.Experience} years</p>
            <p><strong>Course:</strong> {tname.sub.toUpperCase()}</p>
          </div>
        </div>
      )}

      {popup && <Success onClose={closePopup} />}
    </div>
  );
}

export default Search;