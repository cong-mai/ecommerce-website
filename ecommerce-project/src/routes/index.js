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
        path: "*",
        page: NotFoundPage
    }

]

export default routes
