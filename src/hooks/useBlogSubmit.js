import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "@/context/SidebarContext";
import BlogServices from "@/services/BlogServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import slugify from "slugify";

const useBlogSubmit = (id) => {
    const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);
    const [imageUrl, setImageUrl] = useState("");
    const [published, setPublished] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [metaKeywords, setMetaKeywords] = useState([])

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        clearErrors,
        formState: { errors },
    } = useForm();
    const setDescription = (val)=> setValue('description', val)

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);

            const blogData = {
                title: data.title,
                slug: data.slug ? data.slug : slugify(data.title, { lower: true, strict: true }),
                description: data.description,
                tags: data.tags ? data.tags.split(",").map(tag => tag.trim()) : [],
                metaTitle: data.metaTitle,
                
                metaDescription: data.metaDescription,
                metaKeywords: metaKeywords ,
                blogImage: imageUrl,
                status: published ? "Published" : "Draft",
            };

            if (id) {
                const res = await BlogServices.updateBlog(id, blogData);
                setIsUpdate(true);
                notifySuccess(res.message);
            } else {
                const res = await BlogServices.addBlog(blogData);
                setIsUpdate(true);
                notifySuccess(res.message);
            }
            setIsSubmitting(false);
            closeDrawer();
        } catch (err) {
            notifyError(err?.response?.data?.message || err?.message);
            setIsSubmitting(false);
            closeDrawer();
        }
    };

    useEffect(() => {
        if (!isDrawerOpen) {
            setValue("title", "");
            setValue("slug", "");
            setValue("description", "");
            setValue("tags", "");
            setValue("metaTitle", "");
            setValue("metaDescription", "");
            setValue("metaKeywords", "");
            setMetaKeywords([])
            setImageUrl("");
            clearErrors();
            return;
        }
        if (id) {
            (async () => {
                try {
                    const res = await BlogServices.getBlogById(id);
                    if (res) {
                        setValue("title", res.title);
                        setValue("slug", res.slug);
                        setValue("description", res.description);
                        setValue("tags", res.tags.join(", "));
                        setValue("metaTitle", res.metaTitle);
                        setMetaKeywords(res.metaKeywords)
                        setValue("metaDescription", res.metaDescription);
                        setValue("metaKeywords", res.metaKeywords);
                        setPublished(res.status === "Published");
                        setImageUrl(res.blogImage);
                    }
                } catch (err) {
                    notifyError(err?.response?.data?.message || err?.message);
                }
            })();
        }
    }, [id, setValue, isDrawerOpen, clearErrors]);

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        setImageUrl,
        imageUrl,
        published,
        setDescription,
        setPublished,
        getValues,
        isSubmitting,
        metaKeywords, setMetaKeywords
    };
};

export default useBlogSubmit;