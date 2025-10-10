import { t } from "i18next";
import { Scrollbars } from "react-custom-scrollbars-2";
import ReactTagInput from "@pathofdev/react-tag-input";
import { Input,Textarea} from "@windmill/react-ui";
// Internal imports
import Title from "@/components/form/others/Title";
import Error from "@/components/form/others/Error";
import InputArea from "@/components/form/input/InputArea";
import LabelArea from "@/components/form/selectOption/LabelArea";
import Uploader from "@/components/image-uploader/Uploader";
import DrawerButton from "@/components/form/button/DrawerButton";
import SwitchToggle from "@/components/form/switch/SwitchToggle";
import useBlogSubmit from "@/hooks/useBlogSubmit";
import ReactQuill from 'react-quill';



const BlogDrawer = ({ id }) => {
    const {
        register,
        handleSubmit,
        onSubmit,
        errors,
        getValues,
        setImageUrl,
        imageUrl,
        published,
        setDescription,
        setPublished,
        isSubmitting,
        metaKeywords, setMetaKeywords
    } = useBlogSubmit(id);
   

    return (
        <>
            <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                {id ? (
                    <Title title={t("UpdateBlog")} description={t("UpdateBlogDescription")} />
                ) : (
                    <Title title={t("AddBlog")} description={t("AddBlogDescription")} />
                )}
            </div>

            <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={'Blog Image'} />
                            <div className="col-span-8 sm:col-span-4">
                                <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} folder="blog" />
                            </div>
                        </div>

                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={'Blog Title'} />
                            <div className="col-span-8 sm:col-span-4">
                                <InputArea register={register} label="Title" name="title" required placeholder={'Enter blog title'} />
                                <Error errorName={errors.title} />
                            </div>
                        </div>

                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={'Blog Slug'} />
                            <div className="col-span-8 sm:col-span-4">
                                <InputArea register={register} label="Slug" name="slug" placeholder={'Enter blog slug (optional)'} />
                                <Error errorName={errors.slug} />
                            </div>
                        </div>

                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={'Blog Description'} />
                            <div className="col-span-8 sm:col-span-4">
                      
<ReactQuill theme="snow" value={getValues('description')} onChange={(val)=>setDescription(val)}/>
                                <Error errorName={errors.description} />
                            </div>
                        </div>

                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={'Tags'} />
                            <div className="col-span-8 sm:col-span-4">
                                <InputArea register={register} label="Tags" name="tags" placeholder={'Enter tags, separated by commas'} />
                                <Error errorName={errors.tags} />
                            </div>
                        </div>

                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={t("Published")} />
                            <div className="col-span-8 sm:col-span-4">
                                <SwitchToggle handleProcess={setPublished} processOption={published} />
                                <Error errorName={errors.status} />
                            </div>
                        </div>

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
                    <DrawerButton id={id} title="Blog" isSubmitting={isSubmitting} />
                </form>
            </Scrollbars>
        </>
    );
};

export default BlogDrawer;
