import { useTranslation } from "react-i18next";
import ReactTagInput from "@pathofdev/react-tag-input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react"; // Import useState and useEffect

import { Input, Textarea, Button } from "@windmill/react-ui";
import PageTitle from "@/components/Typography/PageTitle";
import { pages } from "@/utils/static-seo";
import LabelArea from "@/components/form/selectOption/LabelArea";
import requests from "@/services/httpService";
import { notifyError, notifySuccess } from "@/utils/toast";

const SEO = () => {
        const { t } = useTranslation();


        const [initialValues, setInitialValues] = useState({}); // State for initial values

        useEffect(() => {
                // Fetch initial SEO data (replace with your actual API call)
                const fetchInitialData = async () => {
                        const fetchedData = {};
                        for (const page of pages) {
                                // Replace with your actual API endpoint for each page
                                const response = await requests.get(`/seo/${page}`); // Example API endpoint
                                if (response.data) {
                                        fetchedData[page] = response.data;

                                }
                        }
                        setInitialValues(fetchedData);
                };

                fetchInitialData();
        }, []);

        const handleUpdate = (page, trigger, getValues) => async () => {
                const isValid = await trigger();
                if (!isValid) {
                        console.log("Form validation failed");
                        return;
                }

                const values = getValues();
                // Make API call to update SEO metadata (send the entire 'values' object)
                try {
                        const response = await requests.post(`/seo/add`, { ...values[page], page });
                        if (response?.status === 200) {
                                notifySuccess(response?.message)
                        }
                        if (response.status === 201) {
                                notifySuccess(response?.message)
                        }
                } catch (error) {
                        notifyError("Something went wrong!");

                        // console.error("Error updating SEO data:", error);
                }
        };

        return (
                <>
                        <PageTitle>{t("SEO Management")}</PageTitle>
                        {pages.map((page, index) => {
                                const [defaultKeyWords, setDefaultKeyWords] = useState({ [page]: initialValues[page]?.metaKeywords || [] })
                                const defaultValuesForPage = initialValues[page] || {
                                        metaTitle: "",
                                        metaDescription: "",
                                        metaKeywords: [],
                                };


                                const {
                                        register,
                                        handleSubmit,
                                        setValue,
                                        getValues,
                                        formState: { errors },
                                        trigger,
                                        reset, // Add reset function
                                } = useForm({
                                        defaultValues: {
                                                [page]: defaultValuesForPage,
                                        },
                                });

                                useEffect(() => {
                                        // Reset the form when initialValues changes for this page
                                        reset({ [page]: defaultValuesForPage });
                                }, [initialValues[page], reset, page]);

                                return (
                                        <div key={`${page}-${index}`} className="mb-6">
                                                <PageTitle className="capitalize">{page.toUpperCase()}</PageTitle>
                                                <form onSubmit={handleSubmit(handleUpdate(page, trigger, getValues))}>
                                                        {/* ... (Meta Title and Meta Description remain the same) */}
                                                        {/* Meta Title */}

                                                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">

                                                                <LabelArea label={"Meta Title"} />

                                                                <div className="col-span-8 sm:col-span-4">

                                                                        <Input

                                                                                {...register(`${page}.metaTitle`, { required: "Meta Title is required!" })}



                                                                                name={`${page}.metaTitle`} // Ensure the name includes the page to scope correctly

                                                                                type="text"

                                                                                placeholder={"Meta Title"}

                                                                                className={errors[`${page}.metaTitle`] && "border-red-500"}

                                                                        />



                                                                        {errors[page] && errors[page]?.metaTitle && (

                                                                                <span className="text-red-500 text-sm">

                                                                                        {errors[page]?.metaTitle?.message}

                                                                                </span>

                                                                        )}

                                                                </div>

                                                        </div>





                                                        {/* Meta Description */}

                                                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">

                                                                <LabelArea label={"Meta Description"} />

                                                                <div className="col-span-8 sm:col-span-4">

                                                                        <Textarea

                                                                                {...register(`${page}.metaDescription`, {

                                                                                        required: "Meta Description is required!",

                                                                                })}

                                                                                className={`border text-sm block w-full bg-gray-100 ${errors[`${page}.metaDescription`] && "border-red-500"

                                                                                        }`}

                                                                                name={`${page}.metaDescription`} // Ensure the name includes the page to scope correctly

                                                                                placeholder={"Meta Description"}

                                                                                rows="2"

                                                                                spellCheck="false"

                                                                        />

                                                                        {errors[page] && errors[page]?.metaDescription && (

                                                                                <span className="text-red-500 text-sm">

                                                                                        {errors[page]?.metaDescription?.message}

                                                                                </span>

                                                                        )}

                                                                </div>

                                                        </div>
                                                        {/* Meta Keywords */}
                                                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                                                <LabelArea label={"Meta Keywords"} />
                                                                <div className="col-span-8 sm:col-span-4">

                                                                        <ReactTagInput
                                                                                placeholder={"Meta Keywords"}
                                                                                tags={initialValues[page]?.metaKeywords || defaultKeyWords[page] || []}
                                                                                onChange={(newMetaKeywords) => {
                                                                                        setDefaultKeyWords(prev => ({
                                                                                                ...prev,
                                                                                                [page]: newMetaKeywords // Merge arrays properly
                                                                                        }));
                                                                                        setValue(`${page}.metaKeywords`, newMetaKeywords);
                                                                                }}
                                                                        />
                                                                </div>
                                                        </div>

                                                        {/* Update Button */}
                                                        <div className="text-right">
                                                                <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                                                        Save Changes
                                                                </Button>
                                                        </div>
                                                </form>
                                        </div>
                                );
                        })}
                </>
        );
};

export default SEO;