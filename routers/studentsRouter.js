//imported modules
const express = require("express");
const Joi = require("joi");
const router = express.Router();
const DB = require("../DB/DB");
const studentsModel = DB.studentsModel;

//schemas
const studentsSchemas = [{
  name: Joi.string().min(3),
  age: Joi.number()
}, {
  name: Joi.string().min(3),
  age:Joi.allow()
}]


//validation logic with joi
function validator(req, schemaObj) {
  const schema = Joi.object(schemaObj);
  const result = schema.validate(req.body);
  return result
}


//get route
router.get("/", async (req, res) => {
  const allStudents = await studentsModel.find({});
  res.send(allStudents);
});



//post route
router.post("/", async (req, res) => {
  //Joi validation
  const result = validator(req, studentsSchemas[1]);
  if (result.error) {
    res.status(400).send(`you insert a wrong value ${result.error}`)
    return
  }
  //Mongoose validation
  const allStudents = await studentsModel.find({});
  const student = new studentsModel({
    id: allStudents.length + 1,
    name: req.body.name,
    age: req.body.age
  });

  try {
    //in the mongoose object pipeline here the validation logic is gonna be triggered
    await (student).save();
  }

  catch (ex) {
    res.status(400).send(`you insert a wrong value ${ex.message}`);
    return

  };

  // send response to the client
  res.send(student);
});



//put route
router.put("/:id", async (req, res) => {
  const allStudents = await studentsModel.find({});
  const student = allStudents.find((entry) => entry.id === parseInt(req.params.id))

  if (!student) {
    res.status(404).send('no student with such id')
    return
  };

  const result = validator(req, studentsSchemas[1]);
  if (result.error) {
    res.status(400).send(`you insert a wrong value ${result.error}`)
    return
  }
  await studentsModel.updateOne({ name: student.name, age: student.age },
    {

      name: req.body.name,
      age: req.body.age

    })
  res.send(await studentsModel.find({}));
});


//delete route
router.delete("/:id",async (req, res) => {
  const allStudents = await studentsModel.find({});
  const student =allStudents.find(entry => entry.id === parseInt(req.params.id));
  if (!student) {
    res.status(404).send('no student with such id')
    return
  };
  await studentsModel.deleteOne( {id:req.params.id})
  
  res.send(await studentsModel.find({}));
});



//export route object
module.exports = router;




/*
------OLD IMPLEMENTATION------


const http = require('http');
const url = require('url');
const querystring = require('querystring');

// Sample data store (in memory)
let data = {};

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Parse URL
    const parsedUrl = url.parse(req.url);
    const path = parsedUrl.pathname;

    // Handle GET request
    if (req.method === 'GET') {
        // Get data
        if (path === '/data') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    }

    // Handle POST request
    else if (req.method === 'POST') {
        if (path === '/data') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString(); // Convert Buffer to string
            });
            req.on('end', () => {
                const postData = querystring.parse(body);
                data = postData; // Save data
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(data));
            });
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    }

    // Handle PUT request
    else if (req.method === 'PUT') {
        if (path === '/data') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString(); // Convert Buffer to string
            });
            req.on('end', () => {
                const putData = querystring.parse(body);
                Object.assign(data, putData); // Update data
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(data));
            });
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    }

    // Handle other methods
    else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
});

// Start the server
const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});*/