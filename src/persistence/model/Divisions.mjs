import Sequelize from "sequelize";

export default function () {
    return {
        codice: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
            unique: "codice_unique"
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        caricoMassimo: {
            type: Sequelize.BIGINT(11),
            allowNull: false,
            defaultValue: 100
        }
    };
}