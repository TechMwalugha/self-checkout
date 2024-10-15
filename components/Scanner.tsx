'use client'
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { useEffect, useState } from "react";

export default function Scanner() {
  const [scanResult, setScanResult] = useState<string | null>(null);

  useEffect(() => {
    const qrCodeScanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 5,
        qrbox: { width: 250, height: 250 },
        supportedScanTypes: [
          Html5QrcodeScanType.SCAN_TYPE_CAMERA,
          Html5QrcodeScanType.SCAN_TYPE_FILE],
      },
      false
    );

    const onScanSuccess = (decodedText: string, decodedResult: any) => {
      console.log(`Code matched = ${decodedText}`, decodedResult);
      setScanResult(decodedText);
      qrCodeScanner.clear(); // Stop scanning after success
    };

    const onScanFailure = (error: any) => {
      console.warn(`QR code scan error = ${error}`);
    };

    // Start the scanner
    qrCodeScanner.render(onScanSuccess, onScanFailure);

    // Cleanup function to prevent duplicate instances
    return () => {
      qrCodeScanner.clear().catch((error: any) => {
        console.error('Failed to clear scanner: ', error);
      });
    };
  }, []);

  return (
    <div className="flex items-center justify-center">
      {scanResult ? (
        <div>
          <h1>Scan Result</h1>
          <p>{scanResult}</p>
        </div>
      ) : (
        <>
        <div id="reader" className="w-[200px] h-[200px]"></div>
        </>
      )}
    </div>
  );
}
