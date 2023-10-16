import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Invoice from "../../domain/invoice";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.usecase.dto";

export default class GenerateInvoiceUseCase implements UseCaseInterface {

  constructor(private invoiceRepository: InvoiceGateway) {}

  async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {

    const address = {
      street: input.street,
      number: input.number,
      complement: input.complement,
      city: input.city,
      state: input.state,
      zipCode: input.zipCode
    }

    const invoiceItems = input.items.map(item => ({
      id: new Id(item.id),
      name: item.name,
      price: item.price
    }))

    const invoice = new Invoice({
      id: new Id(),
      name: input.name,
      document: input.document,
      address: address,
      items: invoiceItems,
    })

    const savedInvoice = await this.invoiceRepository.save(invoice);

    return {
      id: savedInvoice.id.value,
      name: savedInvoice.name,
      document: savedInvoice.document,
      street: savedInvoice.address.street,
      number: savedInvoice.address.number,
      complement: savedInvoice.address.complement,
      city: savedInvoice.address.city,
      state: savedInvoice.address.state,
      zipCode: savedInvoice.address.zip,
      items : savedInvoice.items.map(item => ({
        id: item.id.value,
        name: item.name,
        price: item.price
      })),
      total: savedInvoice.items.reduce((acc, item) => acc + item.price, 0)
    }
  }
  
}