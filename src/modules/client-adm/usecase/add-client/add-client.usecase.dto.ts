export interface AddClientInputDto {
  id?: string;
  name: string;
  email: string;
  document: string;
  street: string;
  city: string;
  state: string;
  number: string;
  complement: string;
  zipCode: string;
}

export interface AddClientOutputDto {
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
