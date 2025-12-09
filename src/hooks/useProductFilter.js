/* eslint-disable react-hooks/exhaustive-deps */
import Ajv from "ajv";
import csvToJson from "csvtojson";
import { useContext, useState } from "react";

//internal import
import { SidebarContext } from "@/context/SidebarContext";
import ProductServices from "@/services/ProductServices";
import { notifyError, notifySuccess } from "@/utils/toast";

const pickKeysAndCleanExcerpt = (obj, keys) => {
  const cleanHTML = (html) => html.replace(/<\/?[^>]+(>|$)/g, ""); // Regular expression to strip tags
  return keys.reduce((acc, key) => {
    if (obj.hasOwnProperty(key)) {
      acc[key] = key === "post_excerpt" ? cleanHTML(obj[key]) : obj[key];
    }
    return acc;
  }, {});
};

// List of required keys
const requiredKeys = [
  "ID",
  "height",
  "images",
  "length",
  "low_stock_amount",
  "post_content",
  "post_excerpt",
  "post_name",
  "post_status",
  "post_title",
  "regular_price",
  "sku",
  "stock_status",
  "tax:product_cat",
  "tax:product_tag",
  "weight",
  "width",
  "sale_price",
  "meta:total_sales",
  "productId",
  "manufacturerSku",
  "internalSku",
  "tradePrice",
  "profitMarginDollar",
  "profitMarginPercentage",
  "quickDiscountDollar",
  "quickDiscountPercentage",
  "additionalProductDetails",
];

// custom product upload validation schema
const schema = {
  type: "object",
  properties: {
    categories: { type: "array" },
    image: { type: "array" },
    tag: { type: "array" },
    variants: { type: "array" },
    show: { type: "array" },
    status: { type: "string" },
    prices: { type: "object" },
    profitMargin: { type: "object" },
    quickDiscount: { type: "object" },
    isCombination: { type: "boolean" },
    title: { type: "object" },
    productId: { type: "string" },
    slug: { type: "string" },
    category: { type: "object" },
    stock: { type: "number" },
    sales: { type: "string" },
    description: { type: "object" },
    excerpt: {
      type: "string",
    },
    weight: {
      type: "string",
    },
    length: {
      type: "string",
    },
    width: {
      type: "string",
    },
    height: {
      type: "string",
    },
    manufacturerSku: {
      type: "string",
    },
    internalSku: {
      type: "string",
    },
    additionalProductDetails: {
      type: "string",
    },
  },
  required: ["prices", "title"],
};

const useProductFilter = (data) => {
  const ajv = new Ajv({ allErrors: true });
  const { setLoading, setIsUpdate } = useContext(SidebarContext);

  const [newProducts] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [filename, setFileName] = useState("");
  const [isDisabled, setIsDisable] = useState(false);

  //service data filtering
  const serviceData = data || [];

  //  console.log('selectedFile',selectedFile)

  const handleOnDrop = (data) => {
    // console.log('data', data);
    for (let i = 0; i < data.length; i++) {
      newProducts.push(data[i].data);
    }
  };

  const handleUploadProducts = () => {
    // return notifyError("This feature is disabled for demo!");
    if (newProducts.length < 1) {
      notifyError("Please upload/select csv file first!");
    } else {
      // return notifySuccess("CRUD operation disable for demo!");
      ProductServices.addAllProducts(newProducts)
        .then((res) => {
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
    }
  };

  const handleSelectFile = async (e) => {
    e.preventDefault();

    const fileReader = new FileReader();
    const file = e.target?.files[0];

    if (file && file.type === "application/json") {
      setFileName(file?.name);
      setIsDisable(true);

      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = (e) => {
        const text = JSON.parse(e.target.result);

        const productData = text.map((value) => {
          return {
            categories: value.categories,
            image: value.image,
            barcode: value.barcode,
            tag: value.tag,
            variants: value.variants,
            status: value.status,
            prices: value.prices,
            isCombination: JSON.parse(value.isCombination.toLowerCase()),
            title: value.title,
            productId: value.productId,
            slug: value.slug,
            sku: value.sku,
            category: value.category,
            stock: value.stock,
            description: value.description,
          };
        });

        setSelectedFile(productData);
      };
    } else if (file && file.type === "text/csv") {
      setFileName(file?.name);
      setIsDisable(true);

      fileReader.onload = async (event) => {
        const text = event.target.result;
        const json = await csvToJson().fromString(text);
        const filteredProducts = json.map((product) =>
          pickKeysAndCleanExcerpt(product, requiredKeys)
        );
        const productData = filteredProducts.map((value) => {
          return {
            categories: [],
            image: [],
            sales: value?.["meta:total_sales"] || 0,
            barcode: value?.barcode || "",
            tag: value["tax:product_tag"]
              ? value["tax:product_tag"].split("|")
              : [],
            variants: [],
            status: "show",
            prices: {
              originalPrice: Number(value?.regular_price),
              price: value?.sale_price
                ? Number(value?.sale_price)
                : Number(value?.regular_price),
              discount: value?.sale_price
                ? Number(value?.regular_price) - Number(value?.sale_price)
                : 0,
              tradePrice: Number(value?.tradePrice) || 0,
            },
            profitMargin: {
              dollarDifference: Number(value?.profitMarginDollar) || 0,
              percentageDifference: Number(value?.profitMarginPercentage) || 0,
            },
            quickDiscount: {
              dollarAmount: Number(value?.quickDiscountDollar) || 0,
              percentageAmount: Number(value?.quickDiscountPercentage) || 0,
              isActive:
                Number(value?.quickDiscountDollar) > 0 ||
                Number(value?.quickDiscountPercentage) > 0,
            },
            isCombination: false,
            title: {
              en: value?.post_title,
            },
            excerpt: value?.post_excerpt,
            weight: value?.weight,
            length: value?.["length"],
            width: value?.width,
            height: value?.height,
            productId: value?.productId || value?.ID,
            slug: value?.post_name,
            sku: value.sku,
            manufacturerSku: value?.manufacturerSku || "",
            internalSku: value?.internalSku || "",
            additionalProductDetails: value?.additionalProductDetails || "",
            category: value?.["tax:product_cat"] || "",
            stock: value.stock_status === "instock" ? 20 : 0,
            description: {
              en: value?.post_content || "",
            },
          };
        });

        setSelectedFile(productData);
      };

      fileReader.readAsText(file);
    } else {
      setFileName(file?.name);
      setIsDisable(true);

      notifyError("Unsupported file type!");
    }
  };

  const handleUploadMultiple = (e) => {
    // return notifyError("This feature is disabled for demo!");
    if (selectedFile.length > 1) {
      setLoading(true);
      let productDataValidation = selectedFile.map((value) =>
        ajv.validate(schema, value)
      );

      const isBelowThreshold = (currentValue) => currentValue === true;
      const validationData = productDataValidation.every(isBelowThreshold);
      ProductServices.addAllProducts(selectedFile)
        .then((res) => {
          setIsUpdate(true);
          setLoading(false);
          notifySuccess(res.message);
        })
        .catch((err) => {
          setLoading(false);
          notifyError(err.message);
        });
      if (validationData) {
      } else {
        setLoading(false);
        notifyError("Please enter valid data!");
      }
    } else {
      setLoading(false);
      notifyError("Please select a valid json, csv & xls file first!");
    }
  };

  const handleRemoveSelectFile = (e) => {
    // console.log('remove');
    setFileName("");
    setSelectedFile([]);
    setTimeout(() => setIsDisable(false), 1000);
  };

  return {
    data,
    filename,
    isDisabled,
    handleSelectFile,
    serviceData,
    handleOnDrop,
    handleUploadProducts,
    handleRemoveSelectFile,
    handleUploadMultiple,
  };
};

export default useProductFilter;
