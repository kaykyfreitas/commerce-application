import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.model";
import ProductAdmFacadeFactory from "../factory/facade.factory";

describe("ProductAdmFacade test", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize ({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    });
    sequelize.addModels([ ProductModel ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productFacade = ProductAdmFacadeFactory.create();
    const input = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 10,
      stock: 10
    }
    await productFacade.addProduct(input);

    const savedProduct = await ProductModel.findOne({ where: { id: "1" } });

    expect(savedProduct).toBeDefined();
    expect(savedProduct?.id).toBe(input.id);
    expect(savedProduct?.name).toBe(input.name);
    expect(savedProduct?.description).toBe(input.description);
    expect(savedProduct?.purchasePrice).toBe(input.purchasePrice);
  })

  it("should check product stock", async () => {
    const productFacade = ProductAdmFacadeFactory.create();
    const product = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 10,
      stock: 10
    }
    await productFacade.addProduct(product);

    const input = {
      productId: product.id
    }

    const result = await productFacade.checkStock(input);

    expect(result.productId).toBe(product.id);
    expect(result.stock).toBe(product.stock);
  })

})
