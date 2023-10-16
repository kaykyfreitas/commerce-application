import ValueObject from "../../../@shared/domain/value-object/value-object.interface";

type AddressProps = {
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
}

export default class Address implements ValueObject {
  private _street: string;
  private _complement: string;
  private _city: string;
  private _state: string;
  private _zip: string;
  private _number: string;

  constructor(props: AddressProps) {
    this._street = props.street;
    this._complement = props.complement;
    this._city = props.city;
    this._state = props.state;
    this._zip = props.zipCode;
    this._number = props.number;
  }

  get street(): string {
    return this._street;
  }

  get complement(): string {
    return this._complement;
  }

  get city(): string {
    return this._city;
  }

  get state(): string {
    return this._state;
  }

  get zip(): string {
    return this._zip;
  }

  get number(): string {
    return this._number;
  }

}
