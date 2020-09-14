export interface ProductsOfOrders {
  _id?: string,
  amount?: number,
  category?: string,
  description?: string,
  discount?: number,
  image?: string,
  name?: string,
  price?: number,
  priceAfterDiscount: number,
  productId?: string
}
