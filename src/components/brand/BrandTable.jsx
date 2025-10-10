import {
    Avatar,
    Badge,
    TableBody,
    TableCell,
    TableRow,
} from "@windmill/react-ui";
import { useEffect, useState } from "react";

// Internal imports
import useUtilsFunction from "@/hooks/useUtilsFunction";
import CheckBox from "@/components/form/others/CheckBox";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import DeleteModal from "@/components/modal/DeleteModal";
import MainDrawer from "@/components/drawer/MainDrawer";
import BrandDrawer from "@/components/drawer/BrandsDrawer"; // Updated drawer for brands
import ShowHideButton from "@/components/table/ShowHideButton";
import EditDeleteButton from "@/components/table/EditDeleteButton";

const BrandTable = ({ isCheck, brands, setIsCheck }) => {
    const [updatedBrands, setUpdatedBrands] = useState([]);

    const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

    const { currency, showDateFormat, globalSetting, showingTranslateValue } =
        useUtilsFunction();

    const handleClick = (e) => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== id));
        }
    };

    useEffect(() => {
        const result = brands?.map((el) => {
            const newDate = new Date(el?.updatedAt).toLocaleString("en-US", {
                timeZone: globalSetting?.default_time_zone,
            });
            const newObj = {
                ...el,
                updatedDate: newDate,
            };
            return newObj;
        });
        setUpdatedBrands(result);
    }, [brands, globalSetting?.default_time_zone]);

    return (
        <>
            {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}

            {isCheck.length < 2 && (
                <MainDrawer>
                    <BrandDrawer id={serviceId} />
                </MainDrawer>
            )}

            <TableBody>
                {updatedBrands?.map((brand, i) => (
                    <TableRow key={i + 1}>
                        <TableCell>
                            <CheckBox
                                type="checkbox"
                                name={brand?.name}
                                id={brand._id}
                                handleClick={handleClick}
                                isChecked={isCheck?.includes(brand._id)}
                            />
                        </TableCell>

                        <TableCell>
                            <div className="flex items-center">
                                {brand?.image ? (
                                    <Avatar
                                        className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                                        src={brand?.image}
                                        alt="brand"
                                    />
                                ) : (
                                    <Avatar
                                        src={`https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png`}
                                        alt="brand"
                                    />
                                )}

                            </div>
                        </TableCell>
                        <TableCell>
                            <span className="text-sm">{brand?.name}</span>
                        </TableCell>
                        <TableCell>
                            <span className="text-sm">{brand?.slug}</span>
                        </TableCell>

                        {brand?.country && (
                            <TableCell>
                                <span className="text-sm">{brand?.country}</span>
                            </TableCell>
                        )}

                        <TableCell className="text-center">
                            <ShowHideButton id={brand._id} status={brand.isPublished} />
                        </TableCell>





                        <TableCell>
                            <EditDeleteButton
                                id={brand?._id}
                                isCheck={isCheck}
                                handleUpdate={handleUpdate}
                                handleModalOpen={handleModalOpen}
                                title={brand?.name}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </>
    );
};

export default BrandTable;
