const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const path = require('path')
const session = require('express-session')
const dotenv = require('dotenv')
const passport = require('passport')

dotenv.config();    //process.env 만들어줌

const pageRouter = require('./routes/page')
const authRouter = require('./routes/auth')
const { sequelize } = require('./models')
const passportConfig = require('./passport')

const server = express();
passportConfig();
server.set('port', process.env.PORT || 5000);
server.set('view engine', 'html');
server.set('views', path.join(__dirname, 'views'));
sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공')
    })
    .catch((err) => {
        console.log(err);
    })

server.use(morgan('dev'));  //현재 개발용. 배포할때 combined로 바꿔야함
server.use(express.static(path.join(__dirname, '../client/build')))
server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true, //자바스크립트에서 접근못하게
        secure: false,  //https 적용할때 true로 바꿔야함
    }
}));

server.use(passport.initialize())
server.use(passport.session())

server.use('/api', pageRouter);
server.use('/auth', authRouter);

server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
})

server.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
server.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);

    if (err.status === 404) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else {
        res.sendFile(path.join(__dirname, 'views', '500.html'));
    }
});

server.listen(server.get('port'), () => {
    console.log(server.get('port'), '번 포트에서 대기 중');
});