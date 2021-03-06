import React from "react";
import NavBar from "./components/ui/navBar.jsx";
import Users from "./layouts/users";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProfessionProvider } from "./hooks/useProfession.jsx";
import { QualityProvider } from "./hooks/useQualities.jsx";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <ProfessionProvider>
                    <QualityProvider>
                        <Route
                            path="/users/:userId?/:edit?"
                            component={Users}
                        />
                        <Route path="/login/:type?" component={Login} />
                    </QualityProvider>
                </ProfessionProvider>
                <Route path="/" exact component={Main} />
                <Redirect to="/" />
            </Switch>
            <ToastContainer />
        </>
    );
}

export default App;
