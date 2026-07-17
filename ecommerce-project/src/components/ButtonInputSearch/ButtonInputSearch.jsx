import React, { useState } from "react";
import { AutoComplete } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as ProductService from "../../services/ProductService";
import { useDebounce } from "../../hooks/useDebounce";

const useSuggestions = (rawText) => {
    const [options, setOptions] = useState([])
    const debouncedText = useDebounce(rawText, 400)

    React.useEffect(() => {
        let ignore = false
        const fetchSuggestions = async () => {
            const trimmed = debouncedText?.trim() || ''
            if (trimmed.length === 0) {
                setOptions([])
                return
            }
            try {
                // Semantic search needs a couple of characters to have signal; a single
                // character falls back to a plain name-prefix match so the dropdown
                // still responds instantly instead of returning noisy AI results.
                const res = trimmed.length === 1
                    ? await ProductService.getAllProduct(trimmed, 5)
                    : await ProductService.searchSemantic(trimmed, 5)
                if (!ignore && res?.status === 'OK') {
                    setOptions(res.data.map((product) => ({
                        value: product.name,
                        product
                    })))
                }
            } catch (e) {
                if (!ignore) setOptions([])
            }
        }
        fetchSuggestions()
        return () => { ignore = true }
    }, [debouncedText])

    return options
}

const ButtonInputSearch = (props) => {
    const {
        size, placeholder, textButton, bordered,
        backgroundColorInput = 'var(--color-white)',
        backgroundColorButton = 'var(--color-primary-hover)',
        colorButton = 'var(--color-white)',
        onChange
    } = props;

    const navigate = useNavigate()
    const [text, setText] = useState('')
    const [focused, setFocused] = useState(false)
    const suggestions = useSuggestions(text)

    const options = suggestions.map(({ value, product }) => ({
        value,
        label: (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img src={product.image} alt={product.name} style={{ width: 32, height: 32, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                <div style={{ overflow: 'hidden' }}>
                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</div>
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>${product.price}</div>
                </div>
            </div>
        ),
        product
    }))

    const handleChange = (value) => {
        setText(value)
    }

    const handleSubmit = () => {
        onChange && onChange({ target: { value: text } })
    }

    const handleSelect = (value, option) => {
        if (option?.product?._id) {
            navigate(`/product-details/${option.product._id}`)
        }
        setText('')
        setFocused(false)
    }

    const handleFocus = () => {
        setFocused(true)
    }

    const handleBlur = () => {
        // Delay closing so a click on a dropdown option has time to register
        // as a select before the popup unmounts.
        setTimeout(() => setFocused(false), 150)
    }

    return (
        <div style={{ display: 'flex', flex: 1 }}>
            <AutoComplete
                style={{ flex: 1 }}
                options={options}
                open={focused && options.length > 0}
                value={text}
                onChange={handleChange}
                onSelect={handleSelect}
                popupMatchSelectWidth={true}
            >
                <InputComponent
                    size={size}
                    placeholder={placeholder}
                    bordered={bordered}
                    style={{ backgroundColor: backgroundColorInput, borderRadius: 0, paddingBottom: "8px" }}
                    onPressEnter={handleSubmit}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </AutoComplete>
            <ButtonComponent
                size={size}
                styleButton={{ backgroundColor: backgroundColorButton, borderRadius: 0, border: 'none' }}
                icon={<SearchOutlined style={{ color: colorButton }} />}
                textButton={textButton}
                styleTextButton={{ color: colorButton }}
                onClick={handleSubmit}
            />
        </div>
    );
};

export default ButtonInputSearch;
