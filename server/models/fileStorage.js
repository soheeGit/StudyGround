const Sequelize = require('sequelize');

class FileStorage extends Sequelize.Model {
    static initiate(sequelize) {
        FileStorage.init({
            title: {
                type: Sequelize.STRING(50),
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
                    model: 'users', // 연관된 User 모델
                    key: 'id'
                }
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'FileStorage',
            tableName: 'fileStorages',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db) {
        db.FileStorage.belongsTo(db.User, { foreignKey: 'userId' });
        db.FileStorage.belongsTo(db.Board);
        db.FileStorage.hasMany(db.File, {
            foreignKey: 'fileableId',
            constraints: false,
            scope: {
                fileableType: 'FileStorage'
            },
            as: 'files',
            onDelete: 'CASCADE'
        });
    }
}

module.exports = FileStorage;
