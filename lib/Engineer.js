// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");
class Engineer extends Employee { // Engineer has employee properties & methods
    constructor(name, id, email, github) {
        super(name, id, email); // this creates new Employee(name, id, eamil)
        this.github = github;
    }
    getRole() {
        return "Engineer";
    }
    getGithub() {
        return this.github;
    }
}
module.exports = Engineer;