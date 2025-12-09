import React from "react";
import Drawer from "rc-drawer";
import { FiX, FiFilter } from "react-icons/fi";
import { Button, Input, Select, Card, CardBody } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import SelectCategory from "@/components/form/selectOption/SelectCategory";
import SelectProductType from "@/components/form/selectOption/SelectProductType";
import SelectStockStatus from "@/components/form/selectOption/SelectStockStatus";
import SelectBrandFilter from "@/components/form/selectOption/SelectBrandFilter";
import SelectSEORank from "@/components/form/selectOption/SelectSEORank";

const FiltersDrawer = ({
    isOpen,
    onClose,
    onOpen,
    lang,
    searchRef,
    handleSubmitForAll,
    category,
    setCategory,
    productType,
    setProductType,
    stockStatus,
    setStockStatus,
    selectedBrand,
    setSelectedBrand,
    seoRank,
    setSEORank,
    sortedField,
    setSortedField,
    handleResetField,
    setSortBy,
    setSortDir,
    t,
}) => {
    return (
        <>
            {/* Mobile Filter Toggle Button - Removed (using button in search bar instead) */}

            {/* Filters Drawer */}
            <Drawer
                open={isOpen}
                onClose={onClose}
                parent={null}
                level={null}
                placement="bottom"
                height="90%"
            >
                <div className="flex flex-col h-full bg-white dark:bg-gray-800">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {t("Filters")}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            <FiX className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Filters Content */}
                    <div className="flex-1 overflow-y-auto p-4">
                        <form onSubmit={handleSubmitForAll} className="space-y-4">
                            {/* Search */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    {t("Search")}
                                </label>
                                <Input
                                    ref={searchRef}
                                    type="search"
                                    name="search"
                                    placeholder="Search products (name, SKU, description)"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    {t("Category")}
                                </label>
                                <SelectCategory setCategory={setCategory} lang={lang} />
                            </div>

                            {/* Product Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    {t("Product Type")}
                                </label>
                                <SelectProductType
                                    setProductType={setProductType}
                                    selectedProductType={productType}
                                />
                            </div>

                            {/* Stock Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    {t("Stock Status")}
                                </label>
                                <SelectStockStatus
                                    setStockStatus={setStockStatus}
                                    selectedStockStatus={stockStatus}
                                />
                            </div>

                            {/* Brand */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    {t("Brand")}
                                </label>
                                <SelectBrandFilter
                                    setBrand={setSelectedBrand}
                                    selectedBrand={selectedBrand}
                                />
                            </div>

                            {/* SEO Rank */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    {t("SEO Rank")}
                                </label>
                                <SelectSEORank setSEORank={setSEORank} selectedSEORank={seoRank} />
                            </div>

                            {/* Sort */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    {t("Sort By")}
                                </label>
                                <Select 
                                    value={sortedField || "All"}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setSortedField(value);
                                        // Clear sortBy/sortDir when using price filter dropdown (low/high)
                                        if ((value === "low" || value === "high") && setSortBy && setSortDir) {
                                            setSortBy('date'); // Reset to default
                                            setSortDir('desc');
                                        }
                                    }}
                                >
                                    <option value="All" hidden>
                                        {t("Price")}
                                    </option>
                                    <option value="low">{t("LowtoHigh")}</option>
                                    <option value="high">{t("HightoLow")}</option>
                                    <option value="published">{t("Published")}</option>
                                    <option value="unPublished">{t("Unpublished")}</option>
                                    <option value="status-selling">{t("StatusSelling")}</option>
                                    <option value="status-out-of-stock">{t("StatusStock")}</option>
                                    <option value="date-added-asc">{t("DateAddedAsc")}</option>
                                    <option value="date-added-desc">{t("DateAddedDesc")}</option>
                                    <option value="date-updated-asc">{t("DateUpdatedAsc")}</option>
                                    <option value="date-updated-desc">{t("DateUpdatedDesc")}</option>
                                </Select>
                            </div>
                        </form>
                    </div>

                    {/* Footer Actions */}
                    <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
                        <div className="flex gap-3">
                            <Button
                                layout="outline"
                                onClick={handleResetField}
                                className="flex-1 h-12"
                            >
                                {t("Reset")}
                            </Button>
                            <Button
                                onClick={(e) => {
                                    handleSubmitForAll(e);
                                    onClose();
                                }}
                                className="flex-1 h-12 bg-emerald-700"
                            >
                                {t("Apply Filters")}
                            </Button>
                        </div>
                    </div>
                </div>
            </Drawer>
        </>
    );
};

export default FiltersDrawer;

