export interface IProduct {
  id?: number;
  name?: string | null;
  price?: number | null;
  cartId?: number | null;
}

export class Product implements IProduct {
  constructor(public id?: number, public name?: string | null, public price?: number | null, public cartId?: number | null) {}
}
