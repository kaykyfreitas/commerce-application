export interface FindClientInputDto {
  id: string;
}

export interface FindClientOutputDto {
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
