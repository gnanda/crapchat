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

class MessageHandler {

}

class PageManager {
	messages: HTMLTextAreaElement | null;
	new_message: HTMLInputElement | null;
	submit_button: HTMLButtonElement | null;
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
		this.messages = document.getElementById(Elements.MESSAGES) as HTMLTextAreaElement;
		this.new_message = document.getElementById(Elements.NEW_MESSAGE) as HTMLInputElement;
		this.submit_button = document.getElementById(Elements.SUBMIT) as HTMLButtonElement;
	}

	loadWebsocketListeners() {
		this.ws.addEventListener('open', (evt) => {
			console.log(`open ${JSON.stringify(evt)}`);
			this.ws.send('yoyoyo');
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

	loadHandlers() {
		document.getElementById('submit').onclick = () => this.sendMessage();
		/* this.submit_button.addEventListener('click', () => this.sendMessage, false); */
	}

	sendMessage() {
		if (!this.new_message) {
			throw Error('new_message is null');
		}
		if (!this.ws) {
			throw Error('ws is null');
		}
		const text = this.new_message.value;
		if (!text) {
			throw Error('No text');
		}
		this.new_message.value = '';
		const message = {
			'type': 'MESSAGE',
			'value': text,
		}
		this.ws.send(JSON.stringify(message));
	}

	/**
	  Load the page
	*/
	load() {
		this.loadElements();
		this.loadWebsocketListeners();
		this.loadHandlers();
	}

}

/* document.addEventListener('DOMContentLoaded', () => document.body.textContent += greeter(user), false); */
const pm = new PageManager();
document.addEventListener('DOMContentLoaded', () => pm.load(), false);

