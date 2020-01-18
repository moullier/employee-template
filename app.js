const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const generate = require("./generateHTML.js");
const fs = require("fs");

let managerInfo;
let employees = [];
let moreEmployees = true;

let employeeInformation = {
    managers: [],
    engineers: [],
    interns: []
}

getEmployeeInfo();



async function getEmployeeInfo() {
    
    const { managerName, id, email, office } = await inquirer.prompt([
        {
            type: "input",
            message: "What is the manager's name?",
            name: "managerName"
        },
        {
            type: "input",
            message: "What is the manager's ID?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the manager's email address?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the manager's office number?",
            name: "office"
        }
      ]);

      console.log(`name: ${managerName}, id: ${id}, office: ${office}`);
      managerInfo = new Manager(managerName, id, email, office);
      managerInfo.printManager();
      employeeInformation.managers.push(managerInfo);


    while(moreEmployees){
        try {
        const { emp } = await inquirer.prompt({
            type: "list",
            message: "Do you want to add another employee? (yes/no)",
            choices: ["yes", "no"],
            name: "emp"
        });
    
            console.log(emp);
            if(emp == "no") {
                moreEmployees = false;
                makeHTML(employeeInformation);
            }
            else {
                const { name, role, id, email } = await inquirer.prompt([
                    {
                        type: "input",
                        message: "What is the employee's name?",
                        name: "name"
                    },
                    {
                        type: "list",
                        message: "What is the employee's role?",
                        choices: ["Engineer", "Intern"],
                        name: "role"
                    },
                    {
                        type: "input",
                        message: "What is the employee's ID?",
                        name: "id"
                    },
                    {
                        type: "input",
                        message: "What is the employee's email address?",
                        name: "email"
                    }
                ])

                console.log("name = " + name);
                console.log("role = " + role);
                console.log("id = " + id);

                if(role == "Engineer") {

                    const { github } = await inquirer.prompt({
                        type: "input",
                        message: "What is the employee's Github username?",
                        name: "github"
                    })
                    console.log("The github username is " + github);

                    employeeInformation.engineers.push(new Engineer(name, id, email, github));
                } else if (role == "Intern") {
                    const { school } = await inquirer.prompt({
                        type: "input",
                        message: "What is the employee's school?",
                        name: "school"
                    })
                    console.log("The school is " + school);

                    employeeInformation.interns.push(new Intern(name, id, email, school));

                }
            }
        
        } catch (err) {
        console.log(err);
    }
  }
}

// Create the HTML for the output file
function makeHTML(object) {
    // generate header of file
    let HTML = generate.getHeader();
    
    // append a card with the manager's info
    HTML += generate.makeManagerCard(employeeInformation.managers.pop());

    // iterate through the engineers and add a card for each one
    while(employeeInformation.engineers.length != 0) {
        console.log("employeeInformation.engineers.length = " + employeeInformation.engineers.length);
        HTML += generate.makeEngineerCard(employeeInformation.engineers.pop());
    }

    // iterate through the interns and add a card for each one
    while(employeeInformation.interns.length != 0) {
        console.log("employeeInformation.interns.length = " + employeeInformation.interns.length);
        HTML += generate.makeInternCard(employeeInformation.interns.pop());
    }
    
    HTML += generate.getFooter();

    writeHTMLFile(HTML);
}

function writeHTMLFile(HTML) {
    fs.writeFile('team.html', HTML, 'utf8', (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
}