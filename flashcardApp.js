var inquirer = require("inquirer");

var BasicCard = require("./BasicCard.js");

var ClozeCard = require("./ClozeCard.js");

var basicArray = [];

var clozeArray = [];


//Ask user what kind of card they want to create and run function based on answer.
function command() {

	inquirer.prompt ([
		{
			type: "list",
			name: "command",
			message: "What do you want to do?",
			choices: [
			"Create a Basic Card",
			"Create a Cloze Card"]
		}
	]).then(function(answers) {

		if (answers.command === "Create a Basic Card") {
			createBasicCard();
		}
		else {
			createClozeCard();
		}
	});
};


//Function to create Basic Card.
function createBasicCard() {

	inquirer.prompt ([
		{
			name: "front",
			message: "Enter a question for the front."
		},
		{
			name: "back",
			message: "Enter the answer for the back."
		}

	]).then(function(answers) {
		var newBasic = new BasicCard (answers.front, answers.back);

		//Push BasicCard that was created into an array.
		basicArray.push(newBasic);

		//Ask if user wants to create another card. 
		inquirer.prompt ([
			{
				type: "list",
				name: "more",
				message: "Create another Basic Card?",
				choices: [ "yes", "no" ]
			}
		]).then(function(answers) {

			//If yes, run through function again. If no, console log array of Basic Cards.
			if (answers.more === "yes") {
				createBasicCard();
			}
			else {
				console.log("-------- CARDS CREATED --------");

				for (var i = 0 ; i < basicArray.length ; i++) {
					console.log("Question: " + basicArray[i].front);
					console.log("Answer: " + basicArray[i].back);
					console.log("----------------------------------");
				}
			}
		});

	});
};


//Function to create Cloze Card.
function createClozeCard() {

	inquirer.prompt ([
		{
			name: "text",
			message: "Enter full text..."
		},
		{
			name: "cloze",
			message: "Enter part of text that should be cloze-deleted."
		}

	]).then(function(answers) {
		var newCloze = new ClozeCard (answers.text, answers.cloze);

		//Run function to check that cloze was in the text entered. If it returns true, start over and run createClozeCard function again.
		if (newCloze.checkPartial()) {
			createClozeCard();
		}
		else {

			//If checkPartial function returns false, push the ClozeCard into the clozeArray and ask user if they want to create another.
			clozeArray.push(newCloze);

			inquirer.prompt ([
				{
					type: "list",
					name: "more",
					message: "Create another Cloze Card?",
					choices: [ "yes", "no" ]
				}
			]).then(function(answers) {

				//If user wants to create another card, run through createClozeCard function again. If no, console log the array of Cloze Cards.
				if (answers.more === "yes") {
					createClozeCard();
				}
				else {
					console.log("-------- CARDS CREATED --------");

					for (var i = 0 ; i < clozeArray.length ; i++) {
						console.log("Cloze: " + clozeArray[i].cloze);
						console.log("Partial: " + clozeArray[i].partial);
						console.log("Full Text: " + clozeArray[i].fullText);
						console.log("----------------------------------");
					}
				}
			});
		};
	});

};


//Call the command function to start.
command();
