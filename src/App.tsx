import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginSignUp from "./pages/LoginSignUp.tsx";
import {QueryClient, QueryClientProvider} from "react-query";
import Dashboard from "./pages/Dashboard.tsx";
import Category_Dogs from "./pages/Category_Dogs.tsx";
import Category_Cats from "./pages/Category_Cats.tsx";
import ItemForm from "./admin/ItemForm.tsx";
import AdminPanel from "./admin/AdminPanel.tsx";
import ItemView from "./pages/ItemView.tsx";
import UserProfile from "./pages/UserProfile.tsx";
import Order from "./pages/Order.tsx";
import PurchaseList from "./pages/PurchaseList.tsx";
import EditProfile from "./pages/EditProfile.tsx";

const router  =createBrowserRouter(
    [
        {
            path:"/loginSignup",
            element:<LoginSignUp/>
        },

        {
            path:"/",
            element:<Dashboard/>
        },

        {
            path:"/category_dogs",
            element:<Category_Dogs/>
        },

        {
            path:"/category_cats",
            element:<Category_Cats/>
        },

        {
            path:"/admin/contentedit/:id",
            element:<ItemForm/>
        },

        {
            path:"/admin/itemform",
            element:<ItemForm/>
        },

        {
            path:"/admin",
            element:<AdminPanel/>
        },

        {
            path:"/Itemview",
            element:<ItemView/>
        },

        {
            path: "/item/:id",
            element: <ItemView />
        },

        {
            path: "/profile",
            element: <UserProfile/>
        },

        {
            path: "/order/:id",
            element: <Order/>
        },

        {
            path: "/purchaseList",
            element: <PurchaseList/>
        },

        {
            path: "/editProfile",
            element: <EditProfile/>
        }
    ]
)

const querClient= new QueryClient();

function App() {

    return (
        <>
            <QueryClientProvider client={querClient}>
            <RouterProvider router={router} />
            </QueryClientProvider>
        </>
    )
}

export default App
