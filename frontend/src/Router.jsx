/* Importing All Routes And Components Here...*/
import Layouts from "./layouts/Layouts";
import { Islogin } from "./auth/Auth";
import Home from "./pages/Home";
import NotFound from "./components/404";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Latestproduct from "./components/Latestproduct"
import Cart from "./components/Cart"
/* Import Admin Routes Here */
import Dashboard from "./admin/components/Dashboard";
import AddProduct from "./admin/components/AddProduct";
import EditProduct from "./admin/components/EditProduct";
import AllProducts from "./admin/components/AllProducts";
const MyRoutes = [
    {
        path: "/",
        element: <Layouts />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
        path: "/latest-product",
        element: <Latestproduct />
    },
            {
                path: "/profile",
                element: <Profile />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            /*Admin Routes Here */
            {
                path: "/admin/dashboard",
                element: <Dashboard />
            },
            {
                path: "/admin/add-product",
                element: <AddProduct />
            },
            {
                path: "/admin/edit-product/:id",
                element: <EditProduct />
            },
            {
                path: "/admin/all-products",
                element: <AllProducts />
            }
        ]
    },
    {
        path: "/login",
        element: (
            <Islogin>
                <Login />
            </Islogin>
        )
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "*",
        element: <NotFound />
    }
];

export default MyRoutes;
