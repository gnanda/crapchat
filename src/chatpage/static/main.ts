/* class Student { */
/* 	gpa: number; */
/* 	constructor(public firstName: string, public lastName: string) { */
/* 		this.gpa = 4.0; */
/* 	} */
/* } */

/* interface Person { */
/* 	firstName: string; */
/* 	lastName: string; */
/* } */

/* function greeter(person: Person) { */
/* 	return "hello " + person.firstName + " " + person.lastName; */
/* } */

/* let	user = new Student('Someone', 'Else'); */

const Elements = {
	MESSAGES: 'messages',
	NEW_MESSAGE: 'message',
	SUBMIT: 'submit',
};

class PageManager {
	messages: HTMLElement | null;
	new_message: HTMLElement | null;
	submit_button: HTMLElement | null;
	ws: WebSocket;

	constructor() {
		this.messages = null;
		this.new_message = null;
		this.submit_button = null;
		this.ws = new WebSocket('ws://' + window.location.host + '/messages');
	}

	/**
	  Load the elements on the page
	*/
	loadElements() {
		this.messages = document.getElementById(Elements.MESSAGES);
		this.new_message = document.getElementById(Elements.NEW_MESSAGE);
		this.submit_button = document.getElementById(Elements.SUBMIT);
	}

	loadHandlers() {
		this.ws.addEventListener('open', (evt) => {
			console.log(`open ${JSON.stringify(evt)}`);
		});

		this.ws.addEventListener('close', (evt) => {
			console.log(`close ${JSON.stringify(evt)}`);
		});

		this.ws.addEventListener('error', (evt) => {
			console.log(`error ${JSON.stringify(evt)}`);
		});

		this.ws.addEventListener('message', (evt) => {
			console.log(`message ${JSON.stringify(evt)}`);
		});
	}

	/**
	  Load the page
	*/
	load() {
		this.loadElements();
		this.loadHandlers();
	}

}

/* document.addEventListener('DOMContentLoaded', () => document.body.textContent += greeter(user), false); */
const pm = new PageManager();
document.addEventListener('DOMContentLoaded', () => pm.load(), false);

