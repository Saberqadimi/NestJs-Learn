import { Faker } from "@faker-js/faker";
import { User } from "../entities/user.entity";
import { setSeederFactory } from "typeorm-extension";


export const UserFactory = setSeederFactory(User, (faker: Faker) => {
    const user = new User();
    user.firstName = faker.name.firstName();
    user.lastName = faker.name.lastName();
    user.email = faker.internet.email();
    user.avatar = faker.image.avatar();
    return user;
});