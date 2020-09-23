// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");
class Intern extends Employee { // intern has employee properties & methods
    constructor(name, id, email, school) {
        super(name, id, email); // this creates new Employee(name, id, eamil)
        this.school = school;
    }
    getRole() {
        return "Intern";
    }
    getSchool() {
        return this.school;
    }
}
module.exports = Intern;