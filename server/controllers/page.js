exports.renderLogin = (req, res) => {
    res.render('main/login/Login', {title:'로그인'})
};
exports.renderProfile = (req, res) => {
    res.render('main/profile', {title:'내 정보'})
};
exports.renderJoin = (req, res) => {
    res.render('main/join/JoinupForm2', {title:'회원 가입'})
};
exports.renderMain = (req, res, next) => {
    const boards = [];
    res.render('main', {
        title: 'studyground',
        boards,
    });
};