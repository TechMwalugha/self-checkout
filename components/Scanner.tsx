'use client'

import React, { useState, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

export default function BarcodeScanner() {
  const [barcode, setBarcode] = useState('');
  const [scanning, setScanning] = useState(false);
  const [cameraId, setCameraId] = useState('');
  const [cameraList, setCameraList] = useState([]);
  const videoRef = useRef(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    scannerRef.current = codeReader;

    navigator.mediaDevices.enumerateDevices().then(devices => {
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setCameraList(videoDevices);
      if (videoDevices.length > 0) {
        setCameraId(videoDevices[0].deviceId);
      }
    });

    return () => {
      if (scannerRef.current) {
        scannerRef.current.reset();
        scannerRef.current.stopContinuousDecode();
      }
    };
  }, []);

  const startScan = () => {
    setScanning(true);
    setBarcode('');

    if (scannerRef.current && videoRef.current && cameraId) {
      scannerRef.current.decodeFromVideoDevice(cameraId, videoRef.current, (result, err) => {
        if (result) {
          setBarcode(result.getText());
          setScanning(false);
        } else if (err && !(err instanceof NotFoundException)) {
          console.error(err);
        }
      });
    }
  };

  const stopScan = () => {
    setScanning(false);
    if (scannerRef.current) {
      scannerRef.current.reset();
    }
  };

  return (
    <div>
      <div style={{ height: '400px', width: '400px' }}>
        <h1>Barcode Scanner</h1>
        <video ref={videoRef} style={{ width: '100%' }} />
        <div className="form-group row">
          <label htmlFor="cameraSelect">Select Camera:</label>
          <select
            id="cameraSelect"
            value={cameraId}
            onChange={e => setCameraId(e.target.value)}
            disabled={scanning}
          >
            {cameraList.map(camera => (
              <option key={camera.deviceId} value={camera.deviceId}>
                {camera.label || `Camera ${camera.deviceId}`}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group row">
          <button onClick={startScan} disabled={scanning || !cameraId}>
            {scanning ? 'Scanning...' : 'Start Scan'}
          </button>
          <button onClick={stopScan} disabled={!scanning}>
            Stop Scan
          </button>
        </div>
        <div className="form-group row">
          {barcode ? (
            <p>Scanned Barcode: {barcode}</p>
          ) : scanning ? (
            <p>Scanning for barcode...</p>
          ) : (
            <p>No barcode scanned yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}