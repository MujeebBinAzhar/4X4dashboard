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
import ShowHideButton from "@/components/table/ShowHideButton";
import EditDeleteButton from "@/components/table/EditDeleteButton";

const ReviewTable = ({ isCheck, review, setIsCheck }) => {
        const [updatedReviews, setUpdatedReviews] = useState([]);

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
                const result = review?.map((el) => {
                        const newDate = new Date(el?.updatedAt).toLocaleString("en-US", {
                                timeZone: globalSetting?.default_time_zone,
                        });
                        const newObj = {
                                ...el,
                                updatedDate: newDate,
                        };
                        return newObj;
                });
                setUpdatedReviews(result);
        }, [review, globalSetting?.default_time_zone]);

        return (
                <>
                        {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}



                        <TableBody>
                                {updatedReviews?.map((review, i) => (
                                        <TableRow key={i + 1}>
                                                <TableCell>
                                                        <CheckBox
                                                                type="checkbox"
                                                                name={review?.name}
                                                                id={review._id}
                                                                handleClick={handleClick}
                                                                isChecked={isCheck?.includes(review._id)}
                                                        />
                                                </TableCell>


                                                <TableCell>
                                                        <div className="text-sm max-w-[150px] break-words whitespace-normal">
                                                                {review?.name}
                                                        </div>
                                                </TableCell>
                                                <TableCell>
                                                        <div className="text-sm">{review?.email}</div>
                                                </TableCell>
                                                <TableCell>
                                                        <div className="text-sm max-w-[250px] break-words whitespace-normal">
                                                                {review?.comment}
                                                        </div>
                                                </TableCell>
                                                <TableCell>
                                                        <div className="text-sm">{review?.rating}</div>
                                                </TableCell>



                                                <TableCell className="text-center">
                                                        <ShowHideButton id={review._id} status={review.status === 'approved' ? 'show' : 'hide'} />
                                                </TableCell>








                                        </TableRow>
                                ))}
                        </TableBody>
                </>
        );
};

export default ReviewTable;
