import React, { useState, useEffect } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import styleClasses from '../containers/SlotMachine/SlotMachine.module.scss';

// const dataset = [
//     {
//         amount: -18,
//         date: "2024-04-04"
//     },
//     {
//         amount: 21,
//         date: "2024-04-05"
//     },
//     {
//         amount: 5,
//         date: "2024-04-03"
//     }
   
// ];

const valueFormatter = (value) => `${value}mm`;

const chartSetting = {
    yAxis: [
        {
            label: 'History ($)',
        },
    ],
    series: [{ dataKey: 'amount', label: 'Cost', valueFormatter }],
    height: 300,
    sx: {
        [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
            transform: 'translateX(-10px)',
        },
    },
};


const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export const ResultsComponent = (props) => {

    const [tickPlacement, setTickPlacement] = useState ('middle');
    const [tickLabelPlacement, setTickLabelPlacement] = useState('middle');


    const [betValue, setBetValue] = useState('');
    const [resultBetValue, setResultBetValue] = useState('');
    const [dataset, setDataset] = useState([]);

    const getLotteryResult = async () => {
        await fetch(window.configs.apiUrlLottery + '/results/' + localStorage.getItem('email'), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then((data) => {
                if (data.enabled == false) {
                    const betArray = data.last_draw_bet_value.split(':');
                    const betResulrArray = data.last_draw_value.split(':');
                    if (betArray.length === 4) {
                        setBetValue(`${betArray[0]} ${betArray[1]} ${betArray[2]} ${betArray[3]}`);
                    }
                    if (betResulrArray.length === 4) {
                        setResultBetValue(`${betResulrArray[0]} ${betResulrArray[1]} ${betResulrArray[2]} ${betResulrArray[3]}`);
                    }
                }
            }).catch((data) => {
                console.log(data);
            });
    }

    const getslotMachineResult = async () => {
        await fetch(window.configs.apiUrl + '/getresults/' + localStorage.getItem('email'), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then((data) => {
                setDataset(data);
            }).catch((data) => {
                console.log(data);
            });
    }

    useEffect(() => {
        getLotteryResult();
        getslotMachineResult();
    }, []);

    return (
        <>
            <h2 style={{ marginTop: 20 }}></h2>
            <h4 className="sub-title">
                <div className={styleClasses['slot-machine']}>
                    <header className={styleClasses['slot-machine__header']}>
                        <h1 className={styleClasses['slot-machine__title']}><strong>Results</strong></h1>
                        <br />
                    </header>
                </div>
                <div style={{ marginTop: -800 }}>
                    <h3>Last Lottery Result</h3>
                    <div className="container0">
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Winning Number
                                </Typography>
                                <Typography variant="h5" component="div">
                                    34 56 78 90
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">

                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Your Number
                                </Typography>
                                <Typography variant="h5" component="div">
                                    34 56 78 90
                                </Typography>

                                <Chip label="Congratulations, you're the winner! 🎉" color="success" variant="outlined" />
                                <Chip label="Better luck next time" color="warning" variant="outlined" />
                                <Chip label="No Results" color="info" variant="outlined" />
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div style={{ marginTop: 20 }}>
                    <h3>Slot Machine Earnings</h3>
                    <div className="container0">
                        <BarChart
                            dataset={dataset}
                            xAxis={[
                                { scaleType: 'band', dataKey: 'date', tickPlacement, tickLabelPlacement },
                            ]}
                            {...chartSetting}
                        />
                    </div>
                </div>
            </h4>
        </>
    );
};
