const Sequelize = require('sequelize')

class Room extends Sequelize.Model {
    static initiate(sequelize) {
        Room.init({
            title: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            max: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 2,
            },
            userId: {
                type: Sequelize.STRING(15),
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
            },
            boardId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'boards',
                    key: 'bId'
                }
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Room',
            tableName: 'rooms',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db) {
        db.Room.belongsTo(db.Board, { foreignKey: 'boardId' });
        db.Room.belongsToMany(db.User, { through: 'RoomUser', foreignKey: 'roomId' });
        db.Room.hasMany(db.Chat, { foreignKey: 'roomId' });
    }
}

module.exports = Room