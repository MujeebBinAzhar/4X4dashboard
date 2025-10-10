import React from 'react';
import { FiPrinter } from 'react-icons/fi';
import { useBarcodeModal } from '../../hooks/useBarcodeModal';

/**
 * Reusable Barcode Button Component
 * Can be used anywhere in the app for barcode generation
 */
const BarcodeButton = ({
    skuValue,
    title = "Generate Barcode",
    buttonText = "Generate Barcode",
    className = "px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm flex items-center gap-1",
    disabled = false
}) => {
    const { openBarcodeModal, barcodeModal, barcodeCanvasRef, closeBarcodeModal, printBarcode } = useBarcodeModal();

    const handleClick = () => {
        if (!skuValue || skuValue.trim() === '') {
            alert('Please enter a SKU value first');
            return;
        }
        openBarcodeModal(title, skuValue.trim());
    };

    return (
        <>
            <button
                onClick={handleClick}
                disabled={disabled}
                className={className}
            >
                <FiPrinter className="w-4 h-4" />
                {buttonText}
            </button>

            {/* Barcode Modal */}
            {barcodeModal.isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">{barcodeModal.title}</h3>
                            <button
                                onClick={closeBarcodeModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-white">
                            <div className="text-center">
                                <div className="mb-4 text-sm text-gray-600">
                                    Barcode Preview (Code 128)
                                </div>
                                <div className="bg-white p-4 rounded border inline-block">
                                    <canvas
                                        ref={barcodeCanvasRef}
                                        width="400"
                                        height="150"
                                        className="border border-gray-300"
                                        style={{
                                            background: 'white',
                                            display: 'block',
                                            margin: '0 auto'
                                        }}
                                    />
                                </div>
                                <div className="mt-2 text-xs text-gray-500">
                                    SKU: {barcodeModal.skuValue}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={closeBarcodeModal}
                                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={printBarcode}
                                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center gap-2"
                            >
                                <FiPrinter className="w-4 h-4" />
                                Print Barcode
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BarcodeButton;
