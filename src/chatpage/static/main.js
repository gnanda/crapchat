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
var Elements = {
    ERROR_MESSAGE: 'error_message',
    MESSAGES: 'messages',
    NEW_MESSAGE: 'message',
    SUBMIT: 'submit'
};
var Message = /** @class */ (function () {
    function Message(type, content) {
        this.type = type;
        this.content = content;
    }
    return Message;
}());
// Manages websocket connection for sending and receiving messages
var MessageHandler = /** @class */ (function () {
    function MessageHandler(address) {
        this.address = address;
        this.ws = new WebSocket(this.address);
        this.loadListeners();
        this.startPings();
        this.pingFrequency = 3000;
    }
    MessageHandler.prototype.startPings = function () {
        var _this = this;
        switch (this.ws.readyState) {
            case WebSocket.OPEN:
                this.sendMessage(new Message('PING', ''));
                window.setTimeout(function () { return _this.startPings(); }, this.pingFrequency);
                break;
            case WebSocket.CONNECTING:
                window.setTimeout(function () { return _this.startPings(); }, this.pingFrequency);
                break;
        }
    };
    MessageHandler.prototype.loadListeners = function () {
        var _this = this;
        this.ws.addEventListener('open', function (evt) {
            console.log("open " + JSON.stringify(evt));
            //this.ws.send('yoyoyo');
            _this.startPings();
        });
        this.ws.addEventListener('close', function (evt) {
            console.log("close " + JSON.stringify(evt));
        });
        this.ws.addEventListener('error', function (evt) {
            console.log("error " + JSON.stringify(evt));
        });
        this.ws.addEventListener('message', function (evt) {
            console.log("message " + JSON.stringify(evt) + " data: " + evt.data);
        });
    };
    MessageHandler.prototype.sendMessage = function (message) {
        this.ws.send(JSON.stringify(message));
    };
    return MessageHandler;
}());
// TODO Learn React???
// Manages the elements on the page 
var PageManager = /** @class */ (function () {
    function PageManager() {
        this.error_message = null;
        this.messages = null;
        this.new_message = null;
        this.submit_button = null;
        this.message_handler = new MessageHandler('ws://' + window.location.host + '/messages');
    }
    /**
      Load the elements on the page
    */
    PageManager.prototype.loadElements = function () {
        this.error_message = document.getElementById(Elements.ERROR_MESSAGE);
        this.messages = document.getElementById(Elements.MESSAGES);
        this.new_message = document.getElementById(Elements.NEW_MESSAGE);
        this.submit_button = document.getElementById(Elements.SUBMIT);
    };
    PageManager.prototype.loadPageHandlers = function () {
        var _this = this;
        if (!this.submit_button) {
            throw Error('Submit button is null');
        }
        this.submit_button.onclick = function () { return _this.sendMessage(); };
    };
    PageManager.prototype.sendMessage = function () {
        if (!this.new_message) {
            throw Error('new_message is null');
        }
        var text = this.new_message.value;
        if (!text) {
            this.displayError('Message is empty');
            throw Error('No text');
        }
        var message = new Message('MESSAGE', text);
        this.message_handler.sendMessage(message);
        this.new_message.value = '';
    };
    PageManager.prototype.displayError = function (error_message) {
        if (this.error_message == null) {
            throw Error('error_message is null');
        }
        this.error_message.innerText = error_message;
    };
    /**
      Load the page
    */
    PageManager.prototype.load = function () {
        this.loadElements();
        this.loadPageHandlers();
    };
    return PageManager;
}());
/* document.addEventListener('DOMContentLoaded', () => document.body.textContent += greeter(user), false); */
var pm = new PageManager();
document.addEventListener('DOMContentLoaded', function () { return pm.load(); }, false);
