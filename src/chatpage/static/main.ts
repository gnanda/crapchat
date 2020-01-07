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
	ERROR_MESSAGE: 'error_message',
	MESSAGES: 'messages',
	NEW_MESSAGE: 'message',
	SUBMIT: 'submit',
};

class Message {
	constructor(public type: string, public content: string) {}
}

// Manages websocket connection for sending and receiving messages
class MessageHandler {
	private ws: WebSocket;
	private pingFrequency: number;
	constructor(private address: string) {
		this.ws = new WebSocket(this.address);
		this.loadListeners();
		this.startPings();
		this.pingFrequency = 3000;
	}

	startPings() {
		switch (this.ws.readyState) {
			case WebSocket.OPEN:
				this.sendMessage(new Message('PING', ''));
				window.setTimeout(() => this.startPings(), this.pingFrequency);
				break;
			case WebSocket.CONNECTING:
				window.setTimeout(() => this.startPings(), this.pingFrequency);
				break;
		}
	}

	loadListeners() {
		this.ws.addEventListener('open', (evt) => {
			console.log(`open ${JSON.stringify(evt)}`);
			//this.ws.send('yoyoyo');
			this.startPings();
		});

		this.ws.addEventListener('close', (evt) => {
			console.log(`close ${JSON.stringify(evt)}`);
		});

		this.ws.addEventListener('error', (evt) => {
			console.log(`error ${JSON.stringify(evt)}`);
		});

		this.ws.addEventListener('message', (evt) => {
			console.log(`message ${JSON.stringify(evt)} data: ${evt.data}`);
		});
	}

	sendMessage(message: Message) {
		this.ws.send(JSON.stringify(message));
	}

}

// TODO Learn React???
// Manages the elements on the page 
class PageManager {
	error_message: HTMLParagraphElement | null;
	messages: HTMLTextAreaElement | null;
	new_message: HTMLInputElement | null;
	submit_button: HTMLButtonElement | null;
	message_handler: MessageHandler;

	constructor() {
		this.error_message = null;
		this.messages = null;
		this.new_message = null;
		this.submit_button = null;
		this.message_handler = new MessageHandler('ws://' + window.location.host + '/messages');
	}

	/**
	  Load the elements on the page
	*/
	loadElements() {
		this.error_message = document.getElementById(Elements.ERROR_MESSAGE) as HTMLParagraphElement;
		this.messages = document.getElementById(Elements.MESSAGES) as HTMLTextAreaElement;
		this.new_message = document.getElementById(Elements.NEW_MESSAGE) as HTMLInputElement;
		this.submit_button = document.getElementById(Elements.SUBMIT) as HTMLButtonElement;
	}

	loadPageHandlers() {
		if (!this.submit_button) {
			throw Error('Submit button is null');
		}
		this.submit_button.onclick = () => this.sendMessage();
	}

	sendMessage() {
		if (!this.new_message) {
			throw Error('new_message is null');
		}
		const text = this.new_message.value;
		if (!text) {
			this.displayError('Message is empty');
			throw Error('No text');
		}
		const message = new Message('MESSAGE', text);
		this.message_handler.sendMessage(message);
		this.new_message.value = '';
	}

	displayError(error_message: string) {
		if (this.error_message == null) {
			throw Error('error_message is null');
		}
		this.error_message.innerText = error_message;
	}

	/**
	  Load the page
	*/
	load() {
		this.loadElements();
		this.loadPageHandlers();
	}

}

/* document.addEventListener('DOMContentLoaded', () => document.body.textContent += greeter(user), false); */
const pm = new PageManager();
document.addEventListener('DOMContentLoaded', () => pm.load(), false);

