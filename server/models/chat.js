const Sequelize = require('sequelize');

class Chat extends Sequelize.Model {
    static initiate(sequelize) {
        Chat.init({
            message: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            imageUrl: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
            },
            roomId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'rooms',
                    key: 'id'
                },
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Chat',
            tableName: 'chats',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Chat.belongsTo(db.Room, { foreignKey: 'roomId' });
        db.Chat.belongsTo(db.User, { foreignKey: 'userId' });
    }
}

module.exports = Chat;