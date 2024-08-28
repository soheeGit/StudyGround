const Sequelize = require('sequelize');

class Memo extends Sequelize.Model {
    static initiate(sequelize) {
        Memo.init({
            title: {
                type: Sequelize.STRING(30),
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
            modelName: 'Memo',
            tableName: 'memos',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db) {
        db.Memo.belongsTo(db.User, { foreignKey: 'userId' });
    }
}

module.exports = Memo;
