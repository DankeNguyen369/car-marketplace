import { faker } from "@faker-js/faker";

function createRandomeCarList(params) {
  return {
    name: faker.vehicle.vehicle(),
    fuelType: faker.vehicle.fuel(),
    model: faker.vehicle.model(),
    type: faker.vehicle.type(),
    image:
      "https://magnetis-plateforme.s3.ca-central-1.amazonaws.com/vehicle_models/images/7379c6cd423a5c9f5cb9de62a64a2d5e/418/trim_2472/color_NH883P/48eed641dcd0e30f5edc37afddff4e75-cc_2025ACS110009_01_1280_NH883P-730x548.png",
    miles: 1000,
    gearType: "Automatic",
    price: faker.finance.amount({ min: 4000, max: 20000 }),
  };
}

const carList = faker.helpers.multiple(createRandomeCarList, { count: 7 });

export default {
  carList,
};
