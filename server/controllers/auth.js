const bcrypt = require('bcrypt')
const passport = require('passport')
const User = require('../models/user')
const { validationResult } = require('express-validator');

exports.join = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {uId, uEmail, uPassword, uName, uNumber, uBirth, uSex, uType} = req.body;
    try{
        const exUser = await User.findOne( {where: { uId } })
        if(exUser) {
            return res.status(400).json({ error: '이미 존재하는 사용자입니다.' });
        }
        const hash = await bcrypt.hash(uPassword, 12)
        await User.create({
            uId,
            uEmail,
            uPassword: hash,
            uName,
            uNumber,
            uBirth,
            uSex,
            uType,
        });
        return res.status(201).json({
            success: true,
            message: '회원가입 성공',
        });
    } catch (error) {
        console.error(error);
        return next(error)
    }
}

exports.login = (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if(authError) {
            console.error(authError);
            return next(authError);
        }
        if(!user) {
            return res.status(401).json({ error: info.message });
        }
        return req.login(user, (loginError) => {
            if(loginError) {
                console.error(loginError)
                return next(loginError)
            }
            console.log('Session after login:', req.session);
            console.log('User ID:', req.user.id);
            return res.status(200).json({
                success: true,
                message: '로그인 성공',
                user
            });
        })
    })(req, res, next);
}

exports.logout = (req, res) => {
    req.logout(() => {
        res.redirect('/')
    })
}