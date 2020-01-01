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
    MESSAGES: 'messages',
    NEW_MESSAGE: 'message',
    SUBMIT: 'submit'
};
var PageManager = /** @class */ (function () {
    function PageManager() {
        this.messages = null;
        this.new_message = null;
        this.submit_button = null;
        this.ws = new WebSocket('ws://' + window.location.host + '/messages');
    }
    /**
      Load the elements on the page
    */
    PageManager.prototype.loadElements = function () {
        this.messages = document.getElementById(Elements.MESSAGES);
        this.new_message = document.getElementById(Elements.NEW_MESSAGE);
        this.submit_button = document.getElementById(Elements.SUBMIT);
    };
    PageManager.prototype.loadHandlers = function () {
        this.ws.addEventListener('open', function (evt) {
            console.log("open " + JSON.stringify(evt));
        });
        this.ws.addEventListener('close', function (evt) {
            console.log("close " + JSON.stringify(evt));
        });
        this.ws.addEventListener('error', function (evt) {
            console.log("error " + JSON.stringify(evt));
        });
        this.ws.addEventListener('message', function (evt) {
            console.log("message " + JSON.stringify(evt));
        });
    };
    /**
      Load the page
    */
    PageManager.prototype.load = function () {
        this.loadElements();
        this.loadHandlers();
    };
    return PageManager;
}());
/* document.addEventListener('DOMContentLoaded', () => document.body.textContent += greeter(user), false); */
var pm = new PageManager();
document.addEventListener('DOMContentLoaded', function () { return pm.load(); }, false);
