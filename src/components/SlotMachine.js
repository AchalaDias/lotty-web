import { BasicUserInfo } from "@asgardeo/auth-react";
import React, { FunctionComponent, ReactElement } from "react";

import SlotMachine from '../containers/SlotMachine';
import '../lib/styles/main.scss';


export const SlotMachineComponent = (props) => {

    const {
        derivedResponse
    } = props;

    return (
        <>
            <h2 style={{ marginTop: 60 }}></h2>
            <SlotMachine />
        </>
    );
};
