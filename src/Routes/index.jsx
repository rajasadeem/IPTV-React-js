import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import useAuth, { publicRoutes, privateRoutes } from "./helper"

const MainRouter = () => {

    const { authValidated } = useAuth()

    return (
        <Router>
            <Routes>
                {
                    publicRoutes.map(({ path, element }, index) => (
                        <Route path={path} element={element} />
                    ))
                },
                {
                    authValidated && privateRoutes.map(({ path, element }, index) => (
                        <Route path={path} element={element} />
                    ))
                },

                <Route path="*" element={<Navigate to={"/login"} />} />

            </Routes>
        </Router>
    )
}

export default MainRouter