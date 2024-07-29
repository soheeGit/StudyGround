const SocketIO = require('socket.io')

module.exports = (server) => {
    const io = SocketIO(server, {path: '/socket.io'})

    io.on('connection', (socket) => {
        const req = socket.request;
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        console.log('새로운 클라이언트 접속', ip, socket.id);
        socket.on('disconnect', () => {
            console.log('클라이언트 접속 해제', ip, socket.id);
            clearInterval(socket.interval);
        })
        socket.on('reply', (data) => {
            console.log(data);
        })
        socket.on('error', console.error);
        socket.interval = setInterval(()=> {
            socket.send('서버에서 클라이언트로 메시지를 보냅니다.')
        }, 3000);
    })
}