import Sequelize from "sequelize";

export default function () {
    return {
        codice: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
            unique: "name_unique"
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        production: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "ESTERNA"
        }
    };
}