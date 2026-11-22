export interface Product {
  id: number;
  name: string;
  price: number;
}

export const products: Product[] = [
  { id: 1, name: "키보드", price: 45000 },
  { id: 2, name: "마우스", price: 25000 },
  { id: 3, name: "모니터", price: 250000 },
];
