export interface IPayment {
  id?: number;
  description?: string | null;
}

export class Payment implements IPayment {
  constructor(public id?: number, public description?: string | null) {}
}
