import { ICustomer } from '@/shared/model/customer.model';

export interface IShipment {
  id?: number;
  address?: string | null;
  street?: string | null;
  city?: string | null;
  zipCode?: string | null;
  customer?: ICustomer | null;
}

export class Shipment implements IShipment {
  constructor(
    public id?: number,
    public address?: string | null,
    public street?: string | null,
    public city?: string | null,
    public zipCode?: string | null,
    public customer?: ICustomer | null
  ) {}
}
