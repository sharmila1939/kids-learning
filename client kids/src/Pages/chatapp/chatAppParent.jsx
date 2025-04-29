import React from 'react'
import ChatApp from './chat'
import Parentsidebar from '../parent/sidebar'

export default function ChatAppParent() {

    const data = localStorage.getItem("parent")
    const parsedData = JSON.parse(data)
    const parentId = parsedData._doc._id
    const teacherId = parsedData._doc.teacher

    console.log(parentId);
    console.log(teacherId);

  return (
    <div>   

{
   parentId && teacherId ? (
    <div>
         <Parentsidebar/>
        <h1>Chat App</h1>
        <ChatApp from={parentId} to={teacherId} fromRole={"parent"} toRole={"teacher"}/>
    </div>
   ) : (
    <div>Loading...</div>
   ) 
}

    </div>
  )
}

