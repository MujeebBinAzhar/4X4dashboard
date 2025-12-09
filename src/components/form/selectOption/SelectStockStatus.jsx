import { Select } from "@windmill/react-ui";
import React from "react";
import { useTranslation } from "react-i18next";

const SelectStockStatus = ({ setStockStatus, selectedStockStatus }) => {
    const { t } = useTranslation();

    return (
        <>
            <Select
                value={selectedStockStatus || ""}
                onChange={(e) => setStockStatus(e.target.value)}
            >
                <option value="" defaultValue hidden>
                    {t("Stock Status")}
                </option>
                <option value="in_stock">{t("In Stock")}</option>
                <option value="out_of_stock">{t("Out of Stock")}</option>
                <option value="on_backorder">{t("On Backorder")}</option>
            </Select>
        </>
    );
};

export default SelectStockStatus;

