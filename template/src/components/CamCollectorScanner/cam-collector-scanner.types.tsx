import React from 'react';

export interface CamCollectorScannerProps {
  typeScanner?: 'qrcode' | 'barcode' | 'both';
  zoom?: number;
  infoChildren?: React.ReactNode;
  onBarcodeReader: (data: string) => Promise<void>;
  hasMany?: boolean;
}
