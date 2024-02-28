import EquipoCard from "../componentes/equipoCard";
import './estilos/PartidosVista.scss';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ApuestaModal from '../componentes/apuestaModal';
import { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';

function PartidosVista() {
    const [modal, setModal] = useState(false);
    // Estado para almacenar los partidos [
    const { idPartido } = useParams();
    const toggle = () => setModal(!modal);
    const [partido, setPartido] = useState(null); // Estado para almacenar los partidos [

    useEffect(() => {
        const obtenerPartido = async () => {
          try {
            const respuesta = await fetch('https://brainlinkspa.zapto.org/api/partidos/apuesta/' + idPartido); // Ajusta la URL según la ruta de tu servidor
            const posibleError = await respuesta.json();
            if (posibleError.error) {
              throw new Error('Error al obtener partido');
            }
    
            // const datos = await respuesta.json();
            // const datos = posibleError;
            setPartido(posibleError);  
          } catch (error) {
            console.error(error);
          }
        };
        obtenerPartido();
    }, []);

    return ( <>
        {
            partido == null ? <h1>Cargando...</h1> :
            <main className="PartidosVista">
                <section className="seccion-PartidosVista">
                    <div className="contenedor-Equipos-PartidosVista">
                        <EquipoCard nombreEquipo={partido.equipoLocal.nombre} logoEquipo={"https://brainlinkspa.zapto.org/api/equipos/" + partido.equipoLocal.id + "/logo"}/>
                        <EquipoCard nombreEquipo={partido.equipoVisitante.nombre} logoEquipo={"https://brainlinkspa.zapto.org/api/equipos/" + partido.equipoVisitante.id + "/logo"}/>
                    </div>
                    <Button onClick={toggle} color="primary">Apostar</Button>
                </section>
            </main>
        }
        {
            partido == null ? '':
            <ApuestaModal idPartido={idPartido} factorLocal={partido.factorLocal} factorEmpate={partido.factorEmpate} factorVisita={partido.factorVisitante} toggle={toggle} modal={modal}/>
        }
    </> );
}

export default PartidosVista;