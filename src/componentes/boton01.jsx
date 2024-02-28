import "./estilos/botones.scss";

function Boton01({ancho="", alto="", style={}, ajustable=false, text="", onClick, className="boton01"}) {
    return ( 
        <div onClick={onClick} className={className} style={{width: ancho, height: alto, ...style}}>
            {text}
        </div>
    );
}

export default Boton01;