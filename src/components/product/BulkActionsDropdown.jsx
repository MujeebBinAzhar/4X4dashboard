import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@windmill/react-ui";
import { FiChevronDown, FiTrash2, FiStar, FiPackage, FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import ProductServices from "@/services/ProductServices";
import { SidebarContext } from "@/context/SidebarContext";

const BulkActionsDropdown = ({ selectedIds, onRefresh, onOpenBatchEdit }) => {
  const { t } = useTranslation();
  const { setIsUpdate } = useContext(SidebarContext);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBulkAction = async (action, value = null) => {
    if (!selectedIds || selectedIds.length === 0) {
      toast.error(t("Please select at least one product"));
      return;
    }

    setLoading(true);
    setIsOpen(false);

    try {
      switch (action) {
        case "trash":
          // Use existing deleteManyProducts
          await ProductServices.deleteManyProducts({ ids: selectedIds });
          toast.success(t("Products moved to trash successfully"));
          break;

        case "featured":
          await ProductServices.bulkUpdateProducts({
            ids: selectedIds,
            isFeatured: true,
          });
          toast.success(t("Products marked as featured successfully"));
          break;

        case "unfeatured":
          await ProductServices.bulkUpdateProducts({
            ids: selectedIds,
            isFeatured: false,
          });
          toast.success(t("Products unfeatured successfully"));
          break;

        case "stock_in":
          await ProductServices.bulkUpdateProducts({
            ids: selectedIds,
            stock: 1, // Set to 1 for in stock
          });
          toast.success(t("Stock status updated to In Stock"));
          break;

        case "stock_out":
          await ProductServices.bulkUpdateProducts({
            ids: selectedIds,
            stock: 0, // Set to 0 for out of stock
          });
          toast.success(t("Stock status updated to Out of Stock"));
          break;

        case "stock_backorder":
          await ProductServices.bulkUpdateProducts({
            ids: selectedIds,
            stock: -1, // Set to -1 for backorder
          });
          toast.success(t("Stock status updated to On Backorder"));
          break;

        case "batch_edit":
          onOpenBatchEdit();
          setLoading(false);
          return;

        default:
          toast.error(t("Unknown action"));
          setLoading(false);
          return;
      }

      setIsUpdate(true);
      if (onRefresh) onRefresh();
    } catch (error) {
      toast.error(error.message || t("Failed to perform bulk action"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative inline-block">
      <Button
        disabled={!selectedIds || selectedIds.length === 0 || loading}
        onClick={() => setIsOpen(!isOpen)}
        className="relative min-h-[48px] touch-manipulation"
      >
        <span className="flex items-center gap-2">
          {t("Bulk Actions")}
          <FiChevronDown className="w-4 h-4" />
        </span>
      </Button>

      {isOpen && (
        <>
          {/* Overlay to close dropdown */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown menu */}
          <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border border-gray-200 dark:border-gray-700">
            <div className="py-1">
              {/* Batch Edit */}
              <button
                type="button"
                onClick={() => handleBulkAction("batch_edit")}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
              >
                <FiEdit className="w-4 h-4" />
                {t("Batch Edit")}
              </button>

              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

              {/* Mark as Featured */}
              <button
                type="button"
                onClick={() => handleBulkAction("featured")}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
              >
                <FiStar className="w-4 h-4" />
                {t("Mark as Featured")}
              </button>

              {/* Mark as Unfeatured */}
              <button
                type="button"
                onClick={() => handleBulkAction("unfeatured")}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
              >
                <FiStar className="w-4 h-4" />
                {t("Mark as Unfeatured")}
              </button>

              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

              {/* Change Stock Status */}
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                {t("Change Stock Status")}
              </div>
              <button
                type="button"
                onClick={() => handleBulkAction("stock_in")}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
              >
                <FiPackage className="w-4 h-4" />
                {t("Set to In Stock")}
              </button>
              <button
                type="button"
                onClick={() => handleBulkAction("stock_out")}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
              >
                <FiPackage className="w-4 h-4" />
                {t("Set to Out of Stock")}
              </button>
              <button
                type="button"
                onClick={() => handleBulkAction("stock_backorder")}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
              >
                <FiPackage className="w-4 h-4" />
                {t("Set to On Backorder")}
              </button>

              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

              {/* Move to Trash */}
              <button
                type="button"
                onClick={() => handleBulkAction("trash")}
                className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
              >
                <FiTrash2 className="w-4 h-4" />
                {t("Move to Trash")}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BulkActionsDropdown;

