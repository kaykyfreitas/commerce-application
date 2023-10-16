import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import InvoiceItemModel from "./invoice-item.model";
import Invoice from "../domain/invoice";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceRepository from "./invoice.repository";

describe("InvoiceRepository test", () => {


  let sequelize: Sequelize;

  beforeEach(async () => {

    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true}
    });

    sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync();
  })

  afterEach(async () => {
    await sequelize.close();
  })

  it("should save a invoice", async () => {
    const invoice = new Invoice({
      id: new Id("1"),
      name: "Invoice 1",
      document: "123456789",
      address: {
        street: "Rua x",
        number: "123",
        complement: "Casa",
        city: "Ciadade Y",
        state: "Estatdo Z",
        zipCode: "09876123"
      }
      ,
      items: [
        {
          id: new Id("1"),
          name: "Item 1",
          price: 50
        }
      ],
    })

    const repository = new InvoiceRepository();
    const result = await repository.save(invoice);

    expect(result.id).toBeDefined();
    expect(result.name).toBe(invoice.name);
    expect(result.address.street).toBe(invoice.address.street);
    expect(result.address.number).toBe(invoice.address.number);
    expect(result.address.complement).toBe(invoice.address.complement);
    expect(result.address.city).toBe(invoice.address.city);
    expect(result.address.state).toBe(invoice.address.state);
    expect(result.address.zip).toBe(invoice.address.zip);
    expect(result.items.length).toBe(1);
    expect(result.items[0].id.value).toBe(invoice.items[0].id.value);
    expect(result.items[0].name).toBe(invoice.items[0].name);
    expect(result.items[0].price).toBe(invoice.items[0].price);
  })

  it("should find a invoice", async () => {
    const invoice = new Invoice({
      id: new Id("1"),
      name: "Invoice 1",
      document: "123456789",
      address: {
        street: "Rua x",
        number: "123",
        complement: "Casa",
        city: "Ciadade Y",
        state: "Estatdo Z",
        zipCode: "09876123"
      }
      ,
      items: [
        {
          id: new Id("1"),
          name: "Item 1",
          price: 50
        }
      ],
    })

    const repository = new InvoiceRepository();
    await repository.save(invoice);

    const result = await repository.find("1");


    expect(result.id).toBeDefined();
    expect(result.name).toBe(invoice.name);
    expect(result.address.street).toBe(invoice.address.street);
    expect(result.address.number).toBe(invoice.address.number);
    expect(result.address.complement).toBe(invoice.address.complement);
    expect(result.address.city).toBe(invoice.address.city);
    expect(result.address.state).toBe(invoice.address.state);
    expect(result.address.zip).toBe(invoice.address.zip);
    expect(result.items.length).toBe(1);
    expect(result.items[0].id.value).toBe(invoice.items[0].id.value);
    expect(result.items[0].name).toBe(invoice.items[0].name);
    expect(result.items[0].price).toBe(invoice.items[0].price);
  })

})