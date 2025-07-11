const Sequelize = require('sequelize');

class SubmitTask extends Sequelize.Model {
    static initiate(sequelize) {
        SubmitTask.init({     
            content: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'SubmitTask',
            tableName: 'submitTasks',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            indexes: [
                {
                    unique: true,
                    fields: ['userId', 'taskId'] // (userId, taskId) 조합 유일하게
                }
            ]
        });
    }
    static associate(db) {
        db.SubmitTask.belongsTo(db.User, { foreignKey: 'userId' });
        db.SubmitTask.belongsTo(db.Task, { foreignKey: 'taskId' });
        db.SubmitTask.hasMany(db.File, {
            foreignKey: 'fileableId',
            constraints: false,
            scope: {
                fileableType: 'SubmitTask'
            },
            as: 'files',
            onDelete: 'CASCADE'
        });
    }
}

module.exports = SubmitTask;
