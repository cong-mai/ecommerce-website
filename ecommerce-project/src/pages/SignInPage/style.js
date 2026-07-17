import styled from "styled-components";

export const WrapperContainerLogin = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.53);
    min-height: 100vh;
    padding: 20px;
    box-sizing: border-box;
`

export const WrapperCard = styled.div`
    width: 800px;
    max-width: 100%;
    min-height: 445px;
    border-radius: var(--radius-sm);
    background: var(--color-white);
    display: flex;
    overflow: hidden;

    @media (max-width: 600px) {
        flex-direction: column;
        min-height: auto;
    }
`

export const WrapperContainerLeft = styled.div`
    flex: 1;
    padding: 40px 45px 24px;
    display: flex;
    flex-direction: column;

    @media (max-width: 600px) {
        padding: 28px 24px 20px;
    }
`

export const WrapperContainerRight = styled.div`
    width: 300px;
    background: linear-gradient(136deg, rgb(240, 248, 255) -1%, rgb(219, 238, 255) 85%);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 4px;

    @media (max-width: 600px) {
        width: 100%;
        padding: 20px 0;
    }
`
export const WrapperTextLight = styled.span`
    color: var(--color-primary-hover);
    font-size: var(--font-size-sm);
    cursor: pointer;
`