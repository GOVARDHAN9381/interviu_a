import React, { useState, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { Scan } from 'lucide-react';

export const QRScanner = ({ onScan, onClose }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);

  useEffect(() => {
    startScanning();
    return () => {
      stopScanning();
    };
  }, []);

  const startScanning = async () => {
    setError(null);
    setIsScanning(true);

    try {
      codeReaderRef.current = new BrowserMultiFormatReader();
      const result = await codeReaderRef.current.decodeOnceFromVideoDevice(undefined, videoRef.current);

      if (result?.getText()) {
        onScan(result.getText());
      }
    } catch (err) {
      setError(err?.message || 'Failed to access the camera or scan the QR code.');
      console.error('Scanner error:', err);
    } finally {
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
    }
    setIsScanning(false);
  };

  const handleClose = () => {
    stopScanning();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center">
      <div className="w-full h-3/4 relative overflow-hidden rounded-lg border-4 border-green-400">
        <video ref={videoRef} className="w-full h-full object-cover" />

        <div className="absolute inset-0 border-2 border-green-400 m-auto w-64 h-64" />
        <div className="absolute top-10 left-10 w-8 h-8 border-l-4 border-t-4 border-green-400" />
        <div className="absolute top-10 right-10 w-8 h-8 border-r-4 border-t-4 border-green-400" />
        <div className="absolute bottom-10 left-10 w-8 h-8 border-l-4 border-b-4 border-green-400" />
        <div className="absolute bottom-10 right-10 w-8 h-8 border-r-4 border-b-4 border-green-400" />
      </div>

      <div className="w-full h-1/4 bg-black flex flex-col items-center justify-center gap-4 p-4">
        {isScanning && (
          <>
            <div className="flex items-center gap-2">
              <Scan className="w-6 h-6 text-green-400 animate-spin" />
              <span className="text-green-400 font-semibold">Scanning QR Code...</span>
            </div>
            <p className="text-gray-400 text-sm">Point your camera at the QR code.</p>
          </>
        )}

        {error && (
          <div className="text-red-400 text-center">
            <p className="font-semibold">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        <button
          onClick={handleClose}
          className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
        >
          Close Scanner
        </button>
      </div>
    </div>
  );
};

export default QRScanner;
