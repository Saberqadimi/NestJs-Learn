import { Faker } from "@faker-js/faker";
import { PropertyFeature } from "../entities/propertyFeature.entity";
import { setSeederFactory } from "typeorm-extension";

export const PropertyFeatureFactory = setSeederFactory(PropertyFeature, (faker: Faker) => {
  const feature = new PropertyFeature();

  feature.hasSwimmingPool = faker.datatype.boolean();
  feature.hasGardenYard = faker.datatype.boolean();
  feature.hasBalcony = faker.datatype.boolean();
  feature.bedrooms = faker.datatype.number({ min: 1, max: 6 }).toString();
  feature.bathrooms = faker.datatype.number({ min: 1, max: 4 }).toString();
  feature.area = faker.datatype.number({ min: 30, max: 500 });

  return feature;
});
