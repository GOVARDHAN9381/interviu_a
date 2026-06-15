import React, { useState } from 'react';
import QRScanner from '../components/QRScanner';

export const ScannerExample = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [history, setHistory] = useState([]);

  const handleScan = (data) => {
    setScannedData(data);
    setHistory([...history, { data, timestamp: new Date().toLocaleTimeString() }]);
    setShowScanner(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">QR Code Scanner</h1>

        {/* Scanner Button */}
        <button
          onClick={() => setShowScanner(true)}
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors mb-6"
        >
          Start Scanning
        </button>

        {/* Last Scanned Data */}
        {scannedData && (
          <div className="bg-slate-700 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-2">Last Scan</h2>
            <p className="text-gray-300 break-all font-mono bg-slate-800 p-3 rounded">
              {scannedData}
            </p>
          </div>
        )}

        {/* Scan History */}
        <div className="bg-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Scan History</h2>
          {history.length === 0 ? (
            <p className="text-gray-400">No scans yet</p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {history.map((item, idx) => (
                <div key={idx} className="bg-slate-800 rounded p-3">
                  <p className="text-gray-400 text-sm">{item.timestamp}</p>
                  <p className="text-white break-all font-mono text-sm">{item.data}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scanner Modal */}
      {showScanner && (
        <QRScanner
          onScan={handleScan}
          onClose={() => setShowScanner(false)}
        />
      )}
    </div>
  );
};

export default ScannerExample;
