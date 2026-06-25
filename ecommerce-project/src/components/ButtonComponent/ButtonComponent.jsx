import React from "react";
import { Button } from "antd";

const ButtonComponent = ({size, styleButton, styleTextButton, textButton, ...rest}) => {
  return (
    <Button 
            size={size} 
            // icon={<SearchOutlined style={{color: colorButton}} />}
            // bordered={bordered} 
            style={styleButton}
            {...rest}
    >
               
        <span style={styleTextButton}>{textButton}</span>

    </Button>
  );
}

export default ButtonComponent;