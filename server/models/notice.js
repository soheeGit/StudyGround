const Sequelize = require('sequelize');

class Notice extends Sequelize.Model {
    static initiate(sequelize) {
        Notice.init({
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
            modelName: 'Notice',
            tableName: 'notices',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db) {
        db.Notice.belongsTo(db.User);
        db.Notice.belongsTo(db.Board);
        db.Notice.hasMany(db.File, {
            foreignKey: 'fileableId',
            constraints: false,
            scope: {
                fileableType: 'Notice'
            },
            onDelete: 'CASCADE'
        });
    }
}

module.exports = Notice;
