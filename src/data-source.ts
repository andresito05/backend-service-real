import "reflect-metadata";
import { DataSource } from "typeorm";
import { Juegosya } from "./entities/Juegosya";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true, 
    logging: false,
    entities: [Juegosya], 
    migrations:[],
    subscribers:[]
});