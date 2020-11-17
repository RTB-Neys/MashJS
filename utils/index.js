const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

function promptQuestions() {
      return inquirer.prompt([
        {
            type: "input",
            message: "What is your project title?",
            name: "title"
        },
        {
            type: "input",
            message: "Please enter a description of your project.",
            name: "description"
        },
        {
            type: "input",
            message: "What license was used for this project, if any?",
            name: "license"
        },       
        {
            type: "input",
            message: "What are the installation instructions for this project, if any?",
            name: "installation"
        },
        {
            type: "input",
            message: "How would you like your application to be used?",
            name: "usage"
        },
        {
            type: "input",
            message: "Please enter the name(s) of the contributing creator(s)",
            name: "contributing"
        },
        {
            type: "input",
            message: "What command do you use to this the App?",
            name: "tests"
        },
        {
            type: "input",
            message: "What is your Github Username?",
            name: "username"
        },
        {
            type: "input",
            message: "What is your email?",
            name: "email"
        },


    ]);
}


function generateMarkdown(response) {
    return `

    # ${ response.title }

    # Table of Contents
        
        - [Description](#description)
        - [Installation](#installation)
        - [Usage](#usage)
        - [License](#license)
        - [Contributing](#contributing)
        - [Tests](#tests)
        - [Questions](#questions)

    ## Description:
    ${ response.description }

    ## Installation:
    ${ response.installation }

    ## Usage:
    ${ response.usage }

    ## License:
    ${ response.license }

    ## Contributing:
    ${ response.contributing }

    ## Tests:
    ${ response.tests }

    ## Questions:

    #Should you have any questions, you may review my github reposiory or email me. 

    -[GitHub Profile](https://github.com/${response.username})
        - ${ response.email }
        `;

}

async function init() {
    try {
        const response = await promptQuestions();
        const readMe = generateMarkdown(response);

        await writeFileAsync("README.md", readMe);
        console.log("It Worked!")
    } catch (error) {
        console.log(error);
    }
}

init();
