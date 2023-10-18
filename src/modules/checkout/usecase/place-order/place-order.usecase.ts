import { or } from "sequelize";
import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import InvoiceFacadeInterface from "../../../invoice/facade/facade.interface";
import PaymentFacadeInterface from "../../../payment/facade/facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import StoreCatalogFacadeInterface from "../../../store-catalog/facade/store-catalog.facade.interface";
import Client from "../../domain/client.entity";
import Order from "../../domain/order.entity";
import Product from "../../domain/product.entity";
import CheckoutGateway from "../../gateway/checkout.gateway";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUseCase implements UseCaseInterface {

  constructor(
    private _clientFacade: ClientAdmFacadeInterface,
    private _productFacade: ProductAdmFacadeInterface,
    private _catalogFacade: StoreCatalogFacadeInterface,
    private _repository: CheckoutGateway,
    private _invoiceFacade: InvoiceFacadeInterface,
    private _paymentFacade: PaymentFacadeInterface,
  ) {}

  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {

    // TODO Buscar client
    const client = await this._clientFacade.find({ id: input.clientId });
    if (!client)
      throw new Error("Client not found");

    // TODO Validar produtos
    await this.validateProducts(input);

    // TODO Recuperar productos
    const products = await Promise.all(
      input.products.map(p => this.getProduct(p.productId))
    );

    // TODO Criar o objeto do Client
    const myClient = new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      document: client.email,
      street: client.document,
      city: client.city,
      state: client.state,
      number: client.number,
      complement: client.complement,
      zipCode: client.zipCode,
    });

    // TODO Criar o objecto da order (Client, Products)
    const order = new Order({
      client: myClient,
      products: products,
    });

    // TODO Processar pagamento
    const payment = await this._paymentFacade.process({
      orderId: order.id.value,
      amount: order.total,
    });

    // TODO Gerar invoice
    const invoice = payment.status !== "approved" ? null : await this._invoiceFacade.generate({
      name: client.name,
      document: client.document,
      street: client.street,
      city: client.city,
      state: client.state,
      number: client.number,
      complement: client.complement,
      zipCode: client.zipCode,
      items: products.map(item => ({
        id: item.id.value,
        name: item.name,
        price: item.salesPrice,
      })),
    });

    // TODO Atualizar status
    payment.status === "approved" && order.approved();

    // TODO Persistir order
    this._repository.addOrder(order);

    // TODO Retornar resultado
    return {
      id: order.id.value,
      invoiceId: (payment.status === "approved" && invoice != null) ? invoice?.id : null,
      status: order.status,
      total: order.total,
      products: order.products.map(item => ({
        productId: item.id.value
      })),
    };
  }
  
  private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
    if (input.products.length == 0)
      throw new Error("No products selected");

    for(const p of input.products) {
      const product = await this._productFacade.checkStock({
        productId: p.productId,
      });

      if(product.stock <= 0)
        throw new Error(`Product ${product.productId} is not available in stock`);
    };
  }

  private async getProduct(productId: string): Promise<Product> {
    const product = await this._catalogFacade.find({ id: productId });
    if(!product)
      throw new Error("Product not found");

    return new Product({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    });
  }

}