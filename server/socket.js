const SocketIO = require('socket.io')

module.exports = (sv, server, sessionMiddleware) => {
    const io = SocketIO(sv, {path: '/socket.io'})
    server.set('io', io);
    const board = io.of('/board')
    const chat = io.of('/chat')

    const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
    chat.use(wrap(sessionMiddleware))

    board.on('connection', (socket) => {
        console.log('board 네임스페이스 접속');
        socket.on('disconnect', () => {
            console.log('board 네임스페이스 접속 해제')
        })
    })

    chat.on('connection', (socket) => {
        console.log('chat 네임스페이스 접속');
        const req = socket.request;
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        console.log('새로운 클라이언트 접속', ip, socket.id);
        socket.on('disconnect', () => {
            console.log('클라이언트 접속 해제', ip, socket.id);
            clearInterval(socket.interval);
        })
        socket.on('join', (data) => {
            socket.join(data);  //데이터는 방 id, 방에 참가
        })
        socket.on('error', console.error);
        socket.interval = setInterval(()=> {
            socket.emit('news', 'Hello Socket.')
        }, 3000);
    })
}