import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import SettingServices from "@/services/SettingServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import { SidebarContext } from "@/context/SidebarContext";
import { removeSetting } from "@/reduxStore/slice/settingSlice";

const useStockManagementSettingSubmit = (id) => {
  const dispatch = useDispatch();
  const { setIsUpdate } = useContext(SidebarContext);
  const [isSave, setIsSave] = useState(id ? false : true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const settingData = {
        name: "stockManagementSetting",
        setting: {
          low_stock_threshold: parseInt(data.low_stock_threshold) ?? 20,
          high_stock_threshold: parseInt(data.high_stock_threshold) ?? 40,
          enable_backorder: data.enable_backorder === "true",
          custom_warning_message:
            data.custom_warning_message ||
            "This item could be out of stock. Product Quantity is either 0 or below 0. If it is, we will contact you after your order is placed. Alternately, please contact us to check current stock levels.",
          show_stock_warnings_checkout:
            data.show_stock_warnings_checkout === "true",
        },
      };

      if (!isSave) {
        const res = await SettingServices.updateStockManagementSetting(
          settingData
        );
        setIsUpdate(true);
        setIsSubmitting(false);
        dispatch(removeSetting("stockManagementSetting"));
        window.location.reload();
        notifySuccess(res.message);
      } else {
        const res = await SettingServices.addStockManagementSetting(
          settingData
        );
        setIsUpdate(true);
        setIsSubmitting(false);
        window.location.reload();
        notifySuccess(res.message);
      }
    } catch (err) {
      notifyError(err?.response?.data?.message || err?.message);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchStockManagementSetting = async () => {
      try {
        const res = await SettingServices.getStockManagementSetting();
        if (res && res.data && res.data.length > 0) {
          const settingData = res.data[0];
          setIsSave(false);

          // Set form values
          setValue(
            "low_stock_threshold",
            settingData.setting?.low_stock_threshold ?? 20
          );
          setValue(
            "high_stock_threshold",
            settingData.setting?.high_stock_threshold ?? 40
          );
          setValue(
            "enable_backorder",
            settingData.setting?.enable_backorder ? "true" : "false"
          );
          setValue(
            "custom_warning_message",
            settingData.setting?.custom_warning_message ||
              "This item could be out of stock. Product Quantity is either 0 or below 0. If it is, we will contact you after your order is placed. Alternately, please contact us to check current stock levels."
          );
          setValue(
            "show_stock_warnings_checkout",
            settingData.setting?.show_stock_warnings_checkout ? "true" : "false"
          );
        } else {
          setIsSave(true);
          // Set default values
          setValue("low_stock_threshold", 20);
          setValue("high_stock_threshold", 40);
          setValue("enable_backorder", "false");
          setValue(
            "custom_warning_message",
            "This item could be out of stock. Product Quantity is either 0 or below 0. If it is, we will contact you after your order is placed. Alternately, please contact us to check current stock levels."
          );
          setValue("show_stock_warnings_checkout", "true");
        }
      } catch (error) {
        console.error("Error fetching stock management settings:", error);
        setIsSave(true);
        // Set default values
        setValue("low_stock_threshold", 20);
        setValue("high_stock_threshold", 40);
        setValue("enable_backorder", "false");
        setValue(
          "custom_warning_message",
          "This item could be out of stock. Product Quantity is either 0 or below 0. If it is, we will contact you after your order is placed. Alternately, please contact us to check current stock levels."
        );
        setValue("show_stock_warnings_checkout", "true");
      }
    };

    fetchStockManagementSetting();
  }, [setValue]);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSave,
    isSubmitting,
  };
};

export default useStockManagementSettingSubmit;
