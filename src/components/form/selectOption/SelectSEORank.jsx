import { Select } from "@windmill/react-ui";
import React from "react";
import { useTranslation } from "react-i18next";

const SelectSEORank = ({ setSEORank, selectedSEORank }) => {
  const { t } = useTranslation();

  return (
    <Select 
      value={selectedSEORank || ""} 
      onChange={(e) => setSEORank(e.target.value)}
      disabled={true}
      className="opacity-50 cursor-not-allowed"
    >
      <option value="" defaultValue hidden>
        {t("SEO Rank (Rank Math)")}
      </option>
      <option value="excellent">{t("Excellent (90-100)")}</option>
      <option value="good">{t("Good (70-89)")}</option>
      <option value="needs_improvement">{t("Needs Improvement (50-69)")}</option>
      <option value="poor">{t("Poor (0-49)")}</option>
    </Select>
  );
};

export default SelectSEORank;

