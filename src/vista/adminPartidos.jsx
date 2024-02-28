import Navegador from "../componentes/navegador";
import Tabla from "../componentes/tabla";
import { FaTrashCan } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import NuevoPartido from "../componentes/nuevoPartido";
import { useState, useEffect } from "react";

function AdminPartidos() {

    const [modalNuevoPartido, setModalNuevoPartido] = useState(false);

    const toggleNuevoPartido = () => setModalNuevoPartido(!modalNuevoPartido);

    const [partidos, setPartidos] = useState([]);
    

    const header = [
        'ID',
        'Equipo Local',
        'Equipo Visitante',
        'Fecha del Partido',
        'Hora del Partido', 
        'Division',
        'Factor Local',
        'Factor Visitante',
        'Factor Empate',
        'Estado del partido',
        'Acciones'
    ];


    const data = [
        {id:1, equipoLocal:'Equipo 1', EquipoVisitante:'Equipo 2', fechaPartido:'2021-09-01', horaPartido:'20:00', estadoPartido:'pendiente'},
        {id:2, equipoLocal:'Equipo 3', EquipoVisitante:'Equipo 4', fechaPartido:'2021-09-01', horaPartido:'20:00', estadoPartido:'pendiente'},
        {id:3, equipoLocal:'Equipo 5', EquipoVisitante:'Equipo 6', fechaPartido:'2021-09-01', horaPartido:'20:00', estadoPartido:'pendiente'},
        {id:4, equipoLocal:'Equipo 7', EquipoVisitante:'Equipo 8', fechaPartido:'2021-09-01', horaPartido:'20:00', estadoPartido:'pendiente'},
    ]



    const modeldata = ()=>{
        return partidos.map((element, index) => {
            return (
                <tr key={index}>
                    <th>{element.id}</th>
                    <td>{element.equipoLocal}</td>
                    <td>{element.equipoVisitante}</td>
                    <td>{element.fecha}</td>
                    <td>{element.hora}</td>
                    <td>{element.estado}</td>
                    <td>{element.division}</td>
                    <td>{element.factorLocal}</td>
                    <td>{element.factorVisitante}</td>
                    <td>{element.factorEmpate}</td>
                    <td>
                        <div className="botonesAcciones">
                            <MdEdit className="botonEditar"/>
                            <FaTrashCan className="botonBasurero"/>
                        </div>
                    </td>
                </tr>
            )
        })
    }

    useEffect(() => {
        const obtenerPartidos = async () => {
          try {
            const respuesta = await fetch('https://brainlinkspa.zapto.org/api/partidos'); // Ajusta la URL según la ruta de tu servidor
            // if (!respuesta.ok) {
            //   throw new Error('Error al obtener productos');
            // }
    
            // const datos = await respuesta.json();
            const datos = await respuesta.json();
            setPartidos(datos);
          } catch (error) {
            console.error(error);
          }
        };
        obtenerPartidos();
    }, []);

    return ( <>
        <Navegador botonActivo="partidos"></Navegador>
        <Tabla textAgregarDatos="Agregar Partido" agregarDatos={true} 
            header={header} nameTabla="Partidos"  modelData={modeldata}
            cargarDatos={true} onClickAgregarDatos={toggleNuevoPartido}></Tabla>
        <NuevoPartido toggle={toggleNuevoPartido} modal={modalNuevoPartido}></NuevoPartido>
    </> );
}

export default AdminPartidos;