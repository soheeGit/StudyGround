const Sequelize = require('sequelize')

class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init({
            nickname: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING(40),
                allowNull: true,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(100),
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
            type: {
                type: Sequelize.ENUM('선구자', '탐구자', '지도자', '추진자', '수행자', '전략판단가', '완주자', '환기자', '전문가'),
                allowNull: false,
            } 
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
    static associate(db) {}
};

module.exports = User;