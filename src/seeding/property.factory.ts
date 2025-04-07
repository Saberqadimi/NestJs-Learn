import { Faker } from "@faker-js/faker";
import { Property } from "../entities/property.entity";
import { setSeederFactory } from "typeorm-extension";

export const PropertyFactory = setSeederFactory(Property, (faker: Faker) => {
  const property = new Property();

  property.name = faker.address.streetAddress();
  property.price = +faker.commerce.price();
  property.description = faker.lorem.sentence();

  return property;
});
