const Sequelize = require('sequelize');

class Review extends Sequelize.Model {
    static initiate(sequelize) {
        Review.init({
            rating: {
                type: Sequelize.FLOAT,
                allowNull: false,
                validate: {
                    min: 0,
                    max: 5,
                },
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Review',
            tableName: 'reviews',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db) {
        db.Review.belongsTo(db.User, { as: 'reviewer', foreignKey: 'reviewerId' });
        db.Review.belongsTo(db.User, { as: 'reviewee', foreignKey: 'revieweeId' });
        db.Review.belongsToMany(db.Praise, { through: 'ReviewPraise', foreignKey: 'reviewId' });
    }
}

module.exports = Review;
