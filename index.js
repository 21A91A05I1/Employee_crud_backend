

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./User");
const middleware=require('./middleware')
const Employee = require("./Employee");

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello world');
})
    

mongoose.connect("mongodb+srv://merntest:merntest@cluster0.oiwkp0e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(
    () => console.log("MongoDB connected"), {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

  app.post("/login", async (req, res) => {
    const { userName, password } = req.body;
    try {
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        if (password!=user.password) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        let payload={
            user:{
                id:user.id
            }
        }
        jwt.sign(payload,'jwtPassword',{expiresIn:360000000}),
        (err,token)=>{
            if(err) throw err
            return re.json({token})
        }
    } catch (error) {
        console.log(error);
       return  res.status(500).send("Server error");
    }
});

app.post("/add", async (req, res) => {
    const employee = new Employee(req.body);
    try {
        const newEmployee = await employee.save();
        res.json(newEmployee);
    } catch (error) {
        res.status(500).send("Server error");
    }
});

app.get("/employees", async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).send("Server error");
    }
});

app.get("/employees/:id", async (req, res) => {
    try {
        const employeesid = await Employee.findById(req.params.id);
        res.json(employeesid);
    } catch (error) {
        res.status(500).send("Server error");
    }
});

app.put("/edit/:id", async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEmployee);
    } catch (error) {
        res.status(500).send("Server error");
    }
});

app.delete("/delete/:id", async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({ message: "Employee deleted" });
    } catch (error) {
        res.status(500).send("Server error");
    }
});




app.listen(5000, () => {
    console.log(`Server is running`);
});
