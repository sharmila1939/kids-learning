import dotenv from "dotenv"
import db from './database/db.js';
import {app} from './app.js'

import {student, studentdocs} from "../src/models/student.model.js";



dotenv.config({
    path: './.env'
})

console.log(`${process.env.DB_NAME}`);
console.log(`${process.env.ACCESS_TOKEN_SECRET}`);
console.log(`${process.env.ACCESS_TOKEN_EXPIRY}`);




db()




.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log(" mongodb connection failed !!! ", err);
})

