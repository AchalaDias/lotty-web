/**
 * Copyright (c) 2021, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { FunctionComponent, ReactElement, useCallback, useEffect, useState } from "react";
// import { default as authConfig } from "../../public/config.json";
import LOGIN_LOGO from "../images/login-lady.png";
import { DefaultLayout } from "../layouts/default";
import { useLocation } from "react-router-dom";
// import { LogoutRequestDenied } from "../components/LogoutRequestDenied";
// import { USER_DENIED_LOGOUT } from "../constants/errors";
import { ResponsiveAppBar } from "../components/menu-bar";
import { SlotMachineComponent } from "../components/SlotMachine";
import { ResultsComponent } from "../components/PriceResults";
import { LotteryComponent } from "../components/Lottery";
import FOOTER_LOGOS from "../images/footer.png";
import Cookies from 'js-cookie';


export default function HomePage() {

    const [derivedAuthenticationState, setDerivedAuthenticationState] = useState(null);
    const [hasAuthenticationErrors, setHasAuthenticationErrors] = useState(false);
    const [hasLogoutFailureError, setHasLogoutFailureError] = useState(false);

    const [menuBarHandlerSlotMachine, setMenuBarHandlerSlotMachine] = useState(true);
    const [menuBarHandlerLottery, setMenuBarHandlerLottery] = useState(false);
    const [menuBarHandlerResults, setMenuBarHandlerResults] = useState(false);

    const search = useLocation().search;
    const stateParam = new URLSearchParams(search).get('state');
    const errorDescParam = new URLSearchParams(search).get('error_description');

    useEffect(() => {

        // Read userinfo cookie value.
        const encodedUserInfo = Cookies.get('userinfo')

        // // Decode the value. 
        // const userInfo = JSON.parse(atob(encodedUserInfo));
        console.log(encodedUserInfo);


    }, []);



    const handleLogin = useCallback(() => {
        window.location.href = "/auth/login";
    }, []);


    const handleLogout = () => {
        window.location.href = `/auth/logout?session_hint=${Cookies.get('session_hint')}`
    };

    const run = () => {
        fetch(window.config.testurl, {
            method: "GET",
            headers: {
                "Content-Type": "apllication/json"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            }).catch((data) => {
                console.log(data);
            });
    };



    return (
        <DefaultLayout
            isLoading={false}
            hasErrors={false}
        >
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
                    <button
                        className="btn primary"
                        onClick={() => {
                            run();
                        }}
                    >
                        RUN
                    </button>
                    <h4 className={"spa-app-description"}>
                        <a href="https://wso2.com/asgardeo/docs/guides/#developer-guide" rel="noreferrer noopener">
                            Asgardeo Auth
                        </a>
                    </h4>
                </div>
                <img src={FOOTER_LOGOS} className="footer-image" />
            </div>


        </DefaultLayout>
    );
};
