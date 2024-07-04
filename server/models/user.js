const Sequelize = require('sequelize')

class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init({
            uId: {
                type: Sequelize.STRING(15),
                allowNull: false,
                unique: true,
            },
            uEmail: {
                type: Sequelize.STRING(40),
                allowNull: true,
                unique: true,
            },
            uPassword: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            uName: {
                type: Sequelize.STRING(15),
                allowNull: true,
            },
            uNumber: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            uBirth: {
                type: Sequelize.DATEONLY,
                allowNull: true,
            },
            uSex: {
                type: Sequelize.ENUM('남자', '여자'),
                allowNull: true,
            },
            provider: {
                type: Sequelize.ENUM('local', 'kakao'),
                allowNull: false,
                defaultValue: 'local',
            },
            snsId: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            uType: {
                type: Sequelize.ENUM('선구자', '탐구자', '지도자', '추진자', '수행자', '전략판단가', '완주자', '환기자', '전문가'),
                allowNull: false,
                defaultValue: '선구자',
            },
            uLevel: {
                type: Sequelize.ENUM('하양', '빨강', '주황', '노랑', '초록', '파랑', '보라'),
                allowNull: false,
                defaultValue: '하양',
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.User.belongsToMany(db.Board, { through: 'BoardUser', foreignKey: 'userId' });
        db.User.hasMany(db.Review, { as: 'ReviewsWritten', foreignKey: 'reviewerId' });
        db.User.hasMany(db.Review, { as: 'ReviewsReceived', foreignKey: 'revieweeId' });
        db.User.hasMany(db.Board, { as: 'OwnedBoards', foreignKey: 'leaderId' });
    }
};

module.exports = User;