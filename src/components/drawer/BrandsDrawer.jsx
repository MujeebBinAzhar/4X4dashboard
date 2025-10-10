import { Input,Textarea} from "@windmill/react-ui";
import { t } from "i18next";
import { Scrollbars } from "react-custom-scrollbars-2";

//internal import
import Title from "@/components/form/others/Title";
import Error from "@/components/form/others/Error";
import InputArea from "@/components/form/input/InputArea";
import InputValue from "@/components/form/input/InputValue";
import LabelArea from "@/components/form/selectOption/LabelArea";
import Uploader from "@/components/image-uploader/Uploader";
import DrawerButton from "@/components/form/button/DrawerButton";
import SwitchToggle from "@/components/form/switch/SwitchToggle";
import SwitchToggleFour from "@/components/form/switch/SwitchToggleFour";
import useBrandSubmit from "@/hooks/useBrandSubmit";

const CouponDrawer = ({ id }) => {
    const {
        register,
        handleSubmit,
        onSubmit,
        errors,
        setImageUrl,
        imageUrl,
        published,
        setPublished,

        isSubmitting,
    } = useBrandSubmit(id);

    return (
        <>
            <div className="w-full relative  p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 ">
                {id ? (
                    <Title
                        register={register}
                        // handleSelectLanguage={handleSelectLanguage}
                        title={t("UpdateBrand")}
                        description={t("UpdateBrandDescription")}
                    />
                ) : (
                    <Title
                        register={register}
                        // handleSelectLanguage={handleSelectLanguage}
                        title={t("AddBrand")}
                        description={t("AddBrandDescription")}
                    />
                )}
            </div>

            <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={'Brands Banner Image'} />
                            <div className="col-span-8 sm:col-span-4">
                                <Uploader
                                    imageUrl={imageUrl}
                                    setImageUrl={setImageUrl}
                                    folder="coupon"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={'Brand Name'} />
                            <div className="col-span-8 sm:col-span-4">
                                <InputArea
                                    required={true}
                                    register={register}
                                    label="Brand name"
                                    name="name"
                                    type="text"
                                    placeholder={'Enter brand name'}
                                />
                                <Error errorName={errors.name} />
                            </div>
                        </div>

                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={'Brand Slug'} />
                            <div className="col-span-8 sm:col-span-4">
                                <InputArea
                                    required={true}
                                    register={register}
                                    label="Brand Slug"
                                    name="slug"
                                    type="text"
                                    placeholder={'Enter Brand slug'}
                                />
                                <Error errorName={errors.slug} />
                            </div>
                        </div>

                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={'Brand Country'} />
                            <div className="col-span-8 sm:col-span-4">
                                <InputArea
                                    required={true}
                                    register={register}
                                    label="Brand Country"
                                    name="country"
                                    type="text"
                                    placeholder={'Enter Brand Country'}
                                />
                                <Error errorName={errors.country} />
                            </div>
                        </div>









                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={t("Published")} />
                            <div className="col-span-8 sm:col-span-4">
                                <SwitchToggle
                                    handleProcess={setPublished}
                                    processOption={published}
                                />
                                <Error errorName={errors.isPublished} />
                            </div>
                        </div>
                    </div>

                    <DrawerButton id={id} title="Coupon" isSubmitting={isSubmitting} />
                </form>
            </Scrollbars>
        </>
    );
};

export default CouponDrawer;
