exports.renderProfile = (req, res) => {
    res.render('profile', {title:'내 정보'})
};
exports.renderJoin = (req, res) => {
    res.render('join', {title:'회원 가입'})
};
exports.renderMain = (req, res, next) => {
    const boards = [];
    res.render('main', {
        title: 'studyground',
        boards,
    });
};