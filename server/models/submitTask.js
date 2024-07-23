const Sequelize = require('sequelize');

class SubmitTask extends Sequelize.Model {
    static initiate(sequelize) {
        SubmitTask.init({     
            content: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
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
        db.SubmitTask.belongsTo(db.User);
        db.SubmitTask.belongsTo(db.Task);
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
