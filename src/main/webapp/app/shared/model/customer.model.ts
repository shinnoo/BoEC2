import { IOrders } from '@/shared/model/orders.model';
import { IShipment } from '@/shared/model/shipment.model';

export interface ICustomer {
  id?: number;
  lastName?: string | null;
  firstName?: string | null;
  priorCustomer?: boolean | null;
  orders?: IOrders[] | null;
  shipments?: IShipment[] | null;
}

export class Customer implements ICustomer {
  constructor(
    public id?: number,
    public lastName?: string | null,
    public firstName?: string | null,
    public priorCustomer?: boolean | null,
    public orders?: IOrders[] | null,
    public shipments?: IShipment[] | null
  ) {
    this.priorCustomer = this.priorCustomer ?? false;
  }
}
