export interface CamScannerHookProps {
  typeScanner?: 'qrcode' | 'barcode' | 'both';
  zoom?: number;
  hasMany?: boolean;
  onBarcodeReader: (data: string) => Promise<void>;
}
export interface CamScannerProps {
  typeScanner?: 'qrcode' | 'barcode' | 'both';
  zoom?: number;
  onBarcodeReader: (data: string) => Promise<void>;
  hasMany?: boolean;
  testID?: string;
  list?: React.ReactNode;
}
