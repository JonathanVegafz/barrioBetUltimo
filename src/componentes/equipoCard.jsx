import './estilos/equipoCard.scss';

function EquipoCard({lugarEquipo, nombreEquipo, logoEquipo}) {
    return ( < div className="contenedor-equipoCard">
        <h3>{lugarEquipo}</h3>
        <article className='equipoCard'>
            <img src={logoEquipo}/>
            <h4>{nombreEquipo}</h4>
        </article>
    
    </div> );
}

export default EquipoCard;