import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    justify-content: flex-start;
    height: auto;
    padding: 12px 0;
    overflow-x: auto;
    &::-webkit-scrollbar { display: none; }
`

export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover {
        color: var(--color-white);
        background: var(--color-primary-hover);
        span { color: var(--color-white); }
    }
    width: 100%;
    text-align: center;
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
`

export const WrapperProducts = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-top: 20px;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 900px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 600px) {
        grid-template-columns: repeat(2, 1fr);
    }
`   