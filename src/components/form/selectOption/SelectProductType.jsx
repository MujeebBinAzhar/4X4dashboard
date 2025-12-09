import { Select } from "@windmill/react-ui";
import React from "react";
import { useTranslation } from "react-i18next";

const SelectProductType = ({ setProductType, selectedProductType }) => {
    const { t } = useTranslation();

    return (
        <>
            <Select
                value={selectedProductType || ""}
                onChange={(e) => setProductType(e.target.value)}
            >
                <option value="" defaultValue hidden>
                    {t("Product Type")}
                </option>
                <option value="simple">{t("Simple")}</option>
                <option value="variable">{t("Variable")}</option>
            </Select>
        </>
    );
};

export default SelectProductType;

