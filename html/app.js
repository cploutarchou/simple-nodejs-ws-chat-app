//Create Socket Connection
// exports.openSocket = ss;
const openSocket = io.connect('http://localhost:80');
//Dom

let message, name, btn, output;
const DOMElements = {
    output: '.output',
    name: '#name',
    msg: '#msg',
    btn: '.send',
    chatWindow: '.chat-window'

};

output = document.querySelector(DOMElements.output);
name = document.querySelector(DOMElements.name);
message = document.querySelector(DOMElements.msg);
btn = document.querySelector(DOMElements.btn);
chatWindow = document.querySelector(DOMElements.chatWindow);

const sendMessage = () => {
    console.log(message.value);
    if (name.value !== "") {
        name.hidden = true;
    }
    if (message.value) {
        openSocket.emit("chatMsg", {
            msg: message.value,
            name: name.value
        });
        message.value = "";
        message.placeholder = "Reply Message";
    }

};
// Init Event
btn.addEventListener('click', () => {
    sendMessage();

});

message.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        sendMessage();
    }
});
//Check for event

openSocket.on('chatMsg', (data) => {
    output.innerHTML += `<p><strong>${data.name} : </strong> ${data.msg}`;
});