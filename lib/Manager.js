const Employee = require("./Employee");

class Manager extends Employee {

    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getRole() {
        return "Manager";
    }

    getOfficeNumber() {
        return this.officeNumber;
    }

    printManager() {
        console.log("Manager name: " + this.name);
        console.log("Manager ID: " + this.id);
        console.log("Manager Email: " + this.email);
        console.log("Manager Office: " + this.officeNumber);
    }

}

module.exports = Manager;