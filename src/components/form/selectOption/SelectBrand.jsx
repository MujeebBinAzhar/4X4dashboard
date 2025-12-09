import { Select } from "@windmill/react-ui";
import React from "react";
import { useTranslation } from "react-i18next";

//internal import
import useAsync from "@/hooks/useAsync";
import BrandServices from "@/services/BrandsServices";

const SelectBrand = ({ setBrand, selectedBrand }) => {
  const { t } = useTranslation();
  const { data } = useAsync(BrandServices.getAllBrands);

  return (
    <>
      <Select 
        value={selectedBrand || ""} 
        onChange={(e) => setBrand(e.target.value)}
      >
        <option value="" defaultValue hidden>
          {t("Select Brand")}
        </option>
        {data?.map((brand) => (
          <option key={brand._id} value={brand._id}>
            {brand.name}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectBrand;

