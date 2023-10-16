import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceItemModel from "./invoice-item.model";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
  
  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({ where: { id: id }, include: [InvoiceItemModel] })

    if (!invoice)
      throw new Error("invoice not found")

    return new Invoice({
      id: new Id(invoice.id),
      name: invoice.name,
      document: invoice.document,
      address: {
        street: invoice.street,
        number: invoice.number,
        complement: invoice.complement,
        city: invoice.city,
        state: invoice.state,
        zipCode: invoice.zipCode,
      },
      items: invoice.invoiceItems.map(item => ({
        id: new Id(item.id),
        name: item.name,
        price: item.price
      })),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    });
  }

  async save(input: Invoice): Promise<Invoice> {
    await InvoiceModel.create({
      id: input.id.value,
      name: input.name,
      document: input.document,
      street: input.address.street,
      number: input.address.number,
      complement: input.address.complement,
      city: input.address.city,
      state: input.address.state,
      zipCode: input.address.zip,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
      invoiceItems: input.items.map(item => ({
        id: item.id.value,
        name: item.name,
        price: item.price,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        invoiceId: input.id,
      }))
    },    
    {
      include: [{ model: InvoiceItemModel }]
    });

    return new Invoice({
      id: input.id,
      name: input.name,
      document: input.document,
      address: {
        street: input.address.street,
        number: input.address.number,
        complement: input.address.complement,
        city: input.address.city,
        state: input.address.state,
        zipCode: input.address.zip,
      },
      items: input.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price
      })),
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    });
  }
  
}