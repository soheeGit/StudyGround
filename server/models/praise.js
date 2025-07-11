const Sequelize = require('sequelize');

class Praise extends Sequelize.Model {
    static initiate(sequelize) {
        Praise.init({
            name: {
                type: Sequelize.ENUM('답장이 빨라요', '열정적이에요', '주도적이에요', '리더십이 있어요', '꼼꼼한 성격을 가졌어요', '창의적이에요', '성실해요', '시간약속을 잘 지켜요'),
                allowNull: false,
                unique: true,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Praise',
            tableName: 'praises',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db) {
        db.Praise.belongsToMany(db.Review, { through: 'ReviewPraise', foreignKey: 'praiseId' });
    }
}

module.exports = Praise;
