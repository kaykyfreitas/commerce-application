import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  }
}

describe("Add client usecase unit teste", () => {

  it("should add a client", async () => {
    const repository = MockRepository();
    const usecase = new AddClientUseCase(repository);

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
      zipCode: "123456789",
    }

    const result = await usecase.execute(input);

    expect(repository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.email).toBe(input.email);
    expect(result.document).toBe(input.document);
    expect(result.street).toBe(input.street);
    expect(result.city).toBe(input.city);
    expect(result.state).toBe(input.state);
    expect(result.number).toBe(input.number);
    expect(result.complement).toBe(input.complement);
    expect(result.zipCode).toBe(input.zipCode);
  })

})