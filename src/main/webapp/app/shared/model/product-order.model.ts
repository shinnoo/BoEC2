import { IOrders } from '@/shared/model/orders.model';
import { IProduct } from '@/shared/model/product.model';

export interface IProductOrder {
  id?: number;
  quantity?: number | null;
  order?: IOrders | null;
  product?: IProduct | null;
}

export class ProductOrder implements IProductOrder {
  constructor(public id?: number, public quantity?: number | null, public order?: IOrders | null, public product?: IProduct | null) {}
}
