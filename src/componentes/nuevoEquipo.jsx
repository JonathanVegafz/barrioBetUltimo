import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function NuevoEquipo({modal, toggle}) {
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
            <ModalHeader toggle={toggle}>Nuevo Equipo</ModalHeader>
            <ModalBody>
                <Form>
                    <div style={{display:"flex", justifyContent: "center"}}>
                        <img src={logoUrl} width={200} height={200}></img>
                    </div>
                    <FormGroup>
                        <Label for="Name">Nombre Equipo</Label>
                        <Input id="Name" name="Name" placeholder="Escriba su nombre" type="text"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="Division">Division</Label>
                        <Input id="Division" name="Division" type="select">
                            <option>Division 1</option>
                            <option>Division 2</option>
                            <option>Division 3</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleFile">Logo del Equipo</Label>
                        <Input id="File" name="file" type="file" onChange={handleFileChange} />
                        <FormText>This is some placeholder block-level help text for the above input. It‘s a bit lighter and easily wraps to a new line.</FormText>
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

export default NuevoEquipo;