# Team Template Generator

## Description

This program takes input of about a team of employees and generates a visual representation of the team as an HTML file.  It is a Node application that takes the input through a command line interfae, and creates an object for each employee.  Then the code renders the collection of objects into a display with the important information for each employee (Manager, Engineer or Intern).

The different employee types were create as Objects.  First I created an object for the basic Employee type, and then I created other object types for each Manager, Engineer or Intern that extend the basic Employee class.  We were provided tests, so I created the objects to match the specifications so that they would pass the tests, running in Jest.

## Resources Used

https://javascript.info/async-await - This page provided information about how to use asynchronous functions, which I used to get the input from the user in a loop of unknown length.

## License

[MIT](https://choosealicense.com/licenses/mit/)