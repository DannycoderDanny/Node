//imported modules
const express=require("express");// returns a function
const students=require("./routers/studentsRouter");
const app=express();
const helmet=require("helmet");



//middlewares
app.use(express.json());
app.use(express.static('public'));
app.use(helmet());
app.use('/api/students',students);


//listener
const port=process.env.PORT || 5000;
app.listen(port,()=>console.log(`listening on port ${port}...`))