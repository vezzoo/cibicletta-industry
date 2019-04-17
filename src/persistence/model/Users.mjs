import Sequelize from "sequelize";

export default function () {
    return {
        id: {
            type: Sequelize.BIGINT(11),
            allowNull: false,
            primaryKey: true,
            unique: "user_id"
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING(40),
            allowNull: false
        }
    };
}