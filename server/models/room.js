const Sequelize = require('sequelize')

class Room extends Sequelize.Model {
    static initiate(sequelize) {
        Room.init({
            
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
        
    }
}

module.exports = Room