const Sequelize = require('sequelize');

class BoardRequest extends Sequelize.Model {
    static initiate(sequelize) {
        BoardRequest.init({
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            boardId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            status: {
                type: Sequelize.ENUM('pending', 'accepted', 'rejected'),
                allowNull: false,
                defaultValue: 'pending'
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'BoardRequest',
            tableName: 'boardrequests',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db) {
        db.BoardRequest.belongsTo(db.Board, { foreignKey: 'boardId', targetKey: 'bId' });
        db.BoardRequest.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
    }
}

module.exports = BoardRequest;