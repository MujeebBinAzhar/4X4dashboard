import { useState, useRef, useEffect } from "react";
import BarcodeService from "../services/barcodeService";

/**
 * Custom hook for managing barcode modal functionality
 */
export const useBarcodeModal = () => {
  const [barcodeModal, setBarcodeModal] = useState({
    isOpen: false,
    title: "",
    skuValue: "",
  });

  const barcodeCanvasRef = useRef(null);

  // Generate barcode when modal opens
  useEffect(() => {
    if (barcodeModal.isOpen && barcodeModal.skuValue) {
      // Wait for modal to be fully rendered
      setTimeout(() => {
        const canvas = barcodeCanvasRef.current;
        if (!canvas) {
          console.error("Canvas not found");
          return;
        }

        // Validate the SKU value before generating barcode
        if (!BarcodeService.validateBarcodeValue(barcodeModal.skuValue)) {
          console.error("Invalid SKU value for barcode generation");
          return;
        }

        // Generate barcode using the service
        BarcodeService.generateBarcode(canvas, barcodeModal.skuValue);
      }, 200);
    }
  }, [barcodeModal.isOpen, barcodeModal.skuValue]);

  /**
   * Open barcode modal
   * @param {string} title - Modal title
   * @param {string} skuValue - SKU value to generate barcode for
   */
  const openBarcodeModal = (title, skuValue) => {
    if (!BarcodeService.validateBarcodeValue(skuValue)) {
      alert("Please enter a valid SKU value");
      return;
    }

    setBarcodeModal({
      isOpen: true,
      title,
      skuValue: skuValue.trim(),
    });
  };

  /**
   * Close barcode modal
   */
  const closeBarcodeModal = () => {
    setBarcodeModal({
      isOpen: false,
      title: "",
      skuValue: "",
    });
  };

  /**
   * Print barcode using the service
   */
  const printBarcode = () => {
    if (!barcodeModal.skuValue) {
      alert("No SKU value to print");
      return;
    }

    BarcodeService.printBarcode(barcodeModal.skuValue, barcodeModal.title);

    closeBarcodeModal();
  };

  return {
    barcodeModal,
    barcodeCanvasRef,
    openBarcodeModal,
    closeBarcodeModal,
    printBarcode,
  };
};

export default useBarcodeModal;
