import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RegistrationPage from './pages/RegistrationPage.jsx';
import ProtectedRoute from './components/ProtectedRoutes.jsx';
import { Provider } from 'jotai';
import AdminLogin from './pages/AdminLogin.jsx'
import AdminPanle from './pages/AdminPanel.jsx'
import AdminProtectedRoute from './components/AdminProtectedRoute.jsx'
const router = createBrowserRouter([


  {

    element: <App />,
    children: [
      {
        path: "/",
        index: true,
        element: <RegistrationPage />
      },
      {
        path: "/home",
        element: <ProtectedRoute><Home /></ProtectedRoute>
      },{
        path:"/admin/login",
        element:<AdminLogin/>
      },{
        path:"/admin/panel",
        element:<AdminProtectedRoute> <AdminPanle/></AdminProtectedRoute>
      }
    ]

  }


]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>

      <RouterProvider router={router} />

    </Provider>
     </StrictMode> 
)
