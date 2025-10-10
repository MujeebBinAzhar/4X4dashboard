import {
        Button,
        Card,
        CardBody,
        Input,
        Pagination,
        Table,
        TableCell,
        TableContainer,
        TableFooter,
        TableHeader,
} from "@windmill/react-ui";
import { useContext, useState } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { useTranslation } from "react-i18next";

//internal import
import { SidebarContext } from "@/context/SidebarContext";
import useAsync from "@/hooks/useAsync";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import useFilter from "@/hooks/useFilter";
import PageTitle from "@/components/Typography/PageTitle";
import DeleteModal from "@/components/modal/DeleteModal";
import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
import TableLoading from "@/components/preloader/TableLoading";
import CheckBox from "@/components/form/others/CheckBox";
import NotFound from "@/components/table/NotFound";
import UploadMany from "@/components/common/UploadMany";
import AnimatedContent from "@/components/common/AnimatedContent";
import ReviewServices from "@/services/ReviewServices";
import ReviewTable from "@/components/review/ReviewTable";

const Brands = () => {
        const { t } = useTranslation();
        const { lang } = useContext(SidebarContext);
        const { data, loading, error } = useAsync(ReviewServices.getAllReviews);
        const [isCheckAll, setIsCheckAll] = useState(false);
        const [isCheck, setIsCheck] = useState([]);

        const { allId, handleDeleteMany, handleUpdateMany } =
                useToggleDrawer();

        const {
                filename,
                isDisabled,
                dataTable,
                serviceData,
                totalResults,
                resultsPerPage,
                handleChangePage,
                handleSelectFile,
                handleSubmitCoupon,
                handleUploadMultiple,
                handleRemoveSelectFile,
        } = useFilter(data);

        const handleSelectAll = () => {
                setIsCheckAll(!isCheckAll);
                setIsCheck(data?.map((li) => li._id));
                if (isCheckAll) {
                        setIsCheck([]);
                }
        };



        return (
                <>
                        <PageTitle>Product Reviews</PageTitle>
                        <DeleteModal
                                ids={allId}
                                setIsCheck={setIsCheck}
                                title="Selected Reviews"
                        />


                        <AnimatedContent>
                                <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
                                        <CardBody>
                                                <form
                                                        onSubmit={handleSubmitCoupon}
                                                        className="py-3 grid gap-4 lg:gap-6 xl:gap-6  xl:flex"
                                                >
                                                        <div className="flex justify-start xl:w-1/2  md:w-full">
                                                                <UploadMany
                                                                        title="Reviews"
                                                                        exportData={data}
                                                                        filename={filename}
                                                                        isDisabled={isDisabled}
                                                                        handleSelectFile={handleSelectFile}
                                                                        handleUploadMultiple={handleUploadMultiple}
                                                                        handleRemoveSelectFile={handleRemoveSelectFile}
                                                                />
                                                        </div>

                                                        <div className="lg:flex  md:flex xl:justify-end xl:w-1/2  md:w-full md:justify-start flex-grow-0">
                                                                {/* <div className="w-full md:w-40 lg:w-40 xl:w-40 mr-3 mb-3 lg:mb-0">
                                                                        <Button
                                                                                disabled={isCheck.length < 1}
                                                                                onClick={() => handleUpdateMany(isCheck)}
                                                                                className="w-full rounded-md h-12 btn-gray text-gray-600"
                                                                        >
                                                                                <span className="mr-2">
                                                                                        <FiEdit />
                                                                                </span>
                                                                                {t("BulkAction")}
                                                                        </Button>
                                                                </div> */}

                                                                <div className="w-full md:w-32 lg:w-32 xl:w-32 mr-3 mb-3 lg:mb-0">
                                                                        <Button
                                                                                disabled={isCheck.length < 1}
                                                                                onClick={() => handleDeleteMany(isCheck)}
                                                                                className="w-full rounded-md h-12 bg-red-500 btn-red"
                                                                        >
                                                                                <span className="mr-2">
                                                                                        <FiTrash2 />
                                                                                </span>

                                                                                {t("Delete")}
                                                                        </Button>
                                                                </div>


                                                        </div>
                                                </form>
                                        </CardBody>
                                </Card>


                        </AnimatedContent>

                        {loading ? (
                                // <Loading loading={loading} />
                                <TableLoading row={12} col={8} width={140} height={20} />
                        ) : error ? (
                                <span className="text-center mx-auto text-red-500">{error}</span>
                        ) : serviceData?.length !== 0 ? (
                                <TableContainer className="mb-8 overflow-hidden">
                                        <Table className="overflow-hidden w-full">
                                                <TableHeader>
                                                        <tr>
                                                                <TableCell>
                                                                        <CheckBox
                                                                                type="checkbox"
                                                                                name="selectAll"
                                                                                id="selectAll"
                                                                                handleClick={handleSelectAll}
                                                                                isChecked={isCheckAll}
                                                                        />
                                                                </TableCell>
                                                                <TableCell>{t("Name")}</TableCell>
                                                                <TableCell>{t("Email")}</TableCell>

                                                                <TableCell>{t("Review Content")}</TableCell>


                                                                <TableCell>{t("Review Rating")}</TableCell>
                                                                <TableCell className="text-center">{t("Published")}</TableCell>

                                                        </tr>
                                                </TableHeader>
                                                <ReviewTable
                                                        lang={lang}
                                                        isCheck={isCheck}
                                                        review={dataTable}
                                                        setIsCheck={setIsCheck}
                                                />
                                        </Table>
                                        <TableFooter>
                                                <Pagination
                                                        totalResults={totalResults}
                                                        resultsPerPage={resultsPerPage}
                                                        onChange={handleChangePage}
                                                        label="Table navigation"
                                                />
                                        </TableFooter>
                                </TableContainer>
                        ) : (
                                <NotFound title="Sorry, There are no  brands right now." />
                        )}
                </>
        );
};

export default Brands;
