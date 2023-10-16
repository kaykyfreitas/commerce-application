import { Sequelize } from "sequelize-typescript"
import ProductModel from "./product.model";
import Product from "../domain/product.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import ProductRepository from "./product.repository";

describe("ProductRepository test", () => {

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
    const productProps = {
      id: new Id("1"),
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const product = new Product(productProps);
    const productRepository = new ProductRepository();

    const result = await productRepository.add(product)

    const savedProduct = await ProductModel.findOne({ where: { id: productProps.id.value } })

    expect(product.id.value).toEqual(savedProduct?.id);
    expect(product.name).toEqual(savedProduct?.name);
    expect(product.description).toEqual(savedProduct?.description);
    expect(product.purchasePrice).toEqual(savedProduct?.purchasePrice);
    expect(product.stock).toEqual(savedProduct?.stock);
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();

    ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const product = await productRepository.find("1");

    expect(product.id.value).toEqual("1");
    expect(product.name).toEqual("Product 1");
    expect(product.description).toEqual("Product 1 description");
    expect(product.purchasePrice).toEqual(100);
  });

})
