/* Importing All Routes And Components Here...*/
import Layouts from "./layouts/Layouts";
import { Islogin } from "./auth/Auth";
import Home from "./pages/Home";
import NotFound from "./components/404";
import Login from "./components/Login";
import Signup from "./components/Signup";

/* Import Admin Routes Here */
import AdminLayouts from "./admin/AdminLayouts";

const MyRoutes = [
    {
        path: "/admin",
        element: <AdminLayouts />,
        children: [
            {
                index: true
            }
        ]
    },
    {
        path: "/",
        element: <Layouts />,
        children: [
            {
                index: true,
                element: <Home />
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
