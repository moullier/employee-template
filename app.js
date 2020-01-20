// include required classes and libraries
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const generate = require("./generateHTML.js");
const fs = require("fs");

// define global variables
let managerInfo;
let employees = [];
let moreEmployees = true;

let employeeInformation = {
    managers: [],
    engineers: [],
    interns: []
}

// initialize command line interview
getEmployeeInfo();

// async function that gets the Employee info from the command line
async function getEmployeeInfo() {
    
    // prompt for manager information
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

      // create new Manager object with supplied info
      managerInfo = new Manager(managerName, id, email, office);
      // managerInfo.printManager();
      
      // add Manager to employeeInformation object in the managers array
      employeeInformation.managers.push(managerInfo);


    // get more employees until user is finished adding them
    while(moreEmployees){
        try {
            const { emp } = await inquirer.prompt({
                type: "list",
                message: "Do you want to add another employee? (yes/no)",
                choices: ["yes", "no"],
                name: "emp"
            });
        
            // If there are no more employee, set boolean to false and make the HTML for output
            if(emp == "no") {
                moreEmployees = false;
                makeHTML(employeeInformation);
            } else {
                // Otherwise get employee info
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

                // Collect the role specific information
                if(role == "Engineer") {

                    const { github } = await inquirer.prompt({
                        type: "input",
                        message: "What is the employee's Github username?",
                        name: "github"
                    })

                    employeeInformation.engineers.push(new Engineer(name, id, email, github));
                } else if (role == "Intern") {
                    const { school } = await inquirer.prompt({
                        type: "input",
                        message: "What is the employee's school?",
                        name: "school"
                })

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
    let numberOfEmployees = 0;
    
    // append a card with the manager's info
    HTML += generate.makeManagerCard(employeeInformation.managers.pop());
    numberOfEmployees++;

    // iterate through the engineers and add a card for each one
    while(employeeInformation.engineers.length != 0) {
        console.log("employeeInformation.engineers.length = " + employeeInformation.engineers.length);
        //start a new row if a multiple of 3 employees are on the last row
        if(numberOfEmployees % 3 == 0) {
            HTML += generate.newRow();
        }

        HTML += generate.makeEngineerCard(employeeInformation.engineers.pop());
        numberOfEmployees++;
    }

    // iterate through the interns and add a card for each one
    while(employeeInformation.interns.length != 0) {
        console.log("employeeInformation.interns.length = " + employeeInformation.interns.length);
        
        //start a new row if a multiple of 3 employees are on the last row
        if(numberOfEmployees % 3 == 0) {
            HTML += generate.newRow();
        }        
        
        HTML += generate.makeInternCard(employeeInformation.interns.pop());
        numberOfEmployees++;
    }
    
    // add the end of the HTML file when all cards have been added
    HTML += generate.getFooter();

    writeHTMLFile(HTML);
}

// write completed HTML file to output
function writeHTMLFile(HTML) {
    fs.writeFile('./output/team.html', HTML, 'utf8', (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
}