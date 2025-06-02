import { Suspense, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginForm from './pages/auth/signin/signin'
import RegisterForm from './pages/auth/signup/signup'
import ProductCreate from './pages/cms/productCreate/productCreate'
import VerifyUIOnly from './pages/auth/otp/otp'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import NoData from './components/noData/noData'
import Spinner from './components/spinner/spinner'
import Dashboard from './pages/cms/dashboard/dashboard'
import UpdatePassword from './pages/auth/updatePassword/updatePassword'
import Edit from './pages/cms/productUpdate/edit'
import Wrapper from './layout/wrapper/wrapper'
import { useDispatch } from 'react-redux'
import { check_token } from './redux/slice/authSlice'
import toast from 'react-hot-toast'

function App() {

  function PrivateRoute({ children }) {
    const token = localStorage.getItem("user_token") || sessionStorage.getItem("user_token");
    console.log("token12232323", token)
    return token !== null && token !== undefined ? (
      children
    ) : (
      <>
        <Navigate to="/" />
        {toast.error("You must login first to access this page")}
      </>
    );
  }


  const dispatch = useDispatch()
  const publicRoutes = [
    {
      path: "/",
      component: <LoginForm />
    },
    {
      path: "/auth/register",
      component: <RegisterForm />
    },
    {
      path: "*",
      component: <NoData />
    },
    {
      path: "/auth/otp",
      component: <VerifyUIOnly />
    },


  ]


  const privateRoutes = [
    {
      path: "/cms/dashboard",
      component: < Dashboard />
    },
    {
      path: "/cms/create",
      component: <ProductCreate />
    },

    {
      path: "/cms/edit/:id",
      component: <Edit />
    },
    {
      path: "/auth/updatePassword",
      component: <UpdatePassword />
    },

  ]

  useEffect(() => {
    dispatch(check_token())
  }, [])
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Router>
          <Wrapper>
            <Routes>
              {
                publicRoutes.map((item) => {
                  return (
                    <Route path={item.path} element={item.component} />
                  )
                })
              }

              {
                privateRoutes.map((item) => {
                  return (
                    <Route path={item.path} element={<PrivateRoute>{item.component}</PrivateRoute>} />
                  )
                })
              }
            </Routes>
          </Wrapper>



        </Router>
      </Suspense>

    </>
  )
}

export default App
