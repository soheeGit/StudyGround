const passport = require('passport')
const local = require('./localStrategy')
const kakao = require('./kakaoStrategy')
const User = require('../models/user')

module.exports = () => {
    passport.serializeUser((user, done) => {    //로그인시 실행
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {    //각 요청마다 실행
        User.findOne({ where: { id } })
            .then(user => done(null, user))
            .catch(err => done(err))
    })

    local()
    kakao()
}