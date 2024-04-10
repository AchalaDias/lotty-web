import React, { useCallback, useEffect, useState } from "react";
import LOGIN_LOGO from "../images/login-lady.png";
import { DefaultLayout } from "../layouts/default";
import { ResponsiveAppBar } from "../components/menu-bar";
import { SlotMachineComponent } from "../components/SlotMachine";
import { ResultsComponent } from "../components/PriceResults";
import { LotteryComponent } from "../components/Lottery";
import FOOTER_LOGOS from "../images/footer.png";
import Cookies from 'js-cookie';

export default function HomePage() {

    const [menuBarHandlerSlotMachine, setMenuBarHandlerSlotMachine] = useState(true);
    const [menuBarHandlerLottery, setMenuBarHandlerLottery] = useState(false);
    const [menuBarHandlerResults, setMenuBarHandlerResults] = useState(false);

    let [loading, setLoading] = useState(true);
    let [isAuthenticated, setIsAuthenticated] = useState(false);

    const getAuthData = async () => {
        await fetch('/auth/userinfo', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then((data) => {
                setLoading(true);
                console.log(data, data.email);
                if (data.email !== undefined) {
                    setLoading(false);
                    setIsAuthenticated(true);
                    return;
                }
                setLoading(false);
                localStorage.setItem('email', data.email);
                localStorage.setItem('session_hint', Cookies.get('session_hint'));

                console.log("storage data  ", localStorage.getItem('email'),
                    localStorage.getItem('session_hint'));
            }).catch((data) => {
                console.log(data);
                setIsAuthenticated(false);
                setLoading(false);
                alert("Login Failed !!");
            });
    }

    useEffect(() => {
        getAuthData();
        console.log(isAuthenticated);

    }, [isAuthenticated]);

    const handleLogin = useCallback(() => {
        window.location.href = "/auth/login";
    }, []);

    const run = () => {
        console.log(window.configs.testurl);
        fetch(window.configs.testurl, {
            method: "GET",
            headers: {
                "Content-Type": "apllication/json"
            }
        })
            .then((response) => console.log(response))
            .then((data) => {
                console.log(data);
            }).catch((data) => {
                console.log(data);
            });
    };

    return (
        <DefaultLayout
            isLoading={loading}
            hasErrors={false}
        >
            {
                isAuthenticated == true
                    ? (

                        <div>
                            <ResponsiveAppBar
                                setMenuBarHandlerSlotMachine={setMenuBarHandlerSlotMachine}
                                setMenuBarHandlerLottery={setMenuBarHandlerLottery}
                                setMenuBarHandlerResults={setMenuBarHandlerResults}
                            />
                            {
                                menuBarHandlerSlotMachine ?
                                    <div className="content">
                                        <SlotMachineComponent />
                                    </div>
                                    : null
                            }
                            {
                                menuBarHandlerLottery ?
                                    <div className="content">
                                        <LotteryComponent />
                                    </div>
                                    : null
                            }
                            {
                                menuBarHandlerResults ?
                                    <div className="content">
                                        <ResultsComponent />
                                    </div>
                                    : null
                            }

                        </div>
                    )
                    : (

                        <div className="container0">
                            <div className="header-title">
                                <h1>
                                    <strong>Lotty</strong>
                                </h1>
                            </div>

                            <div className="content0">
                                <div className="home-image0">
                                    <img alt="react-logo" src={LOGIN_LOGO} className="react-logo-image logo0" />
                                </div>
                                <button
                                    className="btn primary"
                                    onClick={() => {
                                        handleLogin();
                                    }}
                                >
                                    Login
                                </button>
                                <h4 className={"spa-app-description"}>
                                    <a href="https://wso2.com/asgardeo/docs/guides/#developer-guide" rel="noreferrer noopener">
                                        Asgardeo Auth
                                    </a>
                                </h4>
                            </div>
                            <img src={FOOTER_LOGOS} className="footer-image" />
                        </div>
                    )
            }
        </DefaultLayout>
    );
};
