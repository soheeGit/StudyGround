const Sequelize = require('sequelize');

class Task extends Sequelize.Model {
    static initiate(sequelize) {
        Task.init({
            title: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },  
            deadline: {
                type: Sequelize.DATE,
                allowNull: false,
            },      
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
            modelName: 'Task',
            tableName: 'tasks',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db) {
        db.Task.belongsTo(db.User, { foreignKey: 'userId' });
        db.Task.belongsTo(db.Board);
        db.Task.hasMany(db.File, {
            foreignKey: 'fileableId',
            constraints: false,
            scope: {
                fileableType: 'Task'
            },
            as: 'files',
            onDelete: 'CASCADE'
        });
        db.Task.hasMany(db.SubmitTask, { foreignKey: 'taskId' });
    }
}

module.exports = Task;
