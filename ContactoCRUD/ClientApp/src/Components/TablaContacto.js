import { Button, Table } from "reactstrap"
import '../style/stiles.css'; // Importa el archivo CSS de estilos personalizados


const TablaContacto = ({ data, setEditar, mostarModal, setMostrarModal,eliminarContacto }) => {

    const enviarDatos = (contacto) => {
        setEditar(contacto)
        setMostrarModal(!mostarModal)

    }

    return (
        <Table striped responsive>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    (data.length < 1) ? (
                        <tr>
                            <td colSpan="4">Sin registros</td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item.idContacto}>
                                <td>{item.nombre}</td>
                                <td>{item.correo}</td>
                                <td>{item.telefono}</td>
                                <td>
                                    <Button className="buttonBlue me-2" color="primary" size="sm" 
                                        onClick={() => enviarDatos(item)}
                                        >Editar</Button>
                                    <Button className="buttonRed" color="danger" size="sm"
                                        onClick={()=>eliminarContacto(item.idContacto)}
                                        >Eliminar</Button>
                                </td>
                            </tr>
                        ))
                    )
                }
            </tbody>
        </Table>
    )
}

export default TablaContacto;