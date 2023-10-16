import Id from "../../../@shared/domain/value-object/id.value-object"
import Invoice from "../../domain/invoice"
import GenerateInvoiceUseCase from "./generate-invoice.usecase"

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

const MockRepository = () => {
  return {
    find: jest.fn(),
    save: jest.fn().mockReturnValue(Promise.resolve(invoice))
  }
}

describe("GenerateInvoice usecase unit test", () => {

  it("should generate a invoice", async () => {
    const repository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(repository);

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

    const result = await usecase.execute(input);

    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.document).toBe(input.document);
    expect(result.street).toBe(input.street);
    expect(result.number).toBe(input.number);
    expect(result.complement).toBe(input.complement);
    expect(result.city).toBe(input.city);
    expect(result.state).toBe(input.state);
    expect(result.zipCode).toBe(input.zipCode);
    expect(result.items.length).toBe(1);
    expect(result.items[0].id).toBe(input.items[0].id);
    expect(result.items[0].name).toBe(input.items[0].name);
    expect(result.items[0].price).toBe(input.items[0].price)
    expect(result.total).toBe(50);
  })

})   