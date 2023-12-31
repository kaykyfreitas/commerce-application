import { FindClientOutputDto } from "../usecase/find-client/find-client.usecase.dto";

export interface AddClientFacadeInputDto {
  id?: string;
  name: string;
  email: string;
  document: string;
  street: string;
  city: string;
  state: string;
  number: string;
  complement: string;
  zipCode: string
}

export interface FindClientFacadeInputDto {
  id: string;
}

export interface FindClientFacadeOutputDto {
  id: string;
  name: string;
  email: string;
  document: string;
  street: string;
  city: string;
  state: string;
  number: string;
  complement: string;
  zipCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export default interface ClientAdmFacadeInterface {
  add(input: AddClientFacadeInputDto): Promise<void>;
  find(input: FindClientFacadeInputDto): Promise<FindClientOutputDto>;
}
