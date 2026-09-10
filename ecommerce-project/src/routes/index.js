import HomePage from "../pages/HomePage/HomePage"
import OrderPage from "../pages/OrderPage/Orderpage"
import OrderSucess from "../pages/OrderSuccess/OrderSuccess"
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage"
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage"
import SignInPage from "../pages/SignInPage/SignInPage"
import SignUpPage from "../pages/SignUpPage/SignUpPage"
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage"
import ProfilePage from "../pages/Profile/profilePage"
import AdminPage from "../pages/AdminPage/AdminPage"
import PaymentPage from "../pages/PaymentPage/PaymentPage"
import MyOrderPage from "../pages/MyOrder/MyOrder"
import DetailsOrderPage from "../pages/DetailsOrderPage/DetailsOrderPage"
import CustomerSupportPage from "../pages/CustomerSupportPage/CustomerSupportPage"
import HelpCenterPage from "../pages/HelpCenterPage/HelpCenterPage"
import HowToOrderPage from "../pages/HowToOrderPage/HowToOrderPage"
import ReturnPolicyPage from "../pages/ReturnPolicyPage/ReturnPolicyPage"
import TrackOrderPage from "../pages/TrackOrderPage/TrackOrderPage"
import ContactUsPage from "../pages/ContactUsPage/ContactUsPage"
import AboutUsPage from "../pages/AboutUsPage/AboutUsPage"
import AboutCongMaiPage from "../pages/AboutCongMaiPage/AboutCongMaiPage"
import CareersPage from "../pages/CareersPage/CareersPage"
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage/PrivacyPolicyPage"
import TermsOfServicePage from "../pages/TermsOfServicePage/TermsOfServicePage"

const routes = [
    {
        path: "/",
        page: HomePage,
        isShowHeader: true
    },
    {
        path: "/order",
        page: OrderPage,
        isShowHeader: true
    },
    {
        path: '/my-order',
        page: MyOrderPage,
        isShowHeader: true
    },
    {
        path: '/details-order/:id',
        page: DetailsOrderPage,
        isShowHeader: true
    },
    {
        path: "/payment",
        page: PaymentPage,
        isShowHeader: true
    },
    {
        path: '/orderSuccess',
        page: OrderSucess,
        isShowHeader: true
    },
    {
        path: '/my-order',
        page: MyOrderPage,
        isShowHeader: true
    },
    {
        path: "/Product/:type",
        page: TypeProductPage,
        isShowHeader: true
    },
    {
        path: "/Sign-in",
        page: SignInPage,
        isShowHeader: false
    },
    {
        path: "/sign-up",
        page: SignUpPage,
        isShowHeader: false
    },
    {
        path: "/product-details/:id",
        page: ProductDetailsPage,
        isShowHeader: true
    },
    {
        path: "/profile-user",
        page: ProfilePage,
        isShowHeader: true
    },
    {
        path: "/system/admin",
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true
    },
    {
        path: "/support",
        page: CustomerSupportPage,
        isShowHeader: true
    },
    {
        path: "/support/help-center",
        page: HelpCenterPage,
        isShowHeader: true
    },
    {
        path: "/support/how-to-order",
        page: HowToOrderPage,
        isShowHeader: true
    },
    {
        path: "/support/return-policy",
        page: ReturnPolicyPage,
        isShowHeader: true
    },
    {
        path: "/support/track-order",
        page: TrackOrderPage,
        isShowHeader: true
    },
    {
        path: "/support/contact-us",
        page: ContactUsPage,
        isShowHeader: true
    },
    {
        path: "/about",
        page: AboutUsPage,
        isShowHeader: true
    },
    {
        path: "/about/cong-mai",
        page: AboutCongMaiPage,
        isShowHeader: true
    },
    {
        path: "/careers",
        page: CareersPage,
        isShowHeader: true
    },
    {
        path: "/privacy-policy",
        page: PrivacyPolicyPage,
        isShowHeader: true
    },
    {
        path: "/terms-of-service",
        page: TermsOfServicePage,
        isShowHeader: true
    },
    {
        path: "*",
        page: NotFoundPage
    }

]

export default routes
