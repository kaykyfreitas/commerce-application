import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { FindClientOutputDto } from "../usecase/find-client/find-client.usecase.dto";
import ClientAdmFacadeInterface, { AddClientFacadeInputDto, FindClientFacadeInputDto } from "./client-adm.facade.interface";

export interface UseCaseProps {
  findUseCase: UseCaseInterface,
  addUseCase: UseCaseInterface,
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {

  private _findUseCase: UseCaseInterface;
  private _addUseCase: UseCaseInterface;

  constructor(props: UseCaseProps) {
    this._addUseCase = props.addUseCase;
    this._findUseCase = props.findUseCase;
  }

  async add(input: AddClientFacadeInputDto): Promise<void> {
    await this._addUseCase.execute(input);
  }

  async find(input: FindClientFacadeInputDto): Promise<FindClientOutputDto> {
    return await this._findUseCase.execute(input);
  }
  
}