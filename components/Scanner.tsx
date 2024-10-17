'use client'

import { Html5Qrcode } from 'html5-qrcode'
import { useEffect, useState } from 'react';

const Scanner = () => {
  const [html5QrCode, setHtml5QrCode] = useState<Html5Qrcode | null>(null);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    // Initialize the scanner once on component mount
    if (!html5QrCode) {
      const qrScanner = new Html5Qrcode('reader');
      setHtml5QrCode(qrScanner);
    }
    
    // Cleanup on component unmount
    return () => {
      if (html5QrCode) {
        try {
          html5QrCode.clear();
        } catch (err) {
          console.error('Failed to clear scanner:', err);
        }
      }
    };
  }, []);

  const startScanner = () => {
    setScanResult(null)
    if (html5QrCode) {
      const config = { fps: 10, qrbox: { width: 250, height: 250 }, aspectRatio: 1.777778 };
      html5QrCode.start(
        { facingMode: "environment" }, // Use back camera
        config,
        (decodedText: string) => {
          setScanResult(decodedText);
          stopScanner(); // Stop the scanner after successful scan
        },
        (errorMessage: string) => {
          console.warn('QR code scan error:', errorMessage);
        }
      ).then(() => {
        setIsScanning(true);
      }).catch(err => {
        console.error('Error starting scanner:', err);
      });
    }
  };

  const stopScanner = () => {
    if (html5QrCode) {
      html5QrCode.stop().then(() => {
        console.log('Scanner stopped');
        setIsScanning(false);
      }).catch(err => {
        console.error('Error stopping scanner:', err);
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div id="reader" className="w-[200px] h-[150px] mb-4"></div>
      {scanResult ? <p>Scanned Result: {scanResult}</p> : null}
      <div className="flex gap-4">
        <button
          className="bg-green-500 text-white p-2 rounded"
          onClick={startScanner}
          disabled={isScanning}
        >
          Start Scanner
        </button>
        <button
          className="bg-red-500 text-white p-2 rounded"
          onClick={stopScanner}
          disabled={!isScanning}
        >
          Stop Scanner
        </button>
      </div>
    </div>
  );
};

export default Scanner;
