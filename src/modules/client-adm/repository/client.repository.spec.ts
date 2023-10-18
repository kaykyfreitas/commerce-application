import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import ClientRepository from "./client.repository";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

describe("ClientRepository test", () => {

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
    const client = new Client({
      id: new Id("1"),
      name: "Client 1",
      email: "client1@email.com",
      document: "000",
      street: "Rua x",
      city: "City x",
      state: "State x",
      number: "123",
      complement: "",
      zipCode: "123456789"
    })

    const repository = new ClientRepository();
    await repository.add(client);

    const result = await ClientModel.findOne({ where: { id: client.id.value } })

    expect(result?.id).toBe(client.id.value);
    expect(result?.name).toBe(client.name);
    expect(result?.email).toBe(client.email);
    expect(result?.document).toBe(client.document);
    expect(result?.street).toBe(client.street);
    expect(result?.city).toBe(client.city);
    expect(result?.state).toBe(client.state);
    expect(result?.number).toBe(client.number);
    expect(result?.complement).toBe(client.complement);
    expect(result?.zipCode).toBe(client.zipCode);
  })

  it("should find a client", async () => {
    const client = await ClientModel.create({
      id: "1",
      name: "Client 1",
      email: "client1@email.com",
      address: "Address 1",
      document: "000",
      street: "Rua x",
      city: "City x",
      state: "State x",
      number: "123",
      complement: "",
      zipCode: "123456789",
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const repository = new ClientRepository();
    const result = await repository.find(client.id);

    expect(result.id.value).toBe(client.id);
    expect(result.name).toBe(client.name);
    expect(result.email).toBe(client.email);
    expect(result?.document).toBe(client.document);
    expect(result?.street).toBe(client.street);
    expect(result?.city).toBe(client.city);
    expect(result?.state).toBe(client.state);
    expect(result?.number).toBe(client.number);
    expect(result?.complement).toBe(client.complement);
    expect(result?.zipCode).toBe(client.zipCode);
  })

})
