import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function NuevoPartido({toggle, modal}) {

    const [logoUrl, setLogoUrl] = useState("../vite.svg"); // Estado para almacenar la URL de la imagen

    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Obtener el primer archivo seleccionado
        if (file) {
            // Verificar si el tipo de archivo es una imagen
            if (!file.type.startsWith('image/')) {
                alert('Por favor, seleccione un archivo de imagen válido.');
                return;
            }

            const reader = new FileReader(); // Crear un objeto FileReader
            reader.onloadend = () => {
                // Cuando la lectura del archivo se haya completado
                setLogoUrl(reader.result); // Actualizar la URL de la imagen con la data URL del archivo
            };
            reader.readAsDataURL(file); // Leer el contenido del archivo como una URL de datos
        }
    };

    return (<>
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Nuevo Partido</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="fechaPartido">Fecha del Partido</Label>
                        <Input id="fechaPartido" name="fechaPartido" placeholder="Ingrese la fecha del partido" type="date"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="horaPartido">Hora del Partido</Label>
                        <Input id="horaPartido" name="horaPartido" placeholder="Ingrese la hora del partido" type="time"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="cantidadApostada">Equipo Local</Label>
                        <Input id="cantidadApostada" name="cantidadApostada" type="select">
                            <option>Equipo 1</option>
                            <option>Equipo 2</option>
                            <option>Equipo 3</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="cantidadApostada">Equipo Visitante</Label>
                        <Input id="cantidadApostada" name="cantidadApostada" type="select">
                            <option>Equipo 1</option>
                            <option>Equipo 2</option>
                            <option>Equipo 3</option>
                        </Input>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggle}> Do Something</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    </>);
}

export default NuevoPartido;