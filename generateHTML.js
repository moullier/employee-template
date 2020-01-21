// return the head of the HTML file
function getHeader() {
    return `<!DOCTYPE html>
    <html lang="en">
       <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
          <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
          <title>Team Profile</title>
          <style>
          #headerRow {
            color: #f3f3f3;
            background-color: #27325D;
            margin-bottom: 10px;
          }
          #logo {
            padding-left: 15px;
            padding-top: 10px;
            text-align: center;
          }
          .bodyrow {
            width: 90%;
          }
          </style>
          </head>
          <body>
            <div class="container-fluid">
                <div class="row" id="headerRow">
                    <div class="col-12 justify-content-center">
                        <h2 id="logo">My Team</h2>
                    </div>
                </div>
            </div>
            <div id="bodyContent" class="card-deck justify-content-center">
                <div class="row bodyrow justify-content-center">
            `;
}

// return the last part of the HTML file
function getFooter() {
    return `</div>
            </div>
        </body>
    </html>`;
}

// return a card based on a passed in Manager object
function makeManagerCard(manager) {
    return `
    <div class="col-12 col-sm-4">
        <div class="card border-danger mb-3">
            <div class="card-header">Manager
                <i class="fas fa-mug-hot"></i>
            </div>
            <div class="card-body text-danger">
                <h5 class="card-title">${manager.getName()}</h5>
                <ul class="list-group">
                    <li class="list-group-item">ID #: ${manager.id}</li>
                    <li class="list-group-item">Email: ${manager.email}</li>
                    <li class="list-group-item">Office #: ${manager.officeNumber}</li>
                </ul>
            </div>
        </div>
    </div>
    `;
}

// return a card based on a passed in Engineer object
function makeEngineerCard(engineer) {
    return `
    <div class="col-12 col-sm-4">
        <div class="card border-primary mb-3">
            <div class="card-header">Engineer 
                <i class="fas fa-glasses"></i>
            </div>
            <div class="card-body text-primary">
                <h5 class="card-title">${engineer.name}</h5>
                <ul class="list-group">
                    <li class="list-group-item">ID #: ${engineer.id}</li>
                    <li class="list-group-item">Email: ${engineer.email}</li>
                    <li class="list-group-item">GitHub ID: ${engineer.github}</li>
                </ul>
            </div>
        </div>
    </div>
  `;
}

// return a card based on a passed in Intern object
function makeInternCard(intern) {
    return `
    <div class="col-12 col-sm-4">
        <div class="card border-success mb-3">
            <div class="card-header">Intern 
                <i class="fas fa-user-graduate"></i>
            </div>
            <div class="card-body text-success">
                <h5 class="card-title">${intern.name}</h5>
                <ul class="list-group">
                    <li class="list-group-item">ID #: ${intern.id}</li>
                    <li class="list-group-item">Email: ${intern.email}</li>
                    <li class="list-group-item">School: ${intern.school}</li>
                </ul>
            </div>
        </div>
    </div>
  `;
}

// return HTML that closes one row and opens a new row
function newRow() {
    return `
            </div>
            <div class="row bodyrow justify-content-center">
            `;
}



module.exports = {
    getHeader: getHeader,
    getFooter: getFooter,
    makeManagerCard: makeManagerCard,
    makeEngineerCard: makeEngineerCard,
    makeInternCard: makeInternCard,
    newRow: newRow
};