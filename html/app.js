//Create Socket Connection
// exports.openSocket = ss;
const openSocket = io.connect('http://localhost:8585');
//Dom

let message, name, btn, output;
const DOMElements = {
    output: '.output',
    name: '#name',
    msg: '#msg',
    btn: '.send',
    chatWindow: '.chat-window',
    feedback: '.feedback'

};

output = document.querySelector(DOMElements.output);
name = document.querySelector(DOMElements.name);
message = document.querySelector(DOMElements.msg);
btn = document.querySelector(DOMElements.btn);
chatWindow = document.querySelector(DOMElements.chatWindow);
feedback = document.querySelector(DOMElements.feedback);

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
btn.addEventListener('click', function () {
    sendMessage();

});
message.addEventListener('keypress', function () {
    openSocket.emit('typing', name.value);

});
message.addEventListener('keyup', function (e) {
    if (e.keyCode === 13)
        sendMessage();

});

//Check for event
openSocket.on('chatMsg', (data) => {
        output.innerHTML += `<p><strong>${data.name} : </strong> ${data.msg}`;
        feedback.innerHTML = '';
    }
);
openSocket.on('typing', (data) => feedback.innerHTML = `<p><em>${data}</em> is typing a message`);
