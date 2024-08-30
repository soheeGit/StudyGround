const SocketIO = require('socket.io')
const passport = require('passport');
const { User } = require('./models')
const { removeRoom } = require('./services/chat');

module.exports = (sv, server, sessionMiddleware) => {
    const io = SocketIO(sv, {
        path: '/socket.io',
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
            credentials: true
        }
    })
    server.set('io', io);
    const room = io.of('/room')
    const chat = io.of('/chat')

    const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
    chat.use(wrap(sessionMiddleware))
    chat.use(wrap(passport.initialize()));
    chat.use(wrap(passport.session()));

    room.on('connection', (socket) => {
        console.log('room 네임스페이스 접속');
        socket.on('disconnect', () => {
            console.log('room 네임스페이스 접속 해제')
        })
    })

    chat.on('connection', async (socket) => {
        console.log('chat 네임스페이스 접속');

        const req = socket.request;
        console.log(req.user);
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        console.log('새로운 클라이언트 접속', ip, socket.id);
        try {
            const user = await User.findOne({where: {id: req.user.id}});
            if (!user) {
                console.error('User not found');
                return;
            }
        
            socket.on('join', async (data) => {
                console.log('join 이벤트 데이터:', data);
                socket.join(data);  //데이터는 방 id, 방에 참가
                req.session.roomId = data;
                socket.to(data).emit('join', {
                    user: 'system',
                    chat: `${user.uName}님이 입장하셨습니다.`
                })
            })

            socket.on('send', (messageData) => {
                console.log('Sending message:', messageData);
                socket.to(messageData.boardId).emit('receive_message', messageData);  // 메시지를 특정 방에 있는 모든 클라이언트에게 전송
            });          

            socket.on('disconnect', async () => {
                console.log('클라이언트 접속 해제', ip, socket.id);
                const roomId = req.session.roomId
                console.log('roomId', roomId)
                socket.to(roomId).emit('exit', {
                    user: 'system',
                    chat: `${user.uName}님이 퇴장하셨습니다.`
                })
            })
        } catch (error) {
            console.error('Error during connection:', error);
        }
    })
}