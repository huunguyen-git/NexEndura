export interface InventoryItem {
  id: string;
  productId: string;
  sku: string;
  size: string;
  color: string;
  colorHex: string;
  stockCount: number;
  reservedCount: number;
}

export const inventory: InventoryItem[] = [
  { id: 'v1', productId: 'p1', sku: 'NKE-PH-FG-001', size: 'US 9', color: 'Black', colorHex: '#000000', stockCount: 24, reservedCount: 2 },
  { id: 'v2', productId: 'p1', sku: 'NKE-PH-FG-002', size: 'US 10', color: 'Red', colorHex: '#ff0000', stockCount: 15, reservedCount: 0 },
  { id: 'v3', productId: 'p2', sku: 'DPD-BB-001', size: 'Standard', color: 'Orange', colorHex: '#c15b19', stockCount: 50, reservedCount: 5 },
  { id: 'v4', productId: 'p3', sku: 'PAG-RUN-001', size: 'US 8', color: 'Black', colorHex: '#000000', stockCount: 8, reservedCount: 1 },
  { id: 'v5', productId: 'p3', sku: 'PAG-RUN-002', size: 'US 9', color: 'Red', colorHex: '#ff0000', stockCount: 2, reservedCount: 0 }, // Low stock
  { id: 'v6', productId: 'p4', sku: 'WIL-TEN-001', size: 'Grip 3', color: 'Gold', colorHex: '#ffd700', stockCount: 12, reservedCount: 0 },
  { id: 'v7', productId: 'p5', sku: 'ALY-GYM-001', size: 'M', color: 'Blue', colorHex: '#0000ff', stockCount: 0, reservedCount: 0 }, // Out of stock
];
