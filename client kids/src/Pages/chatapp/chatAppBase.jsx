import React from 'react'
import ChatApp from './chat';

export default function ChatAppTeacher() {

  
   const user= JSON.parse(localStorage.getItem('teacher')).user
    console.log(user);
    const teacherId = user._id
    const parentId = user.ParentId
    

  return (
    <div>   

{
    teacherId && parentId ? (
      <div>
            <h1>Chat App</h1>
            <ChatApp from={teacherId} to={parentId} fromRole={"teacher"} toRole={"parent"}/>
      </div>
     ) : (
      <div>Loading...</div>
     )
}

    </div>
  )
}
