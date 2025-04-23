import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Razorpay from "razorpay"

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend origin
  credentials: true, // Allow cookies and credentials
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

app.use(cookieParser())
app.use('/public', express.static('public'));
  

// export const instance = new Razorpay({
//     key_id: process.env.KEY_ID,
//     key_secret: process.env.KEY_SECRET
// })

//student routes
import studentRouter from "./routes/student.routes.js";
app.use("/api/student", studentRouter)


//teacher routes
import teacherRouter from "./routes/teacher.routes.js"
app.use("/api/teacher", teacherRouter)

//course routes
import courseRouter from "./routes/course.routes.js"
app.use("/api/course", courseRouter)

import adminRouter from "./routes/admin.routes.js"
app.use("/api/admin", adminRouter)

import paymentRouter from "./routes/payment.routes.js"
app.use("/api/payment", paymentRouter)

//homework routes
import homeworkRouter from "./routes/homeworkroutes.js"

app.use("/api/homework", homeworkRouter)

//quiz routes
import quizRouter from "./routes/quize.route.js"
app.use("/api/quiz", quizRouter)

import parentAuthRoutes from './routes/parentAuthRoutes.js';
s
app.use('/api/parent-auth', parentAuthRoutes);


// 

export {app}