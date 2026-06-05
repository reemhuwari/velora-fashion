import { CartItem }
from './cart-item.model';

export interface Order {

  id: number;

  customer: string;

  email: string;

  phone: string;

  city: string;

  address: string;

  items: any[];

  total: number;

  status: string;

  date: string;

}