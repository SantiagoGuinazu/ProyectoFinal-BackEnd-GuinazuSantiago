const socket = io();

socket.on("connect", () => {
    console.log("cliente conectado del lado del front")
})