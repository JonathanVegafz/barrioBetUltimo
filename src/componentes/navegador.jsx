import { GiHamburgerMenu } from "react-icons/gi";
import { Input, Button, Offcanvas, OffcanvasHeader, OffcanvasBody, Nav } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './estilos/navegador.scss';
import BotonMenu from "./botonMenu";
import Boton01 from "./boton01";
import { FaUserCircle } from "react-icons/fa";


function Navegador({botonActivo = 'inicio ', pathLogo = './assets/logo.svg'}) {

    const [isOpen, setIsOpen] = useState(false);
    const [usuario, setUsuario] = useState({});
    const location = useLocation();
    const navigate = useNavigate();

    const [home, setHome] = useState(false);
    const [apuestas, setApuestas] = useState(false);
    const [equipos, setEquipos] = useState(false);
    const [partidos, setPartidos] = useState(false);

    const toggleOffcanvas = () => {
        setIsOpen(!isOpen);
    };

    const hanlerCerrarSecion = () => {
        navigate('/', {
            replace: true,
            state: {
                logged: false,
            },
        });
        // <Navigate to='/login' />;
        return;
    }

    const hanlerPartidos = ()=>{
        navigate('/admin/partidos', {
            replace: true,
            state: {
                logged: true,
            },
        });
    }

    const hanlerEquipos = (e) =>{
        e.preventDefault();
        
        navigate('/admin/equipos', {
            replace: true,
            state: {
                logged: true,
            },
        });
    }

    const hanlerApuestas = (e) =>{
        e.preventDefault();

        navigate('/admin/apuestas', {
            replace: true,
            state: {
                logged: true
            },
        });
    }

    const hanlerHome = (e) =>{
        e.preventDefault();
        navigate('/admin/home', {
            replace: true,
            state: {
                logged: true,
            },
        });
    
    }

     const hanlerActive = () => {
        switch (botonActivo) {
            case 'home':
                setHome(true);
                break;
            case 'apuestas':
                setApuestas(true);
                break;
            case 'equipos':
                setEquipos(true);
                break;
            case 'partidos':
                setPartidos(true);
                break;
            default:
                break;
        }
    }


    useEffect(() => {
        hanlerActive();
    }, []); // El segundo parámetro del useEffect, [] en este caso, asegura que se ejecute solo una vez al montar el componente
    return (
    <>
        <header className="navegador"> 
            <nav>
                <div>
                    <Button
                        style={{backgroundColor: '#FFF', border: 'none'}}
                        onClick={toggleOffcanvas}
                        className="botonNav"
                     >
                        <GiHamburgerMenu className="icono" color="grey"/>
                    </Button>
                    {/* <img className="logo" src={pathLogo}/> */}
                    <Offcanvas
                        fade={false}
                        isOpen={isOpen}
                        scrollable
                        toggle={toggleOffcanvas}
                        className="menu"
                    >
                        <OffcanvasHeader className="header-menu" toggle={toggleOffcanvas}>
                           <div className="contenedor-img">Barrio Bet</div>
                        </OffcanvasHeader>
                        <OffcanvasBody className="body-menu">
                            <ul className="menu-list">
                                <BotonMenu isActive={home} texto="Home" onClick={hanlerHome}></BotonMenu>
                                <BotonMenu isActive={apuestas} texto="Apuestas" onClick={hanlerApuestas}></BotonMenu>
                                <BotonMenu isActive={equipos} texto="Equipos" onClick={hanlerEquipos}></BotonMenu>
                                <BotonMenu isActive={partidos} texto="Partidos" onClick={hanlerPartidos}></BotonMenu>
                            </ul>
                        </OffcanvasBody>
                    </Offcanvas>
                </div>

            </nav>

        </header>
    </> 
    );
}

export default Navegador;