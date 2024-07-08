const Sequelize = require('sequelize');

class StudyMaterial extends Sequelize.Model {
    static initiate(sequelize) {
        StudyMaterial.init({
            title: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },        
            content: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'StudyMaterial',
            tableName: 'studymaterials',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db) {
        db.StudyMaterial.belongsTo(db.User);
        db.StudyMaterial.belongsTo(db.Board);
        db.StudyMaterial.hasMany(db.File, {
            foreignKey: 'fileableId',
            constraints: false,
            scope: {
                fileableType: 'StudyMaterial'
            }
        });
    }
}

module.exports = StudyMaterial;
