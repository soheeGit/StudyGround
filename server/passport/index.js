const passport = require('passport')
const local = require('./localStrategy')
const kakao = require('./kakaoStrategy')
const User = require('../models/user')

module.exports = () => {
    passport.serializeUser((user, done) => {    //로그인시 실행
        console.log('Serializing user with ID:', user.id);
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {    //각 요청마다 실행
        User.findOne({ where: { id } })
            .then(user => {
                if (user) {
                    console.log('User found:', user);
                    done(null, user); // 사용자 정보를 세션에 저장
                } else {
                    console.log('User not found');
                    done(null, false); // 사용자를 찾지 못했을 경우
                }
            })     
            .catch(err => done(err))
    })

    local()
    kakao()
}