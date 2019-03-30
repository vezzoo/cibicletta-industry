import Sequelize from "sequelize";

export default function () {
    return {
        prodotto: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'Products',
                key: 'codice'
            }
        },
        reparto: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'Divisions',
                key: 'codice'
            }
        },
        tempo_produzione: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        difficolta: {
            type: Sequelize.BIGINT,
            allowNull: false
        }
    };
}