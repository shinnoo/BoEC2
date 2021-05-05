import { IPayment } from '@/shared/model/payment.model';
import { IState } from '@/shared/model/state.model';
import { IShipment } from '@/shared/model/shipment.model';
import { ICustomer } from '@/shared/model/customer.model';
import { IProductOrder } from '@/shared/model/product-order.model';

export interface IOrders {
  id?: number;
  date?: Date | null;
  payment?: IPayment | null;
  state?: IState | null;
  shipment?: IShipment | null;
  customer?: ICustomer | null;
  productOrders?: IProductOrder[] | null;
}

export class Orders implements IOrders {
  constructor(
    public id?: number,
    public date?: Date | null,
    public payment?: IPayment | null,
    public state?: IState | null,
    public shipment?: IShipment | null,
    public customer?: ICustomer | null,
    public productOrders?: IProductOrder[] | null
  ) {}
}
