const Sequelize = require('sequelize');

class Schedule extends Sequelize.Model {
    static initiate(sequelize) {
        Schedule.init({
            title: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            startDate: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            startTime: {
                type: Sequelize.TIME,
                allowNull: false,
                defaultValue: Sequelize.literal('\'00:00\''),
            },
            endDate: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            endTime: {
                type: Sequelize.TIME,
                allowNull: false,
                defaultValue: Sequelize.literal('\'00:00\''),
            },
            fullTime: {
                type: Sequelize.ENUM('true', 'false'),
                allowNull: true,
                defaultValue: 'false',
            },
            color: {
                type: Sequelize.ENUM('#C2D9F4', '#72D54A', '#FFD235', '#D9D9D9', '#F7323F', '#FFDEAC'),
                allowNull: false,
                defaultValue:'#C2D9F4',
            },
            url: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            memo: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            boardId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'boards', // 연관된 User 모델
                    key: 'bid'
                }
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
        db.Schedule.belongsTo(db.Board, { foreignKey: 'boardId' });
    }
}

module.exports = Schedule;
