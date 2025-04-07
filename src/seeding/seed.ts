import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { PropertyFactory } from "./property.factory";
import { UserFactory } from "./user.factory";
import { PropertyFeatureFactory } from "./propertyFeature.factory";
import { MainSeeder } from "./main.seeder";
import dbConfig from "../config/db.config";
import * as dotenv from 'dotenv';
dotenv.config();

const options: DataSourceOptions & SeederOptions = {
    ...dbConfig(),
    factories: [PropertyFactory, UserFactory, PropertyFeatureFactory],
    seeds: [MainSeeder]
}
const dataSource = new DataSource(options);
dataSource.initialize()//connect to database
    .then(async () => {
        await dataSource.synchronize(true); //reset or create tables
        await runSeeders(dataSource); //insert Data Faker to Database
        process.exit();
    });