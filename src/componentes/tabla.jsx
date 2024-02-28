import {Table} from 'reactstrap';
import { Button } from 'reactstrap';
import './estilos/tabla.scss';
function Tabla({nameTabla="",header = [], modelData, cargarDatos=false, textCargarDatos="Cargar Datos", agregarDatos=false, textAgregarDatos="Agregar Datos", onClickAgregarDatos}) {
    return ( <div className='tabla'>
      <div className='tabla-header'>
        <h3>{nameTabla}</h3>
        <div className='tabla-header-acciones'>
          {agregarDatos==true ? <Button onClick={onClickAgregarDatos}  color='success'>{textAgregarDatos}</Button>: null}
          {cargarDatos==true ? <Button color='success'>{textCargarDatos}</Button>: null}
        </div>
      </div>
      <div className='tabla-body'>
        <Table bordered>
          <thead>
            <tr>
              {
                header.map((element, index) => {
                  return (<th key={index}>{element}</th>)
                })
              }
            </tr>
          </thead>
          <tbody>{modelData()}</tbody>
        </Table>
      </div>
    </div> );
}

export default Tabla;