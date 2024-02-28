import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Form, FormGroup, Label, Input} from 'reactstrap';

function ApuestaModal({toggle, modal, factorLocal, factorVisita, factorEmpate , idPartido}) {
    const [cantidadApostada, setCantidadApostada] = useState(500);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [factor, setFactor] = useState(factorLocal);

    const handlerCantidadApostada = (event) => { 
        setCantidadApostada(event.target.value);
    }
    
    const handlerNombre = (event) => {
        setNombre(event.target.value);
    }

    const handlerEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleFactor = (event) => {
        setFactor(parseFloat(event.target.value));
    };
    

    const hanlerApostar =  async()=>{

        if(nombre === '' || email === ''){
            alert('Por favor llene todos los campos');
            return;
        }

        var apuesta = "";

        if(factor === factorLocal){
            apuesta = "Equipo local";
        }else if(factor === factorEmpate){
            apuesta = "Empate";
        }else{
            apuesta = "Equipo visitante";
        }

        // { idPartido, nombre, email, apuesta, factorApuesta, cantidadApostada }
        await fetch('https://brainlinkspa.zapto.org/api/apuestas/addApuesta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idPartido: idPartido,
                nombre: nombre,
                email: email,
                apuesta: apuesta,
                factorApuesta: factor,
                cantidadApostada: cantidadApostada,
                
            })
        }).then((response) =>{
            if (!response.ok) {
                throw new Error('Hubo un problema al realizar la solicitud.');
            }
            return response.json(); // Si esperas una respuesta JSON
        }).then((data) => {
            console.log(data);
            setCantidadApostada(500);
            setFactor(factorLocal);
            toggle();
            alert('Apuesta realizada con éxito');
        }).catch((error) => {
            console.error('Hubo un problema con la petición Fetch:' + error.message);
        });


    }

    const hanlerCancelar = ()=>{
        setCantidadApostada(500);
        setFactor(factorLocal);
        toggle();

    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Nueva Apuesta </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="Name">Nombre</Label>
                        <Input value={nombre} onChange={handlerNombre} id="Name" name="Name" placeholder="Escriba su nombre" type="text"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input value={email} onChange={handlerEmail} id="Email" name="email" placeholder="Escriba su email" type="email"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="cantidadApostada">Cantidad apostada</Label>
                        <Input value={cantidadApostada} onChange={handlerCantidadApostada} id="cantidadApostada" name="cantidadApostada" type="select">
                            <option value={500}>$500</option>
                            <option value={1000}>$1000</option>
                            <option value={2000}>$2000</option>
                        </Input>
                    </FormGroup>
                    <FormGroup >
                        <legend>Factor de apuesta</legend>
                        <FormGroup check>
                            <Input value={factorLocal} onChange={handleFactor} name="radio1" type="radio" defaultChecked/>
                            <Label check>Ganador equipo local: factor {factorLocal}</Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input value={factorEmpate} onChange={handleFactor} name="radio1" type="radio"/>
                            <Label check>Empate: factor {factorEmpate}</Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input value={factorVisita} onChange={handleFactor} name="radio1" type="radio"/>
                            <Label check>Ganador equipo visitante: factor {factorVisita}</Label>
                        </FormGroup>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={hanlerApostar}>Apostar</Button>
                <Button color="secondary" onClick={toggle}>Cancelar</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ApuestaModal;