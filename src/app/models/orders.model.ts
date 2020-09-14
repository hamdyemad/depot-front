import { Carts } from './carts.model';
export interface Orders {
  _id?: string,
  orders?: Array<Carts>,
  userId?: string,
  clientName?: string,
  address?: string,
  mobile?: string,
  city?: string
  status?: string,
  dateAdded?: Date,
  comment?: string,
  orderHistory?: Array<Object>,
  notifiedCustomer: Boolean,
  seq?: number
}
