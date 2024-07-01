const Sequelize = require('sequelize')

class Board extends Sequelize.Model {
    static initiate(sequelize) {
        Board.init({
            boardId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
            },
            content: {
                type: Sequelize.STRING(140),
                allowNull: false,
            },
            count: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            type: {
                type: Sequelize.ENUM('어학', '취업', '고시/공무원', '프로그래밍', '취미/교양', '기타'),
                allowNull: false,
                defaultValue: '기타',
            },
            number: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            startDate: {
                type: Sequelize.DATE, 
                allowNull: false, 
            },
            closingDate: {
                type: Sequelize.DATE, 
                allowNull: false,
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
        db.Board.belongsTo(db.User);
    }
}

module.exports = Board