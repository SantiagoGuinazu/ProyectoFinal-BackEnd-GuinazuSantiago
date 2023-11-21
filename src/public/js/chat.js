const socket = io();

let user;
let chatBox = document.getElementById('chatBox');
let log = document.getElementById('messageLogs');
let data;

socket.on('message', msg=>{
    data= msg;
});

socket.on('messageLogs', msgs=>{
    renderizar(msgs);
});

const renderizar = (msgs) =>{
    let messages = '';
    msgs.forEach(message => {
        const isCurrent = message.user === user;
        const messageClass = isCurrentUser ? 'my-message' : 'other-message';
        messages = messages + `<div class="${messageClass}">${message.user}: ${message.message}</div>`
    });

    log.innerHTML = messages;
    chatBox.scrollIntoView(false);
};

Swal.fire({
    title: 'Identificarse',
    input: 'email',
    text: 'Ingresa tu correo electronico',
    inputValidator: (value) => {
        if(!value)
            return 'Necesitas ingresar correo';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

        if(!emailRegex.test(value))
            return 'Ingresa un correo valido'
        return null;
    },
    allowOutsideClick: false
}).then(result => {
    if(result.isConfirmed){
        user = result.value;
        renderizar(data)
    }
});