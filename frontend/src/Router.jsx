/* Importing All Routes And Components Here...*/
import Layouts from "./layouts/Layouts";
import Home from "./pages/Home";
import NotFound from "./components/404";
import Login from "./components/Login";
import Signup from "./components/Signup";

const MyRoutes = [
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
        element: <Login />
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
