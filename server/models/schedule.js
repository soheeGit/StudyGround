const Sequelize = require('sequelize');

class Schedule extends Sequelize.Model {
    static initiate(sequelize) {
        Schedule.init({
            date: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            time: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            goal: {
                type: Sequelize.STRING(100),
                allowNull:true,
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Schedule',
            tableName: 'schedules',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db) {
        db.Schedule.belongsTo(db.Board);
    }
}

module.exports = Schedule;
