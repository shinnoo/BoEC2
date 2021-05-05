export interface IState {
  id?: number;
  name?: string | null;
  taxRate?: number | null;
}

export class State implements IState {
  constructor(public id?: number, public name?: string | null, public taxRate?: number | null) {}
}
