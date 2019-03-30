import Sequelize from "sequelize";

export default function () {
    return {
        father: {
            type: Sequelize.STRING,
            references: {
                model: "Products",
                key: "codice"
            }
        },
        son: {
            type: Sequelize.STRING,
            references: {
                model: "Products",
                key: "codice"
            }
        },
        qta: {
            type: Sequelize.BIGINT
        }
    };
}