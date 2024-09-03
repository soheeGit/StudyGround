const Sequelize = require('sequelize');

class File extends Sequelize.Model {
    static initiate(sequelize) {
        File.init({
            fileName: {
                type: Sequelize.STRING(500),
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
        db.File.belongsTo(db.Task, {
          foreignKey: 'fileableId',
          constraints: false, // 외래 키 제약 조건 제거
          scope: { fileableType: 'Task' },
          onDelete: 'CASCADE',
        });
        db.File.belongsTo(db.Notice, {
          foreignKey: 'fileableId',
          constraints: false, // 외래 키 제약 조건 제거
          scope: { fileableType: 'Notice' },
          onDelete: 'CASCADE',
        });
        db.File.belongsTo(db.StudyMaterial, {
          foreignKey: 'fileableId',
          constraints: false, // 외래 키 제약 조건 제거
          onDelete: 'CASCADE',
        });
        db.File.belongsTo(db.SubmitTask, {
          foreignKey: 'fileableId',
          constraints: false, // 외래 키 제약 조건 제거
          onDelete: 'CASCADE',
        });
        db.File.belongsTo(db.FileStorage, {
          foreignKey: 'fileableId',
          constraints: false, // 외래 키 제약 조건 제거
          onDelete: 'CASCADE',
        });
      }
}

module.exports = File;