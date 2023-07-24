import CheckStockUseCase from "./check-stock.usecase";

const stock = {
  productId: "1",
  stock: 10
}

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(stock)),
  }
}

describe("Check Stock use case unit test", () => {

  it("should check stock", async () => {
    const productRepository = MockRepository();
    const usecase = new CheckStockUseCase(productRepository);
    const input = {
      productId: "1"
    }

    const result = await usecase.execute(input);

    expect(result).toBeDefined();
    expect(result?.productId).toBe("1");
    expect(result?.stock).toBe(10);
  })
})