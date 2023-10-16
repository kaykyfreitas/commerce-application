import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeOutputDto, GenerateInvoieFacadeInputDto } from "./facade.interface";

export interface UseCaseProps {
  findUseCase: UseCaseInterface;
  generateUseCase: UseCaseInterface;
}
export default class InvoiceFacade implements InvoiceFacadeInterface {

  private _generateUseCase: UseCaseInterface;
  private _findUseCase: UseCaseInterface;

  constructor(props: UseCaseProps) {
    this._findUseCase = props.findUseCase;
    this._generateUseCase = props.generateUseCase;
  }

  generate(input: GenerateInvoieFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
    return this._generateUseCase.execute(input);
  }

  find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
    return this._findUseCase.execute(input);
  }
  
}