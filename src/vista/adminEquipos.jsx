import Navegador from "../componentes/navegador";
import NuevoEquipo from "../componentes/nuevoEquipo";
import Tabla from "../componentes/tabla";
import { FaTrashCan } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { useState, useEffect } from "react";

function AdminEquipos() {

    const [modalNuevoEquipo, setModalNuevoEquipo] = useState(false);

    const toggleNuevoEquipo = () => setModalNuevoEquipo(!modalNuevoEquipo);

    const [equipos, setEquipos] = useState([]);

    const header = [
        'ID',
        'Nombre del Equipo',
        'Liga del Equipo',
        'Acciones'
    ];


    const data = [
        {id:1, nombreEquipo:'Equipo 1', divisionEquipo:'Division 1'},
        {id:2, nombreEquipo:'Equipo 2', divisionEquipo:'Division 2'},
        {id:3, nombreEquipo:'Equipo 3', divisionEquipo:'Division 3'},
        {id:4, nombreEquipo:'Equipo 4', divisionEquipo:'Division 4'},
    ]

        

    const modeldata = ()=>{
        return equipos.map((element, index) => {
            return (
                <tr key={index}>
                    <th>{element.id}</th>
                    <td>{element.nombreequipo}</td>
                    <td>{element.liga}</td>
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
        const obtenerEquipos = async () => {
          try {
            const respuesta = await fetch('https://brainlinkspa.zapto.org/api/equipos'); // Ajusta la URL según la ruta de tu servidor
            // if (!respuesta.ok) {
            //   throw new Error('Error al obtener productos');
            // }
    
            // const datos = await respuesta.json();
            const datos = await respuesta.json();
            setEquipos(datos);
          } catch (error) {
            console.error(error);
          }
        };

        obtenerEquipos();
    }, []);
        

    return ( <>
        <Navegador botonActivo="equipos"></Navegador>
        <Tabla textAgregarDatos="Agregar Equipo" agregarDatos={true} 
            header={header} nameTabla="Equipos"  modelData={modeldata}
            cargarDatos={true} onClickAgregarDatos={toggleNuevoEquipo}></Tabla>
        <NuevoEquipo toggle={toggleNuevoEquipo} modal={modalNuevoEquipo}/>
    </> );
}

export default AdminEquipos;