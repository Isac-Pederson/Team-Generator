const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const teamMembers = [];
const idArray = [];
function appMenu() {
    function createManager() {
        inquirer.prompt([
            {
                type: "input",
                message: "Please give manager name:",
                name: "managerName",
                validate: function (answer) {
                    if (answer !== "") { //managerName
                        return true;
                    }
                    return "Please enter at least character"
                }
            },
            {
                type: "input",
                message: "please give manager id:",
                name: "managerId"
            },
            {
                type: "input",
                message: "please give manager email:",
                name: "managerEmail"
            },
            {
                type: "input",
                message: "please give manager office number:",
                name: "managerOfficeNumber"
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            teamMembers.push(manager);
            console.log(manager);
            createTeam();
        });
    }
    function createTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "Which type of team member would you like to add?",
                choices: [
                    "Engineer",
                    "Intern",
                    "I don't want to add any more team members"
                ]
            }
        ]).then(userChoice => {
            switch (userChoice.memberChoice) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    buildTeam();
            }
        });
    }
    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                message: "Please give engineer name:",
                name: "engineerName",
                validate: function (answer) {
                    if (answer !== "") { //managerName
                        return true;
                    }
                    return "Please enter at least character"
                }
            },
            {
                type: "input",
                message: "Please give engineer id:",
                name: "engineerId"
            },
            {
                type: "input",
                message: "please give engineer email:",
                name: "engineerEmail"
            },
            {
                type: "input",
                message: "Please enter github username:",
                name: "engineerGitHub"
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGitHub);
            teamMembers.push(engineer);
            createTeam();
        });
    }
    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                message: "Please give intern name:",
                name: "internName",
                validate: function (answer) {
                    if (answer !== "") { //internName
                        return true;
                    }
                    return "Please enter at least character"
                }
            },
            {
                type: "input",
                message: "Please give intern id:",
                name: "internId"
            },
            {
                type: "input",
                message: "please give intern email:",
                name: "internEmail"
            },
            {
                type: "input",
                message: "Please enter school:",
                name: "internSchool"
            }
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            teamMembers.push(intern);
            // do something with answers, make new Intern()
            // add intern to teamMembers array
            createTeam();
        });
    }
    function buildTeam() {
        // var teamHtml = ''
        // build html files from teamMembers array
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    }
    createManager();
}
appMenu();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```