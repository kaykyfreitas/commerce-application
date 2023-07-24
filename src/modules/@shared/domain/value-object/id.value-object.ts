import { v4 as uuidV4 } from "uuid";

import ValueObject from "./value-object.interface";

export default class Id implements ValueObject {
    
  private _value: string;

  constructor(id?: string) {
    this._value = id || uuidV4();
  }

  get value(): string {
    return this._value;
  }

}