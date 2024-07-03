const Sequelize = require('sequelize')

class Board extends Sequelize.Model {
    static initiate(sequelize) {
        Board.init({
            bId: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            bName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            bDescription: {
                type: Sequelize.STRING(140),
                allowNull: false,
            },
            bCurrentNumber: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1,
            },
            bTotalNumber: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            bType: {
                type: Sequelize.ENUM('어학', '취업', '고시/공무원', '프로그래밍', '취미/교양', '기타'),
                allowNull: false,
                defaultValue: '기타',
            },
            bRules: {
                type: Sequelize.STRING(140),
                allowNull: true,
            },
            bStartDate: {
                type: Sequelize.DATE, 
                allowNull: false, 
            },
            bClosingDate: {
                type: Sequelize.DATE, 
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Board',
            tableName: 'boards',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db) {
        db.Board.belongsToMany(db.User, { through: 'BoardUser', foreignKey: 'boardId' });
        db.Board.hasMany(db.Schedule);
    }
}

module.exports = Board