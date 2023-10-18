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
      name: "Client 1",
      email: "client1@email.com",
      document: "000",
      street: "Rua x",
      city: "City x",
      state: "State x",
      number: "123",
      complement: "",
      zipCode: "123456789"
    }

    await facade.add(input);

    const result = await ClientModel.findOne({ where: { id: input.id } })

    expect(result?.id).toBeDefined()
    expect(result?.name).toBe(input.name);
    expect(result?.email).toBe(input.email);
    expect(result?.document).toBe(input.document);
    expect(result?.street).toBe(input.street);
    expect(result?.city).toBe(input.city);
    expect(result?.state).toBe(input.state);
    expect(result?.number).toBe(input.number);
    expect(result?.complement).toBe(input.complement);
    expect(result?.zipCode).toBe(input.zipCode);
  });

  it("should find a client", async () => {
    const facade = ClientAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "CLient 1",
      email: "client1@email.com",
      document: "000",
      street: "Rua x",
      city: "City x",
      state: "State x",
      number: "123",
      complement: "",
      zipCode: "123456789",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await ClientModel.create(input);

    const result = await facade.find({ id: input.id })

    expect(result?.id).toBeDefined()
    expect(result?.name).toBe(input.name);
    expect(result?.email).toBe(input.email);
    expect(result?.document).toBe(input.document);
    expect(result?.street).toBe(input.street);
    expect(result?.city).toBe(input.city);
    expect(result?.state).toBe(input.state);
    expect(result?.number).toBe(input.number);
    expect(result?.complement).toBe(input.complement);
    expect(result?.zipCode).toBe(input.zipCode);
  })

})
