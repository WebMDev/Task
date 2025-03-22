const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.json());

// Get Home page
app.get('/', (req, res) => {
    res.json({msg:"This is the home page"});
});

const Students = [
    {
        id: 1,
        name: "Adarsh",
        age: 20,
        email: "adarsh@gamil.com",
        subject: "HTML",
        gender: "M"
    },
    {
        id: 2,
        name: "Bhavy",
        age: 22,
        email: "bhavy@gamil.com",
        subject: "C",
        gender: "M"
    },
    {
        id: 3,
        name: "Divya",
        age: 21,
        email: "divya@gamil.com",
        subject: "C++",
        gender: "F"
    },
    {
        id: 4,
        name: "Jaya",
        age: 21,
        email: "jaya@gamil.com",
        subject: "JavaScript",
        gender: "F"
    },
    {
        id: 5,
        name: "Kunal",
        age: 20,
        email: "kunal@gamil.com",
        subject: "Java",
        gender: "M"
    },
    {
        id: 6,
        name: "Manan",
        age: 23,
        email: "adarsh@gamil.com",
        subject: "MySQL",
        gender: "M"
    },
]

// 1) - Create a new data in Students resource
app.post('/api/students', (req, res) => {
    const {name, age, email, subject, gender} = req.body;

    if (!name || !age || !email || !subject || !gender) res.status(400).json({msg:"Please enter data "});

    const newStd = {
        id: Students.length+1,
        name,
        age,
        email,
        subject, 
        gender
    }

    Students.push(newStd);
    res.status(200).json(newStd);
});



// 2) - Get All Student Data from Students resource
app.get('/api/students', (req, res) => {
    res.json(Students);
});

// 3) - Update a data in resource
app.put('/api/students/:id', (req, res) => {

    const parseId = parseInt(req.params.id);

    const {name, age, email, subject, gender} = req.body;

    const std = Students.find((s) => s.id === parseId);

    if (!std) res.status(404).json({msg:"Student not found"});
        
    std.name = name;
    std.age = age;
    std.email = email;
    std.subject = subject;
    std.gender = gender;

    res.status(200).json({msg:"Data updated successfully!"});

});

// 4) - Delete a data in resource 
app.delete('/api/students/:id', (req, res) => {

    const parseId = parseInt(req.params.id);

    const stdId = Students.findIndex((s) => s.id === parseId);

    if (stdId === -1) return res.status(404).json({msg:"Student not found"});

    Students.splice(stdId, 1);
    
    res.status(200).json({msg:"Id deleted successfully"});
});


app.listen(PORT, () => {
    console.log(`Server is runing on PORT http://localhost:${PORT}`);
});