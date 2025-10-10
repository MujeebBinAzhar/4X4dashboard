import ReactTagInput from "@pathofdev/react-tag-input";
import {
  Button,
  Input,
  TableCell,
  TableContainer,
  TableHeader,
  Textarea,
  Table,
} from "@windmill/react-ui";
import Multiselect from "multiselect-react-dropdown";
import React, { useState, useEffect, useRef } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { MultiSelect } from "react-multi-select-component";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiX, FiPrinter } from "react-icons/fi";
import { useBarcodeModal } from "../../hooks/useBarcodeModal";
import { Select } from "@windmill/react-ui";
//internal import

import Title from "@/components/form/others/Title";
import Error from "@/components/form/others/Error";
import InputArea from "@/components/form/input/InputArea";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import LabelArea from "@/components/form/selectOption/LabelArea";
import DrawerButton from "@/components/form/button/DrawerButton";
import InputValue from "@/components/form/input/InputValue";
import useProductSubmit from "@/hooks/useProductSubmit";
import ActiveButton from "@/components/form/button/ActiveButton";
import InputValueFive from "@/components/form/input/InputValueFive";
import Uploader from "@/components/image-uploader/Uploader";
import ParentCategory from "@/components/category/ParentCategory";
import UploaderThree from "@/components/image-uploader/UploaderThree";
import AttributeOptionTwo from "@/components/attribute/AttributeOptionTwo";
import AttributeListTable from "@/components/attribute/AttributeListTable";
import SwitchToggleForCombination from "@/components/form/switch/SwitchToggleForCombination";

//internal import

const ProductDrawer = ({ id }) => {
  const { t } = useTranslation();

  // State for profit margin calculations
  const [profitMargin, setProfitMargin] = useState({
    dollarDifference: 0,
    percentageDifference: 0
  });

  // State for quick discount
  const [quickDiscount, setQuickDiscount] = useState({
    dollarAmount: 0,
    percentageAmount: 0,
    isActive: false
  });

  // Use the barcode modal hook
  const {
    barcodeModal,
    barcodeCanvasRef,
    openBarcodeModal,
    closeBarcodeModal,
    printBarcode,
  } = useBarcodeModal();

  // Function to calculate profit margin
  const calculateProfitMargin = (productPrice, tradePrice) => {
    const price = parseFloat(productPrice) || 0;
    const trade = parseFloat(tradePrice) || 0;

    const dollarDifference = price - trade;
    const percentageDifference = trade > 0 ? ((price - trade) / trade) * 100 : 0;

    setProfitMargin({
      dollarDifference,
      percentageDifference
    });
  };

  // Handle original price change
  const handleOriginalPriceChange = (value) => {
    const tradePrice = watch('tradePrice') || 0;
    calculateProfitMargin(value, tradePrice);
  };

  // Handle trade price change
  const handleTradePriceChange = (value) => {
    const originalPrice = watch('originalPrice') || 0;
    calculateProfitMargin(originalPrice, value);
  };

  // Handle quick dollar discount
  const handleQuickDollarDiscount = (value) => {
    const originalPrice = parseFloat(watch('originalPrice')) || 0;
    const discountAmount = parseFloat(value) || 0;

    setQuickDiscount(prev => ({
      ...prev,
      dollarAmount: discountAmount,
      percentageAmount: 0, // Clear percentage when dollar is used
      isActive: discountAmount > 0
    }));

    // Apply discount to product price
    const discountedPrice = originalPrice - discountAmount;
    setValue('originalPrice', discountedPrice);
    handleOriginalPriceChange(discountedPrice);
  };

  // Handle quick percentage discount
  const handleQuickPercentageDiscount = (value) => {
    const originalPrice = parseFloat(watch('originalPrice')) || 0;
    const discountPercentage = parseFloat(value) || 0;

    setQuickDiscount(prev => ({
      ...prev,
      dollarAmount: 0, // Clear dollar when percentage is used
      percentageAmount: discountPercentage,
      isActive: discountPercentage > 0
    }));

    // Apply percentage discount to product price
    const discountAmount = (originalPrice * discountPercentage) / 100;
    const discountedPrice = originalPrice - discountAmount;
    setValue('originalPrice', discountedPrice);
    handleOriginalPriceChange(discountedPrice);
  };

  // Handle barcode generation
  const handleBarcodeGeneration = (skuType, title) => {
    const skuValue = watch(skuType === 'manufacturer' ? 'manufacturerSku' : 'internalSku');

    if (!skuValue || skuValue.trim() === '') {
      alert('Please enter a SKU value first');
      return;
    }

    openBarcodeModal(title, skuValue.trim());
  };

  const {
    tag,
    setTag,
    values,
    language,
    register,
    onSubmit,
    errors,
    slug,
    openModal,
    attribue,
    setValues,
    setValue,
    variants,
    imageUrl,
    setImageUrl,
    handleSubmit,
    isCombination,
    variantTitle,
    attributes,
    attTitle,
    handleAddAtt,
    // productId,
    onCloseModal,
    isBulkUpdate,
    globalSetting,
    isSubmitting,
    tapValue,
    setTapValue,
    resetRefTwo,
    handleSkuBarcode,
    handleProductTap,
    selectedCategory,
    setSelectedCategory,
    setDefaultCategory,
    defaultCategory,
    handleProductSlug,
    handleSelectLanguage,
    handleIsCombination,
    handleEditVariant,
    handleRemoveVariant,
    handleClearVariant,
    handleQuantityPrice,
    handleSelectImage,
    handleSelectInlineImage,
    handleGenerateCombination,
    metaKeywords, setMetaKeywords,
    watch,

    marginType,
    // setMarginType,
    discountType,
    // setDiscountType,
    // manufacturerSku,
    // setManufacturerSku,
    // internalSku,
    // setInternalSku,
    // additionalProductDetails,
    // setAdditionalProductDetails,
    // lastBatchOrderedFromManufacturer,
    // setLastBatchOrderedFromManufacturer,
    // lastBatchOrderQuantity,
    // setLastBatchOrderQuantity,
    // lastBatchOrderReference,
    // setLastBatchOrderReference,
    // stockArrivalDate,
    // setStockArrivalDate,
    // vehicleMake,
    // setVehicleMake,
    // vehicleModel,
    // setVehicleModel,
    // flatRateForDropShipping,
    // setFlatRateForDropShipping,
    // shipOutLocation,
    // setShipOutLocation,
    // directSupplierLink,
    // setDirectSupplierLink,
  } = useProductSubmit(id);

  const { currency, showingTranslateValue } = useUtilsFunction();


  return (
    <>
      <Modal
        open={openModal}
        onClose={onCloseModal}
        center
        closeIcon={
          <div className="absolute top-0 right-0 text-red-500  active:outline-none text-xl border-0">
            <FiX className="text-3xl" />
          </div>
        }
      >
        <div className="cursor-pointer">
          <UploaderThree
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            handleSelectImage={handleSelectImage}
          />
        </div>
      </Modal>


      <Modal
        open={barcodeModal.isOpen}
        onClose={closeBarcodeModal}
        center
        closeIcon={
          <div className="absolute top-0 right-0 text-red-500 active:outline-none text-xl border-0">
            <FiX className="text-3xl" />
          </div>
        }
      >
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            {barcodeModal.title}
          </h3>

          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              SKU Value: <span className="font-medium">{barcodeModal.skuValue}</span>
            </p>
          </div>

          {/* Barcode Display */}
          <div className="mb-6 p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-white">
            <div className="text-center">
              <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
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
            <Button
              onClick={closeBarcodeModal}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
            >
              Cancel
            </Button>
            <Button
              onClick={printBarcode}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center gap-2"
            >
              <FiPrinter className="w-4 h-4" />
              Print Barcode
            </Button>
          </div>
        </div>
      </Modal>

      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={register}

            title={t("UpdateProduct")}
            description={t("UpdateProductDescription")}
          />
        ) : (
          <Title
            register={register}

            title={t("DrawerAddProduct")}
            description={t("AddProductDescription")}
          />
        )}
      </div>

      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-700">
        <SwitchToggleForCombination
          product
          handleProcess={handleIsCombination}
          processOption={isCombination}
        />

        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <ActiveButton
              tapValue={tapValue}
              activeValue="Basic Info"
              handleProductTap={handleProductTap}
            />
          </li>

          {isCombination && (
            <li className="mr-2">
              <ActiveButton
                tapValue={tapValue}
                activeValue="Combination"
                handleProductTap={handleProductTap}
              />
            </li>
          )}
        </ul>
      </div>

      <Scrollbars className="track-horizontal thumb-horizontal w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="block" id="block">
          {tapValue === "Basic Info" && (
            <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
              {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductID")} />
                <div className="col-span-8 sm:col-span-4">{productId}</div>
              </div> */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={'Product Id'} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`productId`, {
                      required: "ProductId is required!",
                    })}
                    name="productId"
                    type="text"
                    placeholder={'Enter productId'}
                  // onBlur={(e) => handleProductSlug(e.target.value)}
                  />
                  <Error errorName={errors.productId} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductTitleName")} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`title`, {
                      required: "TItle is required!",
                    })}
                    name="title"
                    type="text"
                    placeholder={t("ProductTitleName")}
                    onBlur={(e) => handleProductSlug(e.target.value)}
                  />
                  <Error errorName={errors.title} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductDescription")} />
                <div className="col-span-8 sm:col-span-4">
                  <Textarea
                    className="border text-sm  block w-full bg-gray-100 border-gray-200"
                    {...register("description", {
                      required: false,
                    })}
                    name="description"
                    placeholder={t("ProductDescription")}
                    rows="4"
                    spellCheck="false"
                  />
                  <Error errorName={errors.description} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Product Excerpt"} />
                <div className="col-span-8 sm:col-span-4">
                  <Textarea
                    className="border text-sm  block w-full bg-gray-100 border-gray-200"
                    {...register("excerpt", {
                      required: "Product excerpt is required!",
                    })}
                    name="excerpt"
                    placeholder={"Product Excerpt"}
                    rows="2"
                    spellCheck="false"
                  />
                  <Error errorName={errors.excerpt} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductImage")} />
                <div className="col-span-8 sm:col-span-4">
                  <Uploader
                    product
                    folder="product"
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                  />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductSKU")} />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label={t("ProductSKU")}
                    name="sku"
                    type="text"
                    placeholder={t("ProductSKU")}
                  />
                  <Error errorName={errors.sku} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductBarcode")} />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label={t("ProductBarcode")}
                    name="barcode"
                    type="text"
                    placeholder={t("ProductBarcode")}
                  />
                  <Error errorName={errors.barcode} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Category")} />
                <div className="col-span-8 sm:col-span-4">
                  <ParentCategory
                    lang={language}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    setDefaultCategory={setDefaultCategory}
                  />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("DefaultCategory")} />
                <div className="col-span-8 sm:col-span-4">
                  <Multiselect
                    displayValue="name"
                    isObject={true}
                    singleSelect={true}
                    ref={resetRefTwo}
                    hidePlaceholder={true}
                    onKeyPressFn={function noRefCheck() { }}
                    onRemove={function noRefCheck() { }}
                    onSearch={function noRefCheck() { }}
                    onSelect={(v) => setDefaultCategory(v)}
                    selectedValues={defaultCategory}
                    options={selectedCategory}
                    placeholder={"Default Category"}
                  ></Multiselect>
                </div>
              </div>


              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Product Price" />
                <div className="col-span-8 sm:col-span-4">
                  <div className={`flex flex-row`}>
                    <span className="inline-flex items-center px-3 rounded rounded-r-none border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm focus:border-emerald-300 dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600">
                      {currency}
                    </span>
                    <Input
                      {...register("originalPrice", { required: "Original Price is required!" })}
                      type="number"
                      step={0.1}
                      min={0}
                      disabled={isCombination}
                      placeholder="Product Price"
                      onChange={(e) => {
                        setValue('originalPrice', e.target.value);
                        handleOriginalPriceChange(e.target.value);
                      }}
                      className={`rounded-l-none ${quickDiscount.isActive ? 'text-red-600 bg-red-50 border-red-300' : ''}`}
                    />
                  </div>
                  <Error errorName={errors.originalPrice} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Trade Price" />
                <div className="col-span-8 sm:col-span-4">
                  <div className={`flex flex-row`}>
                    <span className="inline-flex items-center px-3 rounded rounded-r-none border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm focus:border-emerald-300 dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600">
                      {currency}
                    </span>
                    <Input
                      {...register("tradePrice")}
                      type="number"
                      step={0.01}
                      min={0}
                      disabled={isCombination}
                      placeholder="Trade Price"
                      onChange={(e) => {
                        setValue('tradePrice', e.target.value);
                        handleTradePriceChange(e.target.value);
                      }}
                      className="rounded-l-none"
                    />
                  </div>
                  <Error errorName={errors.tradePrice} />
                </div>
              </div>

              {/* Profit Margin Display */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Profit Margin" />
                <div className="col-span-8 sm:col-span-4">
                  <div className="flex gap-4">
                    {/* Dollar Difference Box */}
                    <div className="flex-1">
                      <div className="border border-gray-300 rounded-lg p-3 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Dollar Difference
                        </div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {`${currency}${profitMargin.dollarDifference.toFixed(2)}`}
                        </div>
                      </div>
                    </div>

                    {/* Percentage Difference Box */}
                    <div className="flex-1">
                      <div className="border border-gray-300 rounded-lg p-3 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Percentage Difference
                        </div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {`${profitMargin.percentageDifference.toFixed(1)}%`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Quick Discount" />
                <div className="col-span-8 sm:col-span-4">
                  <div className="flex gap-4">

                    <div className="flex-1">
                      <div className="border border-gray-300 rounded-lg p-3 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Dollar Discount
                        </div>
                        <div className="flex flex-row">
                          <span className="inline-flex items-center px-3 rounded rounded-r-none border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm focus:border-emerald-300 dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600">
                            {currency}
                          </span>
                          <Input
                            {...register("quickDollarAmount")}
                            type="number"
                            step={0.01}
                            min={0}
                            placeholder="0.00"
                            value={quickDiscount.dollarAmount || ''}
                            onChange={(e) => handleQuickDollarDiscount(e.target.value)}
                            className="rounded-l-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="border border-gray-300 rounded-lg p-3 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Percentage Discount
                        </div>
                        <div className="flex flex-row">
                          <span className="inline-flex items-center px-3 rounded rounded-r-none border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm focus:border-emerald-300 dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600">
                            %
                          </span>
                          <Input
                            {...register("quickPercentageAmount")}
                            type="number"
                            step={0.01}
                            min={0}
                            max={100}
                            placeholder="0"
                            value={quickDiscount.percentageAmount || ''}
                            onChange={(e) => handleQuickPercentageDiscount(e.target.value)}
                            className="rounded-l-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Margin Type")} />
                <div className="col-span-8 sm:col-span-4">
                  <Select
                    {...register("marginType", { required: 'Margin type is required' })}
                  >
                    <option value="" defaultValue hidden>
                      Select Margin Type
                    </option>
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed</option>
                  </Select>
                  <Error errorName={errors.marginType} />
                </div>
              </div>

              {
                watch('marginType') === "fixed" && (
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label="Sale Price" />
                    <div className="col-span-8 sm:col-span-4">
                      <div className={`flex flex-row`}>
                        <span className="inline-flex items-center px-3 rounded rounded-r-none border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm focus:border-emerald-300 dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600">
                          {currency}
                        </span>
                        <Input
                          {...register("price", { required: "Price is required!" })}
                          type="number"
                          step={0.01}
                          min={0}
                          disabled={isCombination}
                          placeholder="Sale Price"
                          onChange={(e) => {
                            setValue('price', e.target.value);
                          }}
                          className="rounded-l-none"
                        />
                      </div>
                      <Error errorName={errors.price} />
                    </div>
                  </div>
                )
              }
              {
                watch('marginType') === "percentage" && (
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label="Product Percentage" />
                    <div className="col-span-8 sm:col-span-4">
                      <div className={`flex flex-row`}>
                        <span className="inline-flex items-center px-3 rounded rounded-r-none border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm  focus:border-emerald-300 dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600">
                          {/* {currency} */} %
                        </span>

                        <Input
                          type="number"
                          step={0.01}
                          min={1}
                          disabled={!watch('originalPrice')}
                          placeholder="Enter percentage"
                          onChange={(e) => {
                            const tradePrice = parseFloat(watch('originalPrice')) || 0;
                            const inputPercentage = parseFloat(e.target.value) || 0;
                            const calculatedValue = tradePrice + (tradePrice * inputPercentage / 100);
                            console.log(calculatedValue)
                            setValue('price', calculatedValue)
                            // register('price').onChange({target:{value:calculatedValue}});

                          }}
                          className="mr-2 p-2 rounded-l-none"
                        />
                      </div>
                      <Error errorName={errors.price} />

                    </div>
                  </div>

                )
              }


              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Discount Type")} />
                <div className="col-span-8 sm:col-span-4">
                  <Select

                    {...register("discountType", { required: 'Discount Type is required' })}
                  >
                    <option value="" defaultValue hidden>
                      Select discount Type
                    </option>
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed</option>

                  </Select>
                  <Error errorName={errors.discountType} />
                </div>
              </div>

              {
                watch('discountType') === "fixed" && (
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label="Discount Price" />
                    <div className="col-span-8 sm:col-span-4">
                      <InputValue
                        disabled={isCombination}
                        register={register}
                        maxValue={100000}
                        minValue={1}
                        label="Discount Price"
                        name="discountPrice"
                        type="number"
                        placeholder="Discount Price"
                        defaultValue={0.0}
                        required={true}
                        product
                        currency={currency}
                      />
                      <Error errorName={errors.discountPrice} />
                    </div>
                  </div>
                )
              }
              {
                watch('discountType') === "percentage" && (
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label="Discount Percentage" />
                    <div className="col-span-8 sm:col-span-4">
                      <div className={`flex flex-row`}>
                        <span className="inline-flex items-center px-3 rounded rounded-r-none border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm  focus:border-emerald-300 dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600">
                          {/* {currency} */} %
                        </span>

                        <Input
                          type="number"
                          step={0.01}
                          min={1}
                          disabled={!watch('price')}
                          placeholder="Enter percentage"
                          onChange={(e) => {
                            const tradePrice = parseFloat(watch('price')) || 0;
                            const inputPercentage = parseFloat(e.target.value) || 0;
                            const calculatedValue = tradePrice - (tradePrice * inputPercentage / 100);
                            console.log(calculatedValue)
                            setValue('discountPrice', calculatedValue)
                            // register('price').onChange({target:{value:calculatedValue}});

                          }}
                          className="mr-2 p-2 rounded-l-none"
                        />
                      </div>
                      <Error errorName={errors.discountPrice} />

                    </div>
                  </div>

                )
              }


              {/* 
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("SalePrice")} />
                <div className="col-span-8 sm:col-span-4">
                  <InputValue
                    disabled={isCombination}
                    product
                    register={register}
                    minValue={0}
                    defaultValue={0.0}
                    required={true}
                    label="Sale price"
                    name="price"
                    type="number"
                    placeholder="Sale price"
                    currency={currency}
                  />
                  <Error errorName={errors.price} />
                </div>
              </div> */}

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
                <LabelArea label={t("ProductQuantity")} />
                <div className="col-span-8 sm:col-span-4">
                  <InputValueFive
                    required={true}
                    disabled={isCombination}
                    register={register}
                    minValue={null}
                    defaultValue={0}
                    label="Quantity"
                    name="stock"
                    type="number"
                    placeholder={t("ProductQuantity")}
                  />
                  <Error errorName={errors.stock} />
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-gray-500">💡 Tip: </span>
                    <span>Enter negative values for backorders (e.g., -5 for 5 items on backorder)</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductSlug")} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`slug`, {
                      required: "Slug is required!",
                    })}
                    className=" mr-2 p-2"
                    name="slug"
                    type="text"
                    defaultValue={slug}
                    placeholder={t("ProductSlug")}
                    onBlur={(e) => handleProductSlug(e.target.value)}
                  />
                  <Error errorName={errors.slug} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
                <LabelArea label={"Product Weight"} />
                <div className="col-span-8 sm:col-span-4">
                  <InputValueFive
                    required={true}
                    disabled={isCombination}
                    register={register}
                    minValue={0}
                    defaultValue={0}
                    label="Product Weight"
                    name="weight"
                    type="number"
                    placeholder={'Product Weight'}
                  />
                  <Error errorName={errors.weight} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
                <LabelArea label={"Product Length"} />
                <div className="col-span-8 sm:col-span-4">
                  <InputValueFive
                    required={true}
                    disabled={isCombination}
                    register={register}
                    minValue={0}
                    defaultValue={0}
                    label="Product Length"
                    name="length"
                    type="number"
                    placeholder={'Product Length'}
                  />
                  <Error errorName={errors['length']} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
                <LabelArea label={"Product Width"} />
                <div className="col-span-8 sm:col-span-4">
                  <InputValueFive
                    required={true}
                    disabled={isCombination}
                    register={register}
                    minValue={0}
                    defaultValue={0}
                    label="Product Width"
                    name="width"
                    type="number"
                    placeholder={'Product Width'}
                  />
                  <Error errorName={errors["width"]} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
                <LabelArea label={"Product Height"} />
                <div className="col-span-8 sm:col-span-4">
                  <InputValueFive
                    required={true}
                    disabled={isCombination}
                    register={register}
                    minValue={0}
                    defaultValue={0}
                    label="Product Height"
                    name="height"
                    type="number"
                    placeholder={'Product Height'}
                  />
                  <Error errorName={errors.height} />
                </div>
              </div>



              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductTag")} />
                <div className="col-span-8 sm:col-span-4">
                  <ReactTagInput
                    placeholder={t("ProductTagPlaceholder")}
                    tags={tag}
                    onChange={(newTags) => setTag(newTags)}
                  />
                </div>
              </div>







              {/* Manufacturer SKU */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Manufacturer SKU")} />
                <div className="col-span-8 sm:col-span-4">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <InputArea required={true} register={register} name="manufacturerSku" label={'Manufacturer Sku'} type="text" placeholder={t("Manufacturer SKU")} />
                    </div>
                    <Button
                      type="button"
                      onClick={() => handleBarcodeGeneration('manufacturer', 'Manufacturer SKU Barcode')}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                      title="Generate Barcode"
                    >
                      <FiPrinter className="w-4 h-4" />
                    </Button>
                  </div>
                  <Error errorName={errors.manufacturerSku} />
                </div>
              </div>


              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Internal SKU")} />
                <div className="col-span-8 sm:col-span-4">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <InputArea required={true} register={register} label={'Internal Sku'} name="internalSku" type="text" placeholder={t("Internal SKU")} />
                    </div>
                    <Button
                      type="button"
                      onClick={() => handleBarcodeGeneration('internal', 'Internal SKU Barcode')}
                      className="flex items-center gap-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
                      title="Generate Barcode"
                    >
                      <FiPrinter className="w-4 h-4" />
                    </Button>
                  </div>
                  <Error errorName={errors.internalSku} />
                </div>
              </div>


              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Additional Product Details")} />
                <div className="col-span-8 sm:col-span-4">
                  <Textarea

                    {...register("additionalProductDetails", { required: "Additional Product Details is required!" })}
                    name="additionalProductDetails"
                    placeholder={t("Additional Product Details")}
                    rows="4"
                  />
                  <Error errorName={errors.additionalProductDetails} />

                </div>
              </div>


              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Last Batch Ordered From Manufacturer")} />
                <div className="col-span-8 sm:col-span-4">
                  <Input type="date"  {...register("lastBatchOrderedFromManufacturer", { required: 'Last Batch Order Manufacturer required' })} />
                  <Error errorName={errors.lastBatchOrderedFromManufacturer} />

                </div>
              </div>


              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Last Batch Order Quantity")} />
                <div className="col-span-8 sm:col-span-4">
                  <InputValue register={register} name="lastBatchOrderQuantity" label={'Last batch order quantity'} required={true} type="number" />
                  <Error errorName={errors.lastBatchOrderQuantity} />

                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Last Batch Order Reference")} />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea register={register} name="lastBatchOrderReference" label={'Last Batch order reference'} required={true} type="text" />
                  <Error errorName={errors.lastBatchOrderReference} />

                </div>
              </div>


              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Stock Arrival Date")} />
                <div className="col-span-8 sm:col-span-4">
                  <Input type="date" {...register("stockArrivalDate")} />
                  <Error errorName={errors.stockArrivalDate} />

                </div>
              </div>


              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Vehicle Make")} />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea register={register} name="vehicleMake" type="text" />
                  <Error errorName={errors.vehicleMake} />

                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Vehicle Model")} />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea register={register} name="vehicleModel" type="text" />
                  <Error errorName={errors.vehicleModel} />

                </div>
              </div>

              {/* Flat Rate for Drop Shipping */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Flat Rate for Drop Shipping")} />
                <div className="col-span-8 sm:col-span-4">
                  <InputValue register={register} name="flatRateForDropShipping" type="number" />
                  <Error errorName={errors.flatRateForDropShipping} />

                </div>
              </div>

              {/* Ship Out Location & Direct Supplier Link */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Ship Out Location")} />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea register={register} name="shipOutLocation" label={'Ship Out location'} required={true} type="text" />
                  <Error errorName={errors.shipOutLocation} />

                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Direct Supplier Link")} />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea register={register} name="directSupplierLink" type="text" />
                  <Error errorName={errors.directSupplierLink} />

                </div>
              </div>


              {/* SEO */}


              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Product Meta Title"} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`metaTitle`, {
                      required: "Meta Title is required!",
                    })}
                    name="metaTitle"
                    type="text"
                    placeholder={"Product Meta Title"}
                  />
                  <Error errorName={errors.metaTitle} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Meta Product Description"} />
                <div className="col-span-8 sm:col-span-4">
                  <Textarea
                    className="border text-sm  block w-full bg-gray-100 border-gray-200"
                    {...register("metaDescription", {
                      required: "Product Meta Description is required",
                    })}
                    name="metaDescription"
                    placeholder={"Product Meta Description"}
                    rows="2"
                    spellCheck="false"
                  />
                  <Error errorName={errors.metaDescription} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Product Meta Keywords"} />
                <div className="col-span-8 sm:col-span-4">
                  <ReactTagInput
                    placeholder={"Product Meta Keywords"}
                    tags={metaKeywords}
                    onChange={(newMetaKeyWords) => setMetaKeywords(newMetaKeyWords)}
                  />
                </div>
              </div>
            </div>
          )}

          {tapValue === "Combination" &&
            isCombination &&
            (attribue.length < 1 ? (
              <div
                className="bg-teal-100 border border-teal-600 rounded-md text-teal-900 px-4 py-3 m-4"
                role="alert"
              >
                <div className="flex">
                  <div className="py-1">
                    <svg
                      className="fill-current h-6 w-6 text-teal-500 mr-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm">
                      {t("AddCombinationsDiscription")}{" "}
                      <Link to="/attributes" className="font-bold">
                        {t("AttributesFeatures")}
                      </Link>
                      {t("AddCombinationsDiscriptionTwo")}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6">
                {/* <h4 className="mb-4 font-semibold text-lg">Variants</h4> */}
                <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3 md:gap-3 xl:gap-3 lg:gap-2 mb-3">
                  <MultiSelect
                    options={attTitle}
                    value={attributes}
                    onChange={(v) => handleAddAtt(v)}
                    labelledBy="Select"
                  />

                  {attributes?.map((attribute, i) => (
                    <div key={attribute._id}>
                      <div className="flex w-full h-10 justify-between font-sans rounded-tl rounded-tr bg-gray-200 px-4 py-3 text-left text-sm font-normal text-gray-700 hover:bg-gray-200">
                        {"Select"}
                        {showingTranslateValue(attribute?.title)}
                      </div>

                      <AttributeOptionTwo
                        id={i + 1}
                        values={values}
                        lang={language}
                        attributes={attribute}
                        setValues={setValues}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mb-6">
                  {attributes?.length > 0 && (
                    <Button
                      onClick={handleGenerateCombination}
                      type="button"
                      className="mx-2"
                    >
                      <span className="text-xs">{t("GenerateVariants")}</span>
                    </Button>
                  )}

                  {variantTitle.length > 0 && (
                    <Button onClick={handleClearVariant} className="mx-2">
                      <span className="text-xs">{t("ClearVariants")}</span>
                    </Button>
                  )}
                </div>
              </div>
            ))}

          {isCombination ? (
            <DrawerButton
              id={id}
              save
              title="Product"
              isSubmitting={isSubmitting}
              handleProductTap={handleProductTap}
            />
          ) : (
            <DrawerButton id={id} title="Product" isSubmitting={isSubmitting} />
          )}

          {tapValue === "Combination" && (
            <DrawerButton id={id} title="Product" isSubmitting={isSubmitting} />
          )}
        </form>

        {tapValue === "Combination" &&
          isCombination &&
          variantTitle.length > 0 && (
            <div className="px-6 overflow-x-auto">
              {/* {variants?.length >= 0 && ( */}
              {isCombination && (
                <TableContainer className="md:mb-32 mb-40 rounded-b-lg">
                  <Table>
                    <TableHeader>
                      <tr>
                        <TableCell>{t("Image")}</TableCell>
                        <TableCell>{t("Combination")}</TableCell>
                        <TableCell>{t("Sku")}</TableCell>
                        <TableCell>{t("Barcode")}</TableCell>
                        <TableCell>{t("Price")}</TableCell>
                        <TableCell>{t("SalePrice")}</TableCell>
                        <TableCell>{t("QuantityTbl")}</TableCell>
                        <TableCell className="text-right">
                          {t("Action")}
                        </TableCell>
                      </tr>
                    </TableHeader>

                    <AttributeListTable
                      lang={language}
                      variants={variants}
                      setTapValue={setTapValue}
                      variantTitle={variantTitle}
                      isBulkUpdate={isBulkUpdate}
                      handleSkuBarcode={handleSkuBarcode}
                      handleEditVariant={handleEditVariant}
                      handleRemoveVariant={handleRemoveVariant}
                      handleQuantityPrice={handleQuantityPrice}
                      handleSelectInlineImage={handleSelectInlineImage}
                    />
                  </Table>
                </TableContainer>
              )}
            </div>
          )}
      </Scrollbars>
    </>
  );
};

export default React.memo(ProductDrawer);
