import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import Login from './components/AuthPage/Login'
import Signup from './components/AuthPage/Signup.jsx'
import Home from './components/Home/Home.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Layout />}>
            <Route index element={
                <ProtectedRoute>
                    <Home />
                    
                </ProtectedRoute>
            } />

            <Route path='Dashboard' element={
                <ProtectedRoute>
                    <Dashboard/>
                </ProtectedRoute>
            }/>

            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
        </Route>
    )
)

export default router;
