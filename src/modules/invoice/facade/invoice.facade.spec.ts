import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import InvoiceItemModel from "../repository/invoice-item.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

describe("InvoiceFacade test", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize ({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    });
    sequelize.addModels([ InvoiceModel, InvoiceItemModel ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should generate a invoice", async () => {
    const facade = InvoiceFacadeFactory.create();

    const input = {
      name: "Invoice 1",
      document: "123456789",
      street: "Rua x",
      number: "123",
      complement: "Casa",
      city: "Ciadade Y",
      state: "Estatdo Z",
      zipCode: "09876123",
      items: [
        {
          id: "1",
          name: "Item 1",
          price: 50
        }
      ],
    }

    const result = await facade.generate(input);
    
    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.street).toBe(input.street);
    expect(result.number).toBe(input.number);
    expect(result.complement).toBe(input.complement);
    expect(result.city).toBe(input.city);
    expect(result.state).toBe(input.state);
    expect(result.zipCode).toBe(input.zipCode);
    expect(result.items.length).toBe(1);
    expect(result.items[0].id).toBe(input.items[0].id);
    expect(result.items[0].name).toBe(input.items[0].name);
    expect(result.items[0].price).toBe(input.items[0].price);
    expect(result.total).toBe(50);
  })

  it("should find a invoice", async () => {
    const facade = InvoiceFacadeFactory.create();

    const generateInput = {
      name: "Invoice 1",
      document: "123456789",
      street: "Rua x",
      number: "123",
      complement: "Casa",
      city: "Ciadade Y",
      state: "Estatdo Z",
      zipCode: "09876123",
      items: [
        {
          id: "1",
          name: "Item 1",
          price: 50
        }
      ],
    }

    const savedInvoice = await facade.generate(generateInput);

    const input = { id: savedInvoice.id }

    const result = await facade.find(input);
    
    expect(result.id).toBeDefined();
    expect(result.name).toBe(generateInput.name);
    expect(result.address.street).toBe(generateInput.street);
    expect(result.address.number).toBe(generateInput.number);
    expect(result.address.complement).toBe(generateInput.complement);
    expect(result.address.city).toBe(generateInput.city);
    expect(result.address.state).toBe(generateInput.state);
    expect(result.address.zipCode).toBe(generateInput.zipCode);
    expect(result.items.length).toBe(1);
    expect(result.items[0].id).toBe(generateInput.items[0].id);
    expect(result.items[0].name).toBe(generateInput.items[0].name);
    expect(result.items[0].price).toBe(generateInput.items[0].price);
    expect(result.total).toBe(50);
  })

})