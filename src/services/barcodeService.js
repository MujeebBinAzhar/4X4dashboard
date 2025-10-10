import JsBarcode from "jsbarcode";

/**
 * Barcode Service for generating and printing barcodes
 */
export class BarcodeService {
  /**
   * Generate barcode on canvas
   * @param {HTMLCanvasElement} canvas - Canvas element to draw on
   * @param {string} value - Value to encode in barcode
   * @param {Object} options - Barcode generation options
   * @returns {boolean} - Success status
   */
  static generateBarcode(canvas, value, options = {}) {
    if (!canvas || !value) {
      console.error("Canvas or value is missing");
      return false;
    }

    const defaultOptions = {
      format: "CODE128",
      width: 2,
      height: 100,
      displayValue: true,
      fontSize: 14,
      margin: 10,
      background: "#ffffff",
      lineColor: "#000000",
    };

    const barcodeOptions = { ...defaultOptions, ...options };

    try {
      // Set canvas size if not already set
      if (!canvas.width || !canvas.height) {
        canvas.width = 400;
        canvas.height = 150;
      }

      // Clear the canvas
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = barcodeOptions.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Try different formats if primary format fails
      const formats = [barcodeOptions.format, "CODE39", "EAN13"];

      for (const format of formats) {
        try {
          JsBarcode(canvas, value, {
            ...barcodeOptions,
            format,
          });
          console.log(`Barcode generated successfully with ${format}`);
          return true;
        } catch (formatError) {
          console.log(`${format} failed, trying next format`);
          continue;
        }
      }

      // If all formats fail, draw error message
      this.drawErrorMessage(canvas, "Barcode generation failed");
      return false;
    } catch (error) {
      console.error("Barcode generation error:", error);
      this.drawErrorMessage(canvas, "Error generating barcode");
      return false;
    }
  }

  /**
   * Generate barcode for printing
   * @param {string} value - Value to encode
   * @param {Object} options - Barcode generation options
   * @returns {string} - Data URL of the barcode image
   */
  static generateBarcodeForPrint(value, options = {}) {
    const printCanvas = document.createElement("canvas");

    const printOptions = {
      format: "CODE128",
      width: 3,
      height: 120,
      displayValue: true,
      fontSize: 16,
      margin: 15,
      background: "#ffffff",
      lineColor: "#000000",
      ...options,
    };

    try {
      JsBarcode(printCanvas, value, printOptions);
      return printCanvas.toDataURL("image/png");
    } catch (error) {
      console.error("Print barcode generation error:", error);
      return null;
    }
  }

  /**
   * Open print window with barcode
   * @param {string} value - Value to encode
   * @param {string} title - Title for the print window
   * @param {Object} options - Barcode generation options
   */
  static printBarcode(value, title, options = {}) {
    const imgData = this.generateBarcodeForPrint(value, options);

    if (!imgData) {
      alert("Error generating barcode for printing");
      return;
    }

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Barcode - ${value}</title>
          <style>
            body { 
              margin: 0; 
              padding: 20px; 
              font-family: Arial, sans-serif; 
              text-align: center; 
              background: white; 
            }
            .barcode-container { 
              margin: 20px auto; 
              padding: 20px; 
              border: 1px solid #ddd; 
              background: white; 
              max-width: 400px; 
            }
            .barcode-image { 
              margin: 10px 0; 
              background: white; 
            }
            .barcode-info { 
              margin-top: 15px; 
              font-size: 14px; 
              color: #333; 
              font-weight: bold; 
            }
            .print-button, .close-button { 
              padding: 12px 24px; 
              background: #007bff; 
              color: white; 
              border: none; 
              border-radius: 4px; 
              cursor: pointer; 
              margin: 10px; 
              font-size: 16px; 
            }
            .close-button { 
              background: #6c757d; 
            }
            @media print { 
              body { margin: 0; padding: 0; } 
              .no-print { display: none; } 
              .barcode-container { border: none; margin: 0; padding: 10px; } 
            }
          </style>
        </head>
        <body>
          <div class="barcode-container">
            <div class="barcode-image">
              <img src="${imgData}" style="max-width: 100%; height: auto; background: white;" />
            </div>
            <div class="barcode-info">
              <strong>${title}</strong><br>
              SKU: ${value}
            </div>
          </div>
          <div class="no-print">
            <button class="print-button" onclick="window.print()">Print Barcode</button>
            <button class="close-button" onclick="window.close()">Close</button>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  }

  /**
   * Draw error message on canvas
   * @param {HTMLCanvasElement} canvas - Canvas element
   * @param {string} message - Error message
   */
  static drawErrorMessage(canvas, message) {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ff0000";
    ctx.font = "14px Arial";
    ctx.fillText(message, 10, 50);
    ctx.fillStyle = "#000000";
    ctx.fillText("Check console for details", 10, 70);
  }

  /**
   * Validate barcode value
   * @param {string} value - Value to validate
   * @returns {boolean} - Validation result
   */
  static validateBarcodeValue(value) {
    if (!value || typeof value !== "string") {
      return false;
    }

    // Remove whitespace
    const cleanValue = value.trim();

    // Check if value is not empty and has reasonable length
    return cleanValue.length > 0 && cleanValue.length <= 50;
  }
}

export default BarcodeService;
