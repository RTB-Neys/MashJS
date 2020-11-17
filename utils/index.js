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
            message: "What technologies were used in this project?",
            name: "technologies"
        },
        {
            type: "input",
            message: "What are the installation instructions for this project, if any",
            name: "installation"
        },
        {
            type: "input",
            message: "How would you like your application to be used?",
            name: "usage"
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
        - [Technologies](#technologies)

    ## Description:
    ${ response.description }

    ## Installation:
    ${ response.installation }

    ## Usage:
    ${ response.usage }

    ## Technologies:
    ${ response.technologies }

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


