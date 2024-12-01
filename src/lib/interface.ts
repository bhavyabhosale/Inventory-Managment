export type InventoryProps = {
  title: string;
  description: string;
  action: any;
  btnTitle: string;
  data?: any;
  add?: string;
  selectedId?: any;
};

export type deleteBtnProps = {
  title: string;
  handleDelete: any;
};

export type InventoryDataProps = {
  id: string;
  name: string;
  description: string;
  cost: number;
  billImageUrl: string;
  lifeSpan: number;
  createdAt: Date;
  updatedAt: Date | null;
};
