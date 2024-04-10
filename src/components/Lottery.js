import React, { useEffect, useRef, useState } from "react";
import styleClasses from '../containers/SlotMachine/SlotMachine.module.scss';
import Moment from 'moment';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';


export const LotteryComponent = (props) => {

    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMin = currentTime.getMinutes();
    const currentSec = currentTime.getSeconds();

    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(23 - currentHour);
    const [minutes, setMinutes] = useState(59 - currentMin);
    const [seconds, setSeconds] = useState(59 - currentSec);

    const [myInterval, setMyInterval] = useState(10);

    const [updatePage, setUpdatePage] = useState(false);

    const [num1, setNum1] = useState();
    const [num2, setNum2] = useState();
    const [num3, setNum3] = useState();
    const [num4, setNum4] = useState();
    const [numDisable, setNumDisable] = useState(false);

    const handleChangeNum1 = e => {
        setNum1(e.target.value);
    };
    const handleChangeNum2 = e => {
        setNum2(e.target.value);
    };
    const handleChangeNum3 = e => {
        setNum3(e.target.value);
    };
    const handleChangeNum4 = e => {
        setNum4(e.target.value);
    };

    const submitNumbers = async () => {
        if (!num1 || !num2 || !num3 || !num4) {
            alert('Number can not be null values');
            return;
        }
        const lotteryBetvalue = `${num1}:${num2}:${num3}:${num4}`;
        await fetch(window.configs.apiUrlLottery + '/bet', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                value: lotteryBetvalue,
                email: localStorage.getItem('email')
            })
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
            }).catch((data) => {
                console.log(data);
            });
    }

    const getLotteryData = async () => {
        await fetch(window.configs.apiUrlLottery + '/results/' + localStorage.getItem('email'), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then((data) => {
                if (data.enabled) {
                    setNumDisable(data.enabled);
                }
                setUpdatePage(true);
            }).catch((data) => {
                console.log(data);
            });
    }

    useEffect(() => {
        setMyInterval(setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    if (hours === 0) {
                        if (days === 0) {
                            clearInterval(myInterval)
                        } else {
                            setDays(days - 1);
                            setHours(23);
                            setMinutes(59);
                            setSeconds(59);
                        }
                    } else {
                        setHours(hours - 1);
                        setMinutes(59);
                        setSeconds(59);
                    }

                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } else {
                setSeconds(seconds - 1);
            }
        }, 1000))

        return () => clearInterval(myInterval);
    }, [seconds, minutes, hours, days]);


    useEffect(() => {
        getLotteryData();
    }, [updatePage]);

    useEffect(() => {
        getLotteryData();
    }, []);

    return (
        <>
            <h2 style={{ marginTop: 60 }}></h2>
            <h1 className="sub-title">
                <div className={styleClasses['slot-machine']}>
                    <header className={styleClasses['slot-machine__header']}>
                        <h1 className={styleClasses['slot-machine__title']}><strong>Lottery Time</strong></h1>
                        <br />
                        <h3>Time Remaining for the Lottery Draw on : <strong>{Moment(new Date()).format('DD MMM YYYY')}</strong></h3>
                    </header>
                </div>
                {hours === 0 && minutes === 0 && seconds === 0
                    ? <h1>Busted!</h1>
                    :

                    <div className="time-box-wrapper">

                        <div className="single-box">
                            <h1>{hours}</h1>
                            <p>Hours</p>
                        </div>

                        <div className="single-box">
                            <h1>{minutes}</h1>
                            <p>Minutes</p>
                        </div>

                        <div className="single-box">
                            <h1>{seconds}</h1>
                            <p>Seconds</p>
                        </div>

                    </div>
                }


                <div style={{ marginTop: -450 }}>
                    <h3> Hurry! Simply enter four numbers ranging from <strong>1</strong> to <strong>99</strong>  and await your fortune 💸</h3>
                    <br />
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '10ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="num1" label="Number 01" type="number" required value={num1} onChange={handleChangeNum1} disabled={numDisable} />
                        <TextField id="num2" label="Number 02" type="number" required value={num2} onChange={handleChangeNum2} disabled={numDisable} />
                        <TextField id="num3" label="Number 03" type="number" required value={num3} onChange={handleChangeNum3} disabled={numDisable} />
                        <TextField id="num4" label="Number 04" type="number" required value={num4} onChange={handleChangeNum4} disabled={numDisable} />
                    </Box>
                    <br />
                    {!numDisable
                        ? <Button variant="contained" onClick={submitNumbers}>Submit</Button>
                        :
                        null
                    }

                </div>


                {numDisable
                    ? <h1> <Chip label="Wait for the results!" color="success" variant="outlined" deleteIcon={<DoneIcon />} /></h1>
                    :
                    null
                }
            </h1>
        </>
    );
};
