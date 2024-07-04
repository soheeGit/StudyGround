const Sequelize = require('sequelize');

class Memo extends Sequelize.Model {
    static initiate(sequelize) {
        Memo.init({
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
            modelName: 'Memo',
            tableName: 'memos',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db) {
        db.Memo.belongsTo(db.User)
    }
}

module.exports = Memo;
