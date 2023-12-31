import UseCaseInterface from "../../../@shared/usecase/use-case.interface"
import ClientGateway from "../../gateway/client.gateway"
import { FindClientInputDto, FindClientOutputDto } from "./find-client.usecase.dto"


export default class FindClientUseCase implements UseCaseInterface {

  constructor(private clientRepository: ClientGateway) {}

  async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
    const client = await this.clientRepository.find(input.id);

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