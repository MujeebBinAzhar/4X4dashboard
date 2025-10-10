import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// Internal imports
import { SidebarContext } from "@/context/SidebarContext";
import BrandServices from "@/services/BrandsServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import useUtilsFunction from "./useUtilsFunction";

const useBrandSubmit = (id) => {
    const { isDrawerOpen, closeDrawer, setIsUpdate, lang } = useContext(SidebarContext);
    const [imageUrl, setImageUrl] = useState("");
    const [language, setLanguage] = useState(lang);
    const [resData, setResData] = useState({});
    const [published, setPublished] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { currency } = useUtilsFunction();

    const {
        register,
        handleSubmit,
        setValue,
        clearErrors,
        formState: { errors },
    } = useForm();

    const handleRemoveEmptyKey = (obj) => {
        for (const key in obj) {
            if (obj[key].trim() === "") {
                delete obj[key];
            }
        }
        return obj;
    };

    const onSubmit = async (data) => {
        console.log(data)
        try {
            setIsSubmitting(true);

            const brandData = {
                slug: data.slug,
                name: data.name,
                country: data.country,
                image: imageUrl,
                isPublished: published ? "show" : "hide",
                // lang: language,
            };

            if (id) {
                const res = await BrandServices.updateBrand(id, brandData);
                setIsUpdate(true);
                setIsSubmitting(false);
                notifySuccess(res.message);
                closeDrawer();
            } else {
                console.log(brandData)
                const res = await BrandServices.addBrand(brandData);
                setIsUpdate(true);
                setIsSubmitting(false);
                notifySuccess(res.message);
                closeDrawer();
            }
        } catch (err) {
            notifyError(err?.response?.data?.message || err?.message);
            setIsSubmitting(false);
            closeDrawer();
        }
    };

    const handleSelectLanguage = (lang) => {
        setLanguage(lang);
        if (Object.keys(resData).length > 0) {
            setValue("name", resData.name[lang ? lang : "en"]);
        }
    };

    useEffect(() => {
        if (!isDrawerOpen) {
            setResData({});
            setValue("slug");
            setValue("name");
            setValue("country");
            setImageUrl("");
            clearErrors("slug");
            clearErrors("name");
            clearErrors("country");
            setLanguage(lang);
            setValue("language", language);
            return;
        }
        if (id) {
            (async () => {
                try {
                    const res = await BrandServices.getBrandById(id);
                    if (res) {
                        setResData(res);
                        setValue("slug", res.slug);
                        setValue("name", res.name);
                        setValue("country", res.country);
                        setPublished(res.isPublished === "show" ? true : false);
                        setImageUrl(res.image);
                    }
                } catch (err) {
                    notifyError(err?.response?.data?.message || err?.message);
                }
            })();
        }
    }, [id, setValue, isDrawerOpen, clearErrors, language, lang]);

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        setImageUrl,
        imageUrl,
        published,
        setPublished,
        currency,
        isSubmitting,
        handleSelectLanguage,
    };
};

export default useBrandSubmit;
