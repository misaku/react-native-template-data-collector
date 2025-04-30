export interface CollectorScanerProps {
  typeScanner?: 'qrcode' | 'barcode' | 'both';
  onBarcodeReader: (data: string) => Promise<void>;
  hasMany?: boolean;
  list?: React.ReactNode;
}
export interface WrapperProps {
  hasMany: boolean;
}
