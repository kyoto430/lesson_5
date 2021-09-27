import React from "react";
import NavBar from "./components/navBar";
import Users from "./components/users";
import { Route, Switch } from "react-router-dom";
import Main from "./components/main";
import Login from "./components/login";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={Users} />
            </Switch>
        </>
    );
}

export default App;
