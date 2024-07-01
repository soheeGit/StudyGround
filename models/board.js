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
                type: Sequelize.ENUM(1, 2, 3, 4, 5, 6, 7),
                allowNull: false,
                defaultValue: 7,
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
    static associate(db) {}
}

module.exports = Board