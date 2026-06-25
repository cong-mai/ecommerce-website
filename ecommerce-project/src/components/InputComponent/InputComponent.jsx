import React from "react";  
import { Input } from "antd";

const InputComponent = ({ size, placeholder, bordered, style, ...rests }) => {
  const variant = bordered === false ? 'borderless' : 'outlined';
  return (
    <Input
            size={size}
            placeholder={placeholder}
            variant={variant}
            style={style}
            {...rests}
        />
    );
};

export default InputComponent;