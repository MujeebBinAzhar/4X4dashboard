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
import BlogDrawer from "@/components/drawer/BlogsDrawer";
import ShowHideButton from "@/components/table/ShowHideButton";
import EditDeleteButton from "@/components/table/EditDeleteButton";

const BlogTable = ({ isCheck, blogs, setIsCheck }) => {
    const [updatedBlogs, setUpdatedBlogs] = useState([]);

    const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

    const { showDateFormat, globalSetting } = useUtilsFunction();

    const handleClick = (e) => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== id));
        }
    };

    useEffect(() => {
        const result = blogs?.map((el) => {
            const newDate = new Date(el?.updatedAt).toLocaleString("en-US", {
                timeZone: globalSetting?.default_time_zone,
            });
            return {
                ...el,
                updatedDate: newDate,
            };
        });
        setUpdatedBlogs(result);
    }, [blogs, globalSetting?.default_time_zone]);
function sanitizeText(input) {
    if (typeof input !== "string") return "";
    
    // Remove HTML tags using regex
    return input.replace(/<[^>]*>/g, "").trim();
}

    return (
        <>
            {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}

            {isCheck.length < 2 && (
                <MainDrawer>
                    <BlogDrawer id={serviceId} />
                </MainDrawer>
            )}

            <TableBody>
                {updatedBlogs?.map((blog, i) => (
                    <TableRow key={i + 1}>
                        <TableCell>
                            <CheckBox
                                type="checkbox"
                                name={blog?.title}
                                id={blog._id}
                                handleClick={handleClick}
                                isChecked={isCheck?.includes(blog._id)}
                            />
                        </TableCell>

                        <TableCell>
                            <div className="flex items-center">
                                {blog?.blogImage ? (
                                    <Avatar
                                        className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                                        src={blog?.blogImage}
                                        alt="blog"
                                    />
                                ) : (
                                    <Avatar
                                        src={`https://via.placeholder.com/150`}
                                        alt="blog"
                                    />
                                )}
                            </div>
                        </TableCell>
                        <TableCell>
                            <span className="text-sm">{blog?.title}</span>
                        </TableCell>
                        <TableCell>
                            <span className="text-sm">{blog?.slug}</span>
                        </TableCell>
                        <TableCell>
                            <span className="text-sm">{sanitizeText(blog?.description).slice(0,50)}...</span>
                        </TableCell>
                        <TableCell className="text-center">
                            <ShowHideButton id={blog._id} status={blog.status === 'Published' ? 'show' :'hide'} />
                        </TableCell>
                        <TableCell>
                            <EditDeleteButton
                                id={blog?._id}
                                isCheck={isCheck}
                                handleUpdate={handleUpdate}
                                handleModalOpen={handleModalOpen}
                                title={blog?.title}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </>
    );
};

export default BlogTable;
