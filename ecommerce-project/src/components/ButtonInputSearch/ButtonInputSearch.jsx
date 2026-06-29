import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButtonInputSearch = (props) => {
    const {
        size, placeholder, textButton, bordered,
        backgroundColorInput = 'white',
        backgroundColorButton = 'rgb(13, 92, 182)',
        colorButton = 'white'
    } = props;

    return (
        <div style={{ display: 'flex' }}>
            <InputComponent
                size={size}
                placeholder={placeholder}
                bordered={bordered}
                style={{ backgroundColor: backgroundColorInput, borderRadius: 0 }}
                {...props}
            />
            <ButtonComponent
                size={size}
                styleButton={{ backgroundColor: backgroundColorButton, borderRadius: 0, border: 'none' }}
                icon={<SearchOutlined style={{ color: colorButton }} />}
                textButton={textButton}
                styleTextButton={{ color: colorButton }}
            />
        </div>
    );
};

export default ButtonInputSearch;