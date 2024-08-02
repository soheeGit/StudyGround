const SocketIO = require('socket.io')

module.exports = (sv, server, sessionMiddleware) => {
    const io = SocketIO(sv, {path: '/socket.io'})
    server.set('io', io);
    const room = io.of('/room')
    const chat = io.of('/chat')

    const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
    chat.use(wrap(sessionMiddleware))

    room.on('connection', (socket) => {
        console.log('room 네임스페이스 접속');
        socket.on('disconnect', () => {
            console.log('room 네임스페이스 접속 해제')
        })
    })

    chat.on('connection', (socket) => {
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