import { Navigate, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { JournalPage } from "../journal/pages/JournalPage";
import { LoginPage } from "../auth/pages/LoginPage";
import { RegisterPage } from "../auth/pages/RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "../store/auth/authSlice";
import { firebaseAuth } from "../firebase/config";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { CheckingAuth } from "../ui/components/CheckingAuth";


export const AppRouter = () => {

  const status = useCheckAuth();

  const router = createBrowserRouter(
  status == 'authenticated'  
  ?[
    {
      path: "/*",
      element: <Navigate to="/" />,
    },
    {
      path: "/",
      element: <JournalPage />
    },
  ]
  : status === "checking"
  ? [
    {
      path: "*",
      element: <CheckingAuth />,
    },
    ]
  :[
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,  
    },
    {
      path: "/auth",
      element: <Navigate to="/auth/login" />,
    },
    {
      path: "/auth/*",
      element: <Navigate to="/auth/login" />,
    },
  ]
);

  /*const dispatch = useDispatch();
        
  onAuthStateChanged( firebaseAuth, async( user ) => {
    if ( !user ) return dispatch( logout() )

    const { uid, email, displayName, photoURL } = user;
    dispatch( login({ uid, email, displayName, photoURL }) );
  })*/


  return (
    <RouterProvider router={router} />
  )
}