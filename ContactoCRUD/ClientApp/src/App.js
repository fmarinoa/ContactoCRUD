import { Button, Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap"
import TablaContacto from "./Components/TablaContacto";
import { useEffect, useState } from "react";
import ModalContacto from "./Components/ModalContacto";
import './style/stiles.css'; // Importa el archivo CSS de estilos personalizados


const App = () => {

  const [contactos, setContactos] = useState([])
  const [mostrarModal, setMostrarModal] = useState(false)
  const [editar, setEditar] = useState(null)

  const obtenerContactos = async () => {
    const response = await fetch("api/contacto/Lista")
    if (response.ok) {
      const data = await response.json();
      setContactos(data)
    } else {
      console.log("error en la lista")
    }
  }

  useEffect(() => {
    obtenerContactos()
  }, [])

  const guardarContacto = async (contacto) => {
    const response = await fetch("api/contacto/Guardar", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(contacto)
    })
    if (response.ok) {
      setMostrarModal(!mostrarModal);
      obtenerContactos();
    }
  }

  const editarContacto = async (contacto) => {
    const response = await fetch("api/contacto/Editar", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(contacto)
    })
    if (response.ok) {
      setMostrarModal(!mostrarModal);
      obtenerContactos();
    }
  }

  const eliminarContacto = async (id) => {
    let respuesta = window.confirm("¿Desea eliminar el contacto?")
    if (!respuesta) {
      return;
    }

    const response = await fetch("api/contacto/Eliminar/" + id, {
      method: 'DELETE',
    })
    if (response.ok) {
      obtenerContactos();
    }
  }

  return (
    <div className="main-container">
      <Container className="flex-grow-1">
        <Row className="mt-5">
          <Col sm="12">
            <Card className="card">
              <CardHeader>
                <h2>Mis Contactos</h2>
              </CardHeader>
              <CardBody >
                <Button className="buttonGreen" size="l" color="success" onClick={() => setMostrarModal(!mostrarModal)}>Nuevo contacto</Button>
                <hr />
                <TablaContacto className="table-contactos"
                  data={contactos}
                  setEditar={setEditar}
                  mostrarModal={mostrarModal}
                  setMostrarModal={setMostrarModal}
                  eliminarContacto={eliminarContacto} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <ModalContacto

          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          guardarContacto={guardarContacto}
          editar={editar}
          setEditar={setEditar}
          editarContacto={editarContacto}
        />
      </Container>
      <footer className="footer">
        <div className="container">
          <p >
            Un proyecto de Franco Mariño -{' '}
            <a
              href="https://github.com/francoedson"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>{' '}
            |{' '}
            <a
              href="https://www.linkedin.com/in/franco-mari%C3%B1o-2a289620a/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </p>
        </div>
      </footer>
    </div>

  )
}

export default App;