import Slider from "react-slick";
import styled from "styled-components";

export const WrapperSliderStyle = styled(Slider)`
    & .slick-arrow.slick-prev {
        left: 12px;
        top: 50%;
        z-index: 10;
        &::before {
            font-size: var(--font-size-3xl);
            color: var(--color-white);
        }
    }
    & .slick-arrow.slick-next {
        right: 28px;
        top: 50%;
        z-index: 10;
        &::before {
            font-size: var(--font-size-3xl);
            color: var(--color-white);
        }
    }
    & .slick-dots {
        z-index: 10;
        bottom: -2px !important;
        li {
            button {
                &::before {
                    color: rgba(255, 255, 255, 0.5);
                }
            }
        }
        li.active {
            button {
                &::before {
                    color: var(--color-white);
                }
            }
        }
    }
`

export const HeroSlide = styled.div`
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    min-height: 280px;
    padding: 28px 56px;
    overflow: hidden;
    background: ${(props) => props.$background || 'linear-gradient(135deg, #1a94ff 0%, #0d5cb6 100%)'};

    &::before {
        content: '';
        position: absolute;
        top: -70px;
        right: -40px;
        width: 220px;
        height: 220px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.08);
    }
    &::after {
        content: '';
        position: absolute;
        bottom: -90px;
        right: 140px;
        width: 170px;
        height: 170px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.06);
    }

    @media (max-width: 768px) {
        min-height: 220px;
        padding: 22px 32px;
    }
    @media (max-width: 480px) {
        min-height: 180px;
        padding: 18px 24px;
    }
`

export const HeroSlideText = styled.div`
    position: relative;
    z-index: 1;
    max-width: 460px;
`

export const HeroSlideEyebrow = styled.div`
    font-size: var(--font-size-xs);
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.85);
    margin-bottom: 8px;
`

export const HeroSlideTitle = styled.h2`
    font-size: var(--font-size-3xl);
    font-weight: 800;
    color: var(--color-white);
    margin: 0 0 8px;
    line-height: 1.15;

    @media (max-width: 768px) {
        font-size: var(--font-size-xl);
    }
    @media (max-width: 480px) {
        font-size: var(--font-size-lg);
    }
`

export const HeroSlideSubtitle = styled.p`
    font-size: var(--font-size-base);
    color: rgba(255, 255, 255, 0.9);
    margin: 0 0 20px;

    @media (max-width: 480px) {
        display: none;
    }
`

export const HeroSlideButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--color-white);
    color: var(--color-primary-hover);
    border: none;
    border-radius: var(--radius-sm);
    padding: 10px 22px;
    font-size: var(--font-size-sm);
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
    }
`

export const HeroSlideImage = styled.img`
    position: relative;
    z-index: 1;
    height: 220px;
    width: auto;
    max-width: 42%;
    object-fit: contain;
    filter: drop-shadow(0 14px 20px rgba(0, 0, 0, 0.25));

    @media (max-width: 768px) {
        height: 160px;
    }
    @media (max-width: 480px) {
        display: none;
    }
`

export const HeroSlideIcon = styled.div`
    position: relative;
    z-index: 1;
    font-size: 96px;
    color: rgba(255, 255, 255, 0.9);
    display: flex;

    @media (max-width: 768px) {
        font-size: 72px;
    }
    @media (max-width: 480px) {
        display: none;
    }
`