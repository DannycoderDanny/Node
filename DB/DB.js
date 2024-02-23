//DB
//download driver
const mongoose = require("mongoose");

//connect to DB
mongoose.connect('mongodb://localhost/students-courses-transactions')
    .then(() => console.log("connected to the DB"))
    .catch(err => console.log('Could not connect to MongoDB...', err))

//create schemas
coursesSchema = new mongoose.Schema({
    id: Number,
    name: { type: String, required: true },
    cost: Number
})

const studentsSchema = new mongoose.Schema({
    id: Number,
    name: String,
    age: String
})

transactionsSchema = new mongoose.Schema({
    id: Number,
    student: String,
    transaction: Number
})

credentialsSchema = new mongoose.Schema({
    id: Number,
    student: String,
    password: {type:String,required:true}
})



module.exports.studentsModel = mongoose.model('students', studentsSchema);




