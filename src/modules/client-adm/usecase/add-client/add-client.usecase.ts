import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import { AddClientInputDto, AddClientOutputDto } from "./add-client.usecase.dto";

export default class AddClientUseCase implements UseCaseInterface {

  constructor(private clientRepository: ClientGateway) {}

  async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
    const props = {
      id: new Id(input.id),
      name: input.name,
      email: input.email,
      document: input.document,
      street: input.street,
      city: input.city,
      state: input.state,
      number: input.number,
      complement: input.complement,
      zipCode: input.zipCode,
    }

    const client = new Client(props)

    this.clientRepository.add(client)

    return {
      id: client.id.value,
      name: client.name,
      email: client.email,
      document: client.document,
      street: client.street,
      city: client.city,
      state: client.state,
      number: client.number,
      complement: client.complement,
      zipCode: client.zipCode,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    }

  }
  
}