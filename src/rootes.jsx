import Home from "./components/Home/Home";
import MainHome from "./components/admin/admin home/MainHome";
import Admin from "./components/admin/Admin/Admin";
import Contact from "./components/contact/Contact";
import LoginAdmin from "./components/login/LoginAdmin";
import CategoryInfo from "./components/admin/category-info/CategoryInfo";
import AddCategory from "./components/admin/add-category/AddCategory";
import AddSubCategory from "./components/admin/add-subcategory/AddSubCategory";
import AddAdvert from "./components/admin/add-advert/AddAdvert";
import AddProduct from "./components/admin/add-products/AddProduct";
import Clients from "./components/admin/clients/Clients";
import Partners from "./components/admin/partners/Partners";
import ChangePassword from "./components/admin/change-password/ChangePassword";
import AboutUsAdmin from "./components/admin/about-us/AboutUsAdmin";
import AboutUs from "./components/aboutUs/AboutUs";
import Catalogs from "./components/catalog/Catalogs";
import Product from "./components/more-info/Product";
import HomeImage from "./components/admin/home-image/HomeImage";
import HomeImageMobile from "./components/admin/mobile-images/HomeImageMobile";

export const publicRoutes = [
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/contact",
        element: <Contact/>
    },
    {
        path: "/about-us",
        element: <AboutUs/>
    },
    {
        path: "/product-info",
        element: <Product/>
    },
    {
        path: "/catalogs",
        element: <Catalogs/>
    },
    {
        path: "/login-admin-gtech",
        element: <LoginAdmin/>
    }

];

export const adminRoutes = [
    {
        path: "/*",
        element: <Admin/>
    },
];

export const adminPageRoutes = [
    {
        path: "/",
        element: <MainHome/>
    },
    {
        path: "/category-info",
        element: <CategoryInfo/>
    },
    {
        path: "/mobile-image",
        element: <HomeImageMobile/>
    },
    {
        path: "/add-category",
        element: <AddCategory/>
    },
    {
        path: "/add-subcategory",
        element: <AddSubCategory/>
    },
    {
        path: "/add-advert",
        element: <AddAdvert/>
    },
    {
        path: "/add-product",
        element: <AddProduct/>
    },
    {
        path: "/home-image",
        element: <HomeImage/>
    },
    {
        path: "/change-password",
        element: <ChangePassword/>
    },
    {
        path: "/clients",
        element: <Clients/>
    },
    {
        path: "/partners",
        element: <Partners/>
    },
    {
        path: "/about-us",
        element: <AboutUsAdmin/>
    },
];