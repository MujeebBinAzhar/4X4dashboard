import { useTranslation } from "react-i18next";
import { Button, Select } from "@windmill/react-ui";
import { FiPackage, FiAlertTriangle } from "react-icons/fi";

//internal import
import Error from "@/components/form/others/Error";
import PageTitle from "@/components/Typography/PageTitle";
import useStockManagementSettingSubmit from "@/hooks/useStockManagementSettingSubmit";
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import InputAreaTwo from "@/components/form/input/InputAreaTwo";
import TextArea from "@/components/form/input/TextArea";
import AnimatedContent from "@/components/common/AnimatedContent";

const StockManagementSetting = () => {
    const { errors, register, isSave, isSubmitting, onSubmit, handleSubmit } =
        useStockManagementSettingSubmit();

    const { t } = useTranslation();

    return (
        <>
            <PageTitle>Stock Management Settings</PageTitle>
            <AnimatedContent>
                <div className="sm:container md:p-6 p-4 w-full mx-auto bg-white dark:bg-gray-800 dark:text-gray-200 rounded-lg">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-12 font-sans">
                            <div className="col-span-12 md:col-span-12 lg:col-span-12 mr-3">
                                <div className="lg:px-6 pt-4 lg:pl-40 lg:pr-40 md:pl-5 md:pr-5 flex-grow scrollbar-hide w-full max-h-full pb-0">

                                    {/* Stock Thresholds Section */}
                                    <div className="inline-flex md:text-lg text-md text-gray-800 font-semibold dark:text-gray-400 md:mb-3 mb-1">
                                        <FiPackage className="mt-1 mr-2" />
                                        Stock Thresholds
                                    </div>
                                    <hr className="md:mb-8 mb-3" />

                                    <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                        <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:col-span-2">
                                            Low Stock Threshold
                                        </label>
                                        <div className="sm:col-span-3">
                                            <InputAreaTwo
                                                required={true}
                                                register={register}
                                                label="Low Stock Threshold"
                                                name="low_stock_threshold"
                                                type="number"
                                                placeholder="20"
                                                minValue={0}
                                            />
                                            <Error errorName={errors.low_stock_threshold} />
                                            <p className="text-xs text-gray-500 mt-1">
                                                Products with stock at or below this number will be marked as "Low Stock"
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                        <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:col-span-2">
                                            High Stock Threshold
                                        </label>
                                        <div className="sm:col-span-3">
                                            <InputAreaTwo
                                                required={true}
                                                register={register}
                                                label="High Stock Threshold"
                                                name="high_stock_threshold"
                                                type="number"
                                                placeholder="40"
                                                minValue={0}
                                            />
                                            <Error errorName={errors.high_stock_threshold} />
                                            <p className="text-xs text-gray-500 mt-1">
                                                Products with stock at or above this number will be marked as "High Stock"
                                            </p>
                                        </div>
                                    </div>

                                    {/* Backorder Settings Section */}
                                    <div className="inline-flex md:text-lg text-md text-gray-800 font-semibold dark:text-gray-400 md:mb-3 mb-1 mt-8">
                                        <FiAlertTriangle className="mt-1 mr-2" />
                                        Backorder Settings
                                    </div>
                                    <hr className="md:mb-8 mb-3" />

                                    <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                        <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:col-span-2">
                                            Enable Backorder
                                        </label>
                                        <div className="sm:col-span-3">
                                            <Select
                                                {...register("enable_backorder", {
                                                    required: "Backorder setting is required",
                                                })}
                                            >
                                                <option value="false">Disabled</option>
                                                <option value="true">Enabled</option>
                                            </Select>
                                            <Error errorName={errors.enable_backorder} />
                                            <p className="text-xs text-gray-500 mt-1">
                                                Allow negative stock quantities for backorders
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                        <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:col-span-2">
                                            Show Stock Warnings on Checkout
                                        </label>
                                        <div className="sm:col-span-3">
                                            <Select
                                                {...register("show_stock_warnings_checkout", {
                                                    required: "Checkout warning setting is required",
                                                })}
                                            >
                                                <option value="true">Enabled</option>
                                                <option value="false">Disabled</option>
                                            </Select>
                                            <Error errorName={errors.show_stock_warnings_checkout} />
                                            <p className="text-xs text-gray-500 mt-1">
                                                Display stock warnings during checkout process
                                            </p>
                                        </div>
                                    </div>

                                    {/* Custom Warning Message Section */}
                                    <div className="inline-flex md:text-lg text-md text-gray-800 font-semibold dark:text-gray-400 md:mb-3 mb-1 mt-8">
                                        <FiAlertTriangle className="mt-1 mr-2" />
                                        Custom Warning Messages
                                    </div>
                                    <hr className="md:mb-8 mb-3" />

                                    <div className="grid md:grid-cols-5 items-start sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                        <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:col-span-2">
                                            Low Stock Warning Message
                                        </label>
                                        <div className="sm:col-span-3">
                                            <TextArea
                                                required={true}
                                                register={register}
                                                label="Custom Warning Message"
                                                name="custom_warning_message"
                                                placeholder="This item could be out of stock. Product Quantity is either 0 or below 0. If it is, we will contact you after your order is placed. Alternately, please contact us to check current stock levels."
                                                rows={4}
                                            />
                                            <Error errorName={errors.custom_warning_message} />
                                            <p className="text-xs text-gray-500 mt-1">
                                                This message will be displayed to customers when viewing low stock or backorder items
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-row-reverse pb-6">
                                        {isSubmitting ? (
                                            <Button disabled={true} type="button" className="h-12">
                                                <img
                                                    src={spinnerLoadingImage}
                                                    alt="Loading"
                                                    width={20}
                                                    height={10}
                                                />{" "}
                                                <span className="font-serif ml-2 font-light">
                                                    Processing
                                                </span>
                                            </Button>
                                        ) : (
                                            <Button type="submit" className="h-12 px-8">
                                                {isSave ? "Save" : "Update"}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </AnimatedContent>
        </>
    );
};

export default StockManagementSetting;

