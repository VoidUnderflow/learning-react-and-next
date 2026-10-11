export interface ImportType {
  id: string;
  name: string;
}

export const importTypes: ImportType[] = [
  {
    id: "customerList",
    name: "List of customers",
  },
  {
    id: "productList",
    name: "List of products",
  },
  {
    id: "orders",
    name: "List of orders",
  },
];
