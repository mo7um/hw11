const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let clients = [];

wss.on('connection', (ws) => {
    console.log('Новое соединение установлено.');
    clients.push(ws); // Добавление нового клиента в список.
    ws.send("Добро пожаловать в чат!");

    ws.on('message', (message) => {
        console.log(`Получено сообщение: ${message}`);
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    })

    ws.on('close', () => {
        console.log('Клиент отключился.');
        clients = clients.filter(client => client !== ws)
    });
});
console.log('WebSocket сервер запущен на localhost:8080.');