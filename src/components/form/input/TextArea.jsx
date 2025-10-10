import { Textarea } from "@windmill/react-ui";

const TextArea = ({
    name,
    label,
    register,
    required,
    placeholder,
    rows = 3,
    disabled = false,
}) => {
    const validation = {
        required: required ? `${label} is required!` : false,
    };

    return (
        <>
            <Textarea
                {...register(`${name}`, validation)}
                name={name}
                disabled={disabled}
                placeholder={placeholder}
                rows={rows}
                className="mr-2 p-2"
            />
        </>
    );
};

export default TextArea;

