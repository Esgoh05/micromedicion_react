import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { openModal } from '../features/modal/modalSlice';
import Modal from '../pages/FilterInformation'
import Spinner from "../components/Spinner"
import { Line } from 'react-chartjs-2';
import { FaFilter } from 'react-icons/fa';
import { getContinuousMeasurement, reset } from '../features/continuousMeasurement/continuousMeasurementSlice';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

const MeasurementPanel = () => {
    let none = []
    const noneData = []
    let multiSelect = []
    const multiSelectData = []
    let monthFilter = []
    const monthFilterData = []
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {isOpen} = useSelector((store) => store.modal)
    const {graphicsInformation, isLoading, isError, isSuccess, message} = useSelector((store) => store.continuousMeasurements) 
    
    useEffect(() => {

        if(!isOpen){
            dispatch(getContinuousMeasurement())
          }else{
            dispatch(reset())
          }

    }, [isError, isSuccess, message, navigate, dispatch]);


    if(isLoading){
        return <Spinner />
    }

    /*if(!isOpen && isSuccess){
    console.log(isLoading)
    console.log(graphicsInformation)
    
    }else{
    console.log('isOpen')
    }*/

    const prueba = graphicsInformation.forEach(({ date, totalAverageFlow, deviceId, typeFilter }) => {
        
        if(typeFilter === 'none'){
            none = { date, totalAverageFlow, deviceId, typeFilter };
            noneData.push(none);
        }else if(typeFilter === 'multiSelect'){
            multiSelect = { date, totalAverageFlow, deviceId, typeFilter };
            console.log(multiSelect)
            multiSelectData.push(multiSelect);
        }else if(typeFilter === 'monthFilter'){
            monthFilter = { date, totalAverageFlow, deviceId, typeFilter };
            monthFilterData.push(monthFilter);
        }
    })

    console.log(monthFilterData)

    // Reducir los datos de noneData para agrupar por fecha y sumar los totalAverageFlow
    const groupedByDate = noneData.reduce((acc, { date, totalAverageFlow, typeFilter }) => {
        if (!acc[date]) {
            acc[date] = { totalAverageFlow: 0, typeFilter };
        }
        acc[date].totalAverageFlow += totalAverageFlow;
        return acc;
    }, {});

    const groupedByDevice = multiSelectData.reduce((acc, { date, deviceId, totalAverageFlow, typeFilter }) => {
        if (!acc[date]) {
            acc[date] = {};
        }
        if (!acc[date][deviceId]) {
            acc[date][deviceId] = { totalAverageFlow: 0, typeFilter };
        }
        acc[date][deviceId].totalAverageFlow += totalAverageFlow;
        return acc;
    }, {});

    const groupedByMonth = monthFilterData.reduce((acc, { date, totalAverageFlow, typeFilter }) => {
        if (!acc[date]) {
            acc[date] = { totalAverageFlow: 0, typeFilter };
        }
        acc[date].totalAverageFlow += totalAverageFlow;
        return acc;
    }, {});

    console.log(groupedByMonth);

    // Mapear el objeto resultante a un arreglo de objetos con la estructura deseada
    const noneDataP = Object.entries(groupedByDate).map(([date, { totalAverageFlow, typeFilter }]) => ({
        date,
        totalAverageFlow,
        typeFilter
    }));

    // Convertir el objeto agrupado a un arreglo de objetos
    const multiSelectDataP = Object.entries(groupedByDevice).flatMap(([date, devices]) =>
        Object.entries(devices).map(([deviceId, { totalAverageFlow, typeFilter }]) => ({
            date,
            deviceId,
            totalAverageFlow,
            typeFilter,
        }))
    );

    // Mapear el objeto resultante a un arreglo de objetos con la estructura deseada
    const monthDataP = Object.entries(groupedByMonth).map(([date, { totalAverageFlow, typeFilter }]) => ({
        date,
        totalAverageFlow,
        typeFilter
    }));

    //console.log(noneDataP);

    const noneDataset = {
        label: 'Total del caudal promedio',
        data: noneDataP.map(item => item.totalAverageFlow),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.4)'
    };

    const multiSelectDatasets = multiSelectDataP.reduce((acc, item) => {
        const { deviceId, totalAverageFlow } = item;
        const colorRandum = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;
        if (!acc[deviceId]) {
            acc[deviceId] = {
                label: `Dispositivo: ${deviceId}`,
                data: [],
                borderColor: colorRandum, //`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`,
                backgroundColor: colorRandum //`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.4)`
            };
        }
        acc[deviceId].data.push(totalAverageFlow);
        return acc;
    }, {});

    const monthDataset = {
        label: 'Total del caudal promedio por mes',
        data: monthDataP.map(item => item.totalAverageFlow),
        borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`,
        backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`
    };

    let datasets = [];
    let labels = [];

    //Nota: desarrollar funciones respectivas cuando el response sea vacio
    if (multiSelectData.length > 0) {
        datasets = Object.values(multiSelectDatasets);
        labels = multiSelectDataP.map(item => item.date);
    }else if(monthDataP.length > 0){
        datasets.push(monthDataset);
        labels = monthDataP.map(item => item.date);
    }else {
        datasets = [noneDataset];
        labels = noneDataP.map(item => item.date);
    }

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

    // Configurar los datos del gráfico
    const data = {
        labels,
        datasets
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
                                        <FaFilter />
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

