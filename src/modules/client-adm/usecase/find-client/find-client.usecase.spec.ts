import Id from "../../../@shared/domain/value-object/id.value-object"
import Client from "../../domain/client.entity"
import FindClientUseCase from "./find-client.usecase"

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
  zipCode: "123456789",
})

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(client)),
  }
}

describe("Find client usecase unit test", () => {

  it("should find a client", async () => {
    const repository = MockRepository();
    const usecase = new FindClientUseCase(repository);

    const input = {
      id: "1"
    }

    const result = await usecase.execute(input);

    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(client.name);
    expect(result.email).toBe(client.email);
    expect(result.document).toBe(client.document);
    expect(result.street).toBe(client.street);
    expect(result.city).toBe(client.city);
    expect(result.state).toBe(client.state);
    expect(result.number).toBe(client.number);
    expect(result.complement).toBe(client.complement);
    expect(result.zipCode).toBe(client.zipCode);
  })

})