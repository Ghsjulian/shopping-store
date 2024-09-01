/* Importing All Routes And Components Here...*/
import Layouts from "./layouts/Layouts";
import Home from "./pages/Home";
import NotFound from "./components/404";

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
        path: "*",
        element: <NotFound />
    }
];

export default MyRoutes;
