import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { pgConfig } from "../../dbConfig";
import { PropertyFactory } from "./property.factory";
import { UserFactory } from "./user.factory";
import { PropertyFeatureFactory } from "./propertyFeature.factory";
import { MainSeeder } from "./main.seeder";

const options: DataSourceOptions & SeederOptions = {
    ...pgConfig,
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