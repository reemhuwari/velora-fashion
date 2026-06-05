import { Review } from "./review.model";

export interface Product {

  id: number;
titleKey: string;
  categoryKey: string;

  image: string;

  price: number;

  oldPrice?: number;

  rating: number;

  isNew?: boolean;

  isFavorite?: boolean;
 description: string;
 reviews?: Review[];
}