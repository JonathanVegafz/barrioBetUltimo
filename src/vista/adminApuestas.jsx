import Navegador from "../componentes/navegador";
import Tabla from "../componentes/tabla";
import { FaTrashCan } from "react-icons/fa6";
import { useState, useEffect } from "react";

function AdminApuestas() {

    const [apuestas, setApuestas] = useState([]);


    const header = [
        'ID',
        'Nombre Apostador',
        'Email Apostador',
        'Fecha Apuesta',
        'Partido ID',
        'Apuesta',
        'Factor Apuesta',
        'Cantidad Apostada'
    ];


    const data = [
        {id:1, nombreApostador:'Juan', emailApostador:'prueba@gmail.com', fechaApuesta:'2021-09-01', partidoId:1, apuesta:'local', factorApuesta:1.5, cantidadApostada:500},
        {id:2, nombreApostador:'Pedro', emailApostador:'prueba@gmail.com', fechaApuesta:'2021-09-01', partidoId:1, apuesta:'visitante', factorApuesta:1.5, cantidadApostada:500},
        {id:3, nombreApostador:'Juan', emailApostador:'prueba@gmail.com', fechaApuesta:'2021-09-01', partidoId:1, apuesta:'empate', factorApuesta:1.5, cantidadApostada:500},
        {id:4, nombreApostador:'Diego', emailApostador:'prueba@gmail.com', fechaApuesta:'2021-09-01', partidoId:1, apuesta:'local', factorApuesta:1.5, cantidadApostada:500},
    ]

    const modeldata = ()=>{
        return apuestas.map((element, index) => {
            return (
                <tr key={index}>
                    <th>{element.id}</th>
                    <td>{element.nombreapostador}</td>
                    <td>{element.emailapostador}</td>
                    <td>{element.fechaapuesta}</td>
                    <td>{element.idpartido}</td>
                    <td>{element.apuesta}</td>
                    <td>{element.factorapuesta}</td>
                    <td>{element.cantidadapostada}</td>
                    {/* <td><FaTrashCan className="botonBasurero"></FaTrashCan></td> */}
                </tr>
            )
        })
    }

    useEffect(() => {
        const obtenerApuestas = async () => {
          try {
            const respuesta = await fetch('https://brainlinkspa.zapto.org/api/apuestas'); // Ajusta la URL según la ruta de tu servidor

            const datos = await respuesta.json();
            setApuestas(datos);
          } catch (error) {
            console.error(error);
          }
        };
        obtenerApuestas();
    }, []);

    return ( <>
        <Navegador botonActivo="apuestas"></Navegador>
        <Tabla header={header} nameTabla="Apuestas"  modelData={modeldata}></Tabla>
    </> );
}

export default AdminApuestas;