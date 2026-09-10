import React from 'react'
import { Link } from 'react-router-dom'
import SupportLayout from '../../components/SupportLayout/SupportLayout'
import { Steps, Step, StepTitle, StepBody } from './style'

const navLinks = [
    { to: '/support/track-order', label: 'Track my order' },
    { to: '/support/return-policy', label: 'Return policy' },
    { to: '/support/contact-us', label: 'Contact us' },
    { to: '/support/help-center', label: 'Help center' },
]

const HowToOrderPage = () => {
    return (
        <SupportLayout
            backTo="/support"
            backLabel="← Customer support"
            title="How to order"
            intro="Five steps from browsing to your doorstep."
            navLinks={navLinks}
        >
            <Steps>
                <Step>
                    <div>
                        <StepTitle>Find your product</StepTitle>
                        <StepBody>
                            Browse by category or use search to find a specific phone, laptop, or accessory.
                            Each product page shows live stock and price.
                        </StepBody>
                    </div>
                </Step>
                <Step>
                    <div>
                        <StepTitle>Add it to your cart</StepTitle>
                        <StepBody>
                            Choose a quantity and add the item to your cart. You can keep browsing and add more
                            items before checking out.
                        </StepBody>
                    </div>
                </Step>
                <Step>
                    <div>
                        <StepTitle>Review your cart</StepTitle>
                        <StepBody>
                            Open your cart to check items, quantities, and the subtotal. Remove or adjust
                            anything before moving on.
                        </StepBody>
                    </div>
                </Step>
                <Step>
                    <div>
                        <StepTitle>Check out</StepTitle>
                        <StepBody>
                            Confirm your delivery address, choose cash on delivery or PayPal, and place your
                            order. Delivery is free on orders of $50 or more.
                        </StepBody>
                    </div>
                </Step>
                <Step>
                    <div>
                        <StepTitle>Track it</StepTitle>
                        <StepBody>
                            Your order appears immediately under <Link to="/my-order">My orders</Link>, where you
                            can follow its status until it arrives.
                        </StepBody>
                    </div>
                </Step>
            </Steps>
        </SupportLayout>
    )
}

export default HowToOrderPage
