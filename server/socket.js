const SocketIO = require('socket.io')
const { User } = require('./models')
const { removeRoom } = require('./services/chat');

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

    chat.on('connection', async (socket) => {
        console.log('chat 네임스페이스 접속');
        const req = socket.request;
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        console.log('새로운 클라이언트 접속', ip, socket.id);
        const user = await User.findOne({where: {id: req.user.id}}) 
        socket.on('join', (data) => {
            socket.join(data);  //데이터는 방 id, 방에 참가
            socket.to(data).emit('join', {
                user: 'system',
                chat: `${user}님이 입장하셨습니다.`
            })
        })
        socket.on('disconnect', async () => {
            console.log('클라이언트 접속 해제', ip, socket.id);
            const { referer } = socket.request.headers;     //  /room/방아이디
            const roomId = new URL(referer).pathname.split('/').at(-1)
            const currentRoom = chat.adapter.rooms.get(roomId) 
            const userCount = currentRoom.size || 0     // 방 현재 참가자 수 가져오기
            if (userCount === 0) {
                await removeRoom(roomId);
                room.emit('removeRoom', roomId);
                console.log('방 제거 요청 성공')
            } else {
                socket.to(roomId).emit('exit', {
                    user: 'system',
                    chat:  `${user}님이 퇴정하셨습니다.`
                })
            }
        })
    })
}