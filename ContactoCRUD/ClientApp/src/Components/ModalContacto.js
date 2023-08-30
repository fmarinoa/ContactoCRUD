import { useEffect, useState } from "react"
import { Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Input, ModalFooter, Button } from "reactstrap"
import '../style/stiles.css'; // Importa el archivo CSS de estilos personalizados


const modeloContacto = {
    idContacto: 0,
    nombre: "",
    correo: "",
    telefono: ""
}

const ModalContacto = ({ mostrarModal, setMostrarModal, guardarContacto, editar, setEditar, editarContacto }) => {

    const [contacto, setContacto] = useState(modeloContacto);
    const [errorNombre, setErrorNombre] = useState("");
    const [errorCorreo, setErrorCorreo] = useState(""); // Nuevo estado para el mensaje de error del correo
    const [errorTelefono, setErrorTelefono] = useState(""); // Nuevo estado para el mensaje de error del correo

    const actualizarDato = (e) => {
        const { name, value } = e.target;
        // Limpiar los mensajes de error correspondientes cuando se modifica el campo
        if (name === "correo") {
            setErrorCorreo("");
        } else if (name === "telefono") {
            setErrorTelefono("");
        } else if (name === "nombre") {
            setErrorNombre("");
        }
        setContacto({ ...contacto, [name]: value });
    };

    useEffect(() => {
        // Limpiar los mensajes de error cuando se abre el modal
        setErrorNombre("");
        setErrorCorreo("");
        setErrorTelefono("");
    
        if (editar != null) {
          // Si estamos en modo edición, cargar los datos del contacto existente
          setContacto(editar);
        } else {
          // Si estamos en modo agregar, restablecer los campos a valores iniciales (vacíos)
          setContacto(modeloContacto);
        }
      }, [mostrarModal, editar]);

    const validarCorreo = (correo) => {
        // Expresión regular para validar el formato de correo electrónico
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(correo);
    };

    const enviarDatos = () => {
        if (contacto.idContacto === 0) {
            // Validar los campos al agregar un nuevo contacto
            if (
                contacto.nombre.trim() !== "" &&
                validarCorreo(contacto.correo) &&
                contacto.telefono.length >= 9
            ) {
                // Limpiar los mensajes de error
                setErrorNombre("");
                setErrorCorreo("");
                setErrorTelefono("");

                // Llamar a guardarContacto para agregar un nuevo contacto
                guardarContacto(contacto);

                // Restablecer los campos a sus valores iniciales (vacíos)
                setContacto(modeloContacto);
            } else {
                // Mostrar mensajes de error si algún campo es inválido
                if (contacto.nombre.trim() === "") {
                    setErrorNombre("El nombre es obligatorio.");
                } else {
                    setErrorNombre("");
                }

                if (!validarCorreo(contacto.correo)) {
                    setErrorCorreo("Ingrese una dirección de correo válida.");
                } else {
                    setErrorCorreo("");
                }

                if (contacto.telefono.length < 9) {
                    setErrorTelefono("El número de teléfono debe tener al menos 9 dígitos.");
                } else {
                    setErrorTelefono("");
                }
            }
        } else if (editar != null) {
            // Validar los campos al editar un contacto
            if (
                contacto.nombre.trim() !== "" &&
                validarCorreo(contacto.correo) &&
                contacto.telefono.length >= 9
            ) {
                // Limpiar los mensajes de error
                setErrorNombre("");
                setErrorCorreo("");
                setErrorTelefono("");

                // Llamar a editarContacto para editar el contacto existente
                editarContacto(contacto);

                // Restablecer los campos a sus valores iniciales (vacíos)
                setContacto(modeloContacto);
                setEditar(null); // Salir del modo de edición
                setMostrarModal(false); // Cerrar el modal
            } else {
                // Mostrar mensajes de error si algún campo es inválido
                if (contacto.nombre.trim() === "") {
                    setErrorNombre("El nombre es obligatorio.");
                } else {
                    setErrorNombre("");
                }

                if (!validarCorreo(contacto.correo)) {
                    setErrorCorreo("Ingrese una dirección de correo válida.");
                } else {
                    setErrorCorreo("");
                }

                if (contacto.telefono.length < 9) {
                    setErrorTelefono("El número de teléfono debe tener al menos 9 dígitos.");
                } else {
                    setErrorTelefono("");
                }
            }
        }
    };


    useEffect(() => {
        if (editar != null) {
            setContacto(editar)
        } else {
            setContacto(modeloContacto)
        }
    }, [editar])

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal)
        setEditar(null)
    }

    return (
        <Modal isOpen={mostrarModal}>
            <ModalHeader>
                {contacto.idContacto == 0 ? "Nuevo Contacto" : "Editar Contacto"}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input type="text" name="nombre" onChange={(e) => actualizarDato(e)} value={contacto.nombre}></Input>
                        {errorNombre && (
                            <span className="text-danger">{errorNombre}</span>
                        )}
                    </FormGroup>

                    <FormGroup>
                        <Label>Correo</Label>
                        <Input
                            type="email"
                            name="correo"
                            onChange={(e) => actualizarDato(e)}
                            value={contacto.correo}
                            invalid={errorCorreo !== ""}
                        ></Input>
                        {errorCorreo && (
                            <span className="text-danger">{errorCorreo}</span>
                        )}
                    </FormGroup>

                    <FormGroup>
                        <Label>Teléfono</Label>
                        <Input
                            type="number"
                            min="0"
                            name="telefono"
                            onChange={(e) => actualizarDato(e)}
                            value={contacto.telefono}
                            pattern="9\d{8,}"
                        ></Input>
                        {errorTelefono && (
                            <span className="text-danger">{errorTelefono}</span>
                        )}
                    </FormGroup>

                </Form>
            </ModalBody>
            <ModalFooter>
                <Button className="buttonBlue" color="primary" size="sm" onClick={enviarDatos}>Guardar</Button>
                <Button className="buttonRed" color="danger" size="sm" onClick={cerrarModal}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalContacto;