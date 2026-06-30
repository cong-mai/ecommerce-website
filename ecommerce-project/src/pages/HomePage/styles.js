import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: ce
    gap: 16px;
    justify-content: flex-start;
    height: 44px;
    overflow-x: auto;
    &::-webkit-scrollbar { display: none; }
`

export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover {
        color: #fff;
        background: rgb(13, 92, 182);
        span { color: #fff; }
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