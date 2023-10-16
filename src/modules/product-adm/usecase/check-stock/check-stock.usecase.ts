import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";
import { CheckStockInputDto, CheckStockOutputDto } from "./check-stock.dto";

export default class CheckStockUseCase implements UseCaseInterface {

  private _productRepository:  ProductGateway;

  constructor(productRepository: ProductGateway) {
    this._productRepository = productRepository;
  }

  async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto> {
    const props = {
      productId: input.productId
    }

    const product = await this._productRepository.find(props.productId);

    if (!product) {
      throw new Error(`Product with id ${props.productId} not found!`)
    }

    return {
      productId: props.productId,
      stock: product.stock
    }
  }
    
}
