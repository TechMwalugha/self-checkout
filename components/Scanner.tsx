'use client'

import { retrieveItem } from '@/lib/actions/item.action';
import { Html5Qrcode } from 'html5-qrcode'
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

const Scanner = ({ 
  currentCartItems, setCurrentCartItems
}: {
  currentCartItems: { name: string; description: string; price: number; image: string; quantity: string }[];
  setCurrentCartItems: React.Dispatch<React.SetStateAction<{ name: string; description: string; price: number; image: string; quantity: string }[]>>
}) => {
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
      const config = { fps: 10, qrbox: { width: 200, height: 200 },  };
      html5QrCode.start(
        { facingMode: "environment" }, // Use back camera
        config,
       async (decodedText: string) => {
          setScanResult('Code detected. Please wait..');
          stopScanner(); // Stop the scanner after successful scan
          const result = await addScannedItemToCart({
            decodedText,
            currentCartItems,
            setCurrentCartItems
          })
          setScanResult(result.message as string)

        },
        (errorMessage: string) => {
          console.warn('QR code scan error:', errorMessage);
          setScanResult('No code detected.')
        }
      ).then(() => {
        setIsScanning(true);
      }).catch(err => {
        console.error('Error starting scanner:', err);
      });
    }
  };

  const stopScanner = () => {
    setScanResult('')
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
      <div id="reader" className="w-[250px] h-[250px] mb-2"></div>

      {scanResult ? <p className='text-subtle-medium my-3 text-red-600'>{scanResult}</p> : null}
      <div className="flex gap-4">
        <Button
          className={`bg-green-500 text-white p-2 rounded`}
          onClick={startScanner}
          disabled={isScanning}
        >
          Start Scanner
        </Button>
        <Button
          className="bg-red-500 text-white p-2 rounded"
          onClick={stopScanner}
          disabled={!isScanning}
        >
          Stop Scanner
        </Button>
      </div>
    </div>
  );
};

async function addScannedItemToCart({ decodedText, currentCartItems, setCurrentCartItems } : {
  decodedText: string;
  currentCartItems: { name: string; description: string; price: number; image: string; quantity: string }[];
  setCurrentCartItems: React.Dispatch<React.SetStateAction<{ name: string; description: string; price: number; image: string; quantity: string }[]>>
}) {

  const result = await retrieveItem({ itemId: decodedText })

  if(!result.success) {
    return {
        success: false,
        message: result.message,
    }
  }
  // Check if the item already exists in the current cart items
  const itemExists = currentCartItems.some(item => 
    item.name === result?.item?.name // or any unique identifier
  )

  if(itemExists) {

    return {
      success: false,
      message: 'Item already in cart'
    }
  } 

  setCurrentCartItems((currentItems: any) => {
    return [
      ...currentItems,
      {
        name: result?.item?.name,
        description: result?.item?.description,
        price: result?.item?.price,
        image: result?.item?.image,
        quantity: result?.item?.quantity
      }
    ]
  })

  return {
    success: true,
    message: `${result?.item?.name} added to cart`
  }

}

export default Scanner;
