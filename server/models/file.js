const Sequelize = require('sequelize');

class File extends Sequelize.Model {
    static initiate(sequelize) {
        File.init({
            fileName: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
            fileableType: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            fileableId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'File',
            tableName: 'files',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db) {
        db.File.belongsTo(db.Notice, { foreignKey: 'fileableId', constraints: false, onDelete: 'CASCADE' });
        db.File.belongsTo(db.StudyMaterial, { foreignKey: 'fileableId', constraints: false, onDelete: 'CASCADE' });
        db.File.belongsTo(db.Task, { foreignKey: 'fileableId', constraints: false, onDelete: 'CASCADE' });
        db.File.belongsTo(db.SubmitTask, { foreignKey: 'fileableId', constraints: false, onDelete: 'CASCADE' });
        db.File.belongsTo(db.FileStorage, { foreignKey: 'fileableId', constraints: false, onDelete: 'CASCADE' });
    }
}

module.exports = File;
