import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { openModal } from '../features/modal/modalSlice';
import Modal from '../pages/FilterInformation'
import Spinner from "../components/Spinner"
import { Line } from 'react-chartjs-2';
import { getContinuousMeasurement, reset } from '../features/continuousMeasurement/continuousMeasurementSlice';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';



/*const MeasurementPanel = () => {
    const dispatch = useDispatch();
    //const [continuousMeasurements, setContinuousMeasurements] = useState([]);

    useEffect(() => {
        // Ejecutar la petición GET cuando la ruta sea "/obtenermediciones"
        if (window.location.pathname === "/panel-consumo") {
            dispatch(getContinuousMeasurement())
            /*then(() => {
                dispatch(closeModal());
                dispatch(getInstallations());
            });*/
       /* }
    }, [dispatch]);

    // Mapear los datos de respuesta y extraer los totales del caudal promedio
    //const totals = continuousMeasurements.map((measurement) => measurement.totalAverageFlow);
    //const { totals } = useSelector((store) => store.continuousMeasurements);
    //console.log(`${totals}`)
    const { continuousMeasurements } = useSelector((store) => store.continuousMeasurements) || {};
    const totals = continuousMeasurements ? continuousMeasurements.map((measurement) => measurement.totalAverageFlow) : [];
    console.log(`${totals} s`)

    //const { continuousMeasurements } = useSelector((store) => store.continuousMeasurements) || {};
    //const { continuousMeasurements } = useSelector((store) => store.continuousMeasurement);


      


    //const { continuousMeasurements } = useSelector((store) => store.continuousMeasurement);

    // Mapear los datos de respuesta y extraer los totales del caudal promedio
    //const totals = continuousMeasurements.map((measurement) => measurement.totalAverageFlow);
    //const totals = continuousMeasurements ? continuousMeasurements.map((measurement) => measurement.totalAverageFlow) : [];


    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );
    
    const options = {
        responsive: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    fontColor: "rgb(12, 38, 70, 0.8)",
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Tiempo.",
                    color: "rgb(12, 38, 70, 0.8)",
                    font: {
                        size: 15
                    }
                },
                ticks: {
                    color: "rgb(12, 38, 70, 0.8)"
                }
            },
            y: {
                title: {
                    display: true,
                    text: "Caudal (L/h).",
                    color: "rgb(12, 38, 70, 0.8)",
                    font: {
                        size: 15
                    }
                },
                ticks: {
                    color: "rgb(12, 38, 70, 0.8)"
                }
            }
        }
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,//continuousMeasurements.map(measurement => measurement.month),
        datasets: [
            {
                label: 'Total del Caudal Promedio',
                data: totals,//continuousMeasurements.map(measurement => measurement.totalAverageFlow), // Utiliza el caudal promedio como datos en el eje y
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="card card-chart">
                        <div className="card-header ">
                            <div className="row hstack">
                                <div className="card-title">
                                    <h3 className="graph-title">Gráfico caudal-tiempo.</h3>
                                </div>
                                
                                <div className="card-button">
                                    <button type="button" className="btn-primary" id="graph-button" data-toggle="modal">
                                        Graficar
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <Line options={options} data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}*/

//export default MeasurementPanel;


const MeasurementPanel = () => {
    //const [continuousMeasurement, setContinuousMeasurements] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {isOpen} = useSelector((store) => store.modal)


    

    const {graphicsInformation, isLoading, isError, isSuccess, message} = useSelector((store) => store.continuousMeasurements) 
    
    useEffect(() => {

        if(!isOpen){
            console.log(isOpen)
            dispatch(getContinuousMeasurement())
            console.log('fue if')
          }else{
            dispatch(reset())
          }

        console.log('no if')

        //dispatch(reset())
    }, [isError, isSuccess, message, navigate, dispatch]);


    if(isLoading){
        return <Spinner />
    }

    if(!isOpen && isSuccess){
    console.log(isLoading)
    console.log(graphicsInformation)
    
    }else{
    console.log('isOpen')
    }

       //const averageFlow = graphicsInformation.map(measurement => measurement.totalAverageFlow) || {}
    /*const formattedData = graphicsInformation.map(item => {
        console.log('graphicsInformation')
        // Construye la fecha en formato day/month/year
        const date = `${item.day}/${item.month}/${item.year}`;
        return { ...item, date }; // Agrega la fecha al objeto y devuelve el objeto actualizado
    });


    console.log(JSON.stringify(formattedData) + 'hh');

    const summary = formattedData.reduce((acc, item) => {
        const { date, totalAverageFlow } = item;
        if (!acc[date]) {
            acc[date] = { totalAverageFlow: 0 };
        }
        acc[date].totalAverageFlow += totalAverageFlow;
        return acc;
    }, {});*/

    const summary = graphicsInformation.reduce((acc, item) => {
        const { date, totalAverageFlow } = item;
        if (!acc[date]) {
            acc[date] = { totalAverageFlow: 0 };
        }
        acc[date].totalAverageFlow += totalAverageFlow;
        return acc;
    }, {});
    
    
    // Convertir el objeto en un array
    const summaryArray = Object.entries(summary).map(([date, { totalAverageFlow }]) => ({
        totalAverageFlow,
        date
    }));
    
    console.log(summaryArray);
    const averageFlow = summaryArray.map(measurement => measurement.totalAverageFlow) || {}
    const date = summaryArray.map(measurement => measurement.date)
    console.log(date)
    
    
       

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );
    
    const options = {
        //maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    fontColor: "rgb(12, 38, 70, 0.8)",
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Tiempo.",
                    color: "rgb(12, 38, 70, 0.8)",
                    font: {
                        size: 15
                    }
                },
                ticks: {
                    color: "rgb(12, 38, 70, 0.8)"
                }
            },
            y: {
                title: {
                    display: true,
                    text: "Caudal (L/h).",
                    color: "rgb(12, 38, 70, 0.8)",
                    font: {
                        size: 15
                    }
                },
                ticks: {
                    color: "rgb(12, 38, 70, 0.8)"
                }
            }
        }
    };

    //const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const labels = date

    const data = {
        labels,
        datasets: [
            {
                label: 'Total del Caudal Promedio',
                data: averageFlow, // Utiliza los totales del caudal promedio como datos en el eje y
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="card card-chart">
                        <div className="card-header ">
                            <div className="row hstack">
                                <div className="card-title">
                                    <h3 className="graph-title">Gráfico caudal-tiempo.</h3>
                                </div>
                                
                                <div className="card-button">
                                    <button type="button" className="btn-primary" id="graph-button" onClick={() => dispatch(openModal())}>
                                        Graficar
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <Line className="graph" options={options} data={data} />
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && <Modal/>}
        </>
    );
}

export default MeasurementPanel;

