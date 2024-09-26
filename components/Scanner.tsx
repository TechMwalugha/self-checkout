"use client"

import { BarcodeScanner } from "react-barcode-scanner"
import "react-barcode-scanner/polyfill" 


const Scanner = () => {
  return (
    <div>
      <BarcodeScanner />
    </div>
  )
}

export default Scanner
