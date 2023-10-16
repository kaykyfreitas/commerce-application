import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import ClientAdmFacadeFactory from "../factory/facade.fatory";

describe("ClientAdmFacade test", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize ({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    });
    sequelize.addModels([ ClientModel ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const facade = ClientAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "CLient 1",
      email: "client1@email.com",
      address: "Adress 1",
    }

    await facade.add(input);

    const result = await ClientModel.findOne({ where: { id: input.id } })

    expect(result?.id).toBeDefined()
    expect(result?.name).toBe(input.name);
    expect(result?.email).toBe(input.email);
    expect(result?.address).toBe(input.address);
  });

  it("should find a client", async () => {
    const facade = ClientAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "CLient 1",
      email: "client1@email.com",
      address: "Adress 1",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await ClientModel.create(input);

    const result = await facade.find({ id: input.id })

    expect(result?.id).toBeDefined()
    expect(result?.name).toBe(input.name);
    expect(result?.email).toBe(input.email);
    expect(result?.address).toBe(input.address);
  })

})
