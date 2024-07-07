const Sequelize = require('sequelize');
const { sequelize } = require('./models');

class BoardRequest extends Sequelize.Model {
    static initiate(sequelize) {
        BoardRequest.init({
            bqid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            boardId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'boards',
                    key: 'bId'
                }
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
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
}

module.exports = BoardRequest;
