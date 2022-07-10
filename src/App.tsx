import React from "react";
import {useEffect} from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import * as UserService from "./services/user.service";
import Home from "./components/Home";
import {useDispatch} from "react-redux"
import {loggedIn, setPersonalDetailsData} from "./features/user/userSlice";


const App: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        initUser()
    }, []);// eslint-disable-line react-hooks/exhaustive-deps


    const initUser = () => {
        //First take the token from localstorage then save login status and personalDetails in redux for using them in all the components
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(loggedIn(true));
            dispatch(setPersonalDetailsData(UserService.getPersonalDetailsByToken(token)))
        } else
            dispatch(loggedIn(false));
    }


    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/home"} className="nav-link">
                            Home
                        </Link>
                    </li>
                </div>
            </nav>

            <div className="container mt-3">
                <Switch>
                    <Route exact path={["/", "/home"]} component={Home}/>
                </Switch>
            </div>
        </div>
    );
};

export default App;
