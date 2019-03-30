import Sequelize from "sequelize";
import CProps from "./connection.props.json"
import LoadOrder from "./model/loadOrder"
import fs from "fs"
import {promisify} from "util"
import environment from "./cjs"

const readdir = promisify(fs.readdir);
const __dirname = environment.__dirname;

export async function connect() {
    global.sequelize = new Sequelize(
        CProps.database,
        CProps.username,
        CProps.password,
        {
            host: CProps.hostname,
            dialect: CProps.dialect,
            pool: {
                max: CProps.pool.max,
                min: CProps.pool.min,
                acquire: CProps.pool.acquire,
                idle: CProps.pool.idle
            }
        }
    );
    sequelize.tables = {};
    await sequelize.authenticate();
    let tables = LoadOrder.order;
    for (let table of tables) {
        const t = await import("./model/" + table);
        const tableName = table.substr(0, table.indexOf('.', 0));

        let o = t.default();
        sequelize.tables[tableName] = await sequelize.define(tableName, o);

        Object.keys(t.default()).forEach(e => {
            const o = t.default()[e];
           if(o.references){
               sequelize.tables[o.references.model].hasMany(sequelize.tables[tableName], {foreignKey: o.references.key});
               sequelize.tables[tableName].belongsTo(sequelize.tables[o.references.model], {foreignKey: e});
               console.log(`Created relationship ${o.references.model}.${o.references.key} n<=>1 ${tableName}.${e}`)
           }
        });
        try{
            await sequelize.tables[tableName].findAll({attributes: Object.keys(t.default())})
        } catch (e) {
            console.log("RECREATING " + tableName + e);
            await sequelize.tables[tableName].drop();
            await sequelize.tables[tableName].sync();
        }
    }

    return sequelize;
}

export default function (table) {
    return sequelize.tables[table]
}