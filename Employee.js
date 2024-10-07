const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    designation: String,
    gender: String,
    course: [String],
    image: String,
    createDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
