import { Button, Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap"
import TablaContacto from "./Components/TablaContacto";
import { useEffect, useState } from "react";
import ModalContacto from "./Components/ModalContacto";
import './style/stiles.css';


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

  const exportarExcel = async () => {
    const response = await fetch("api/contacto/ExportarExcel", {
      method: 'GET',
      responseType: 'blob', // Para manejar la respuesta como un blob (archivo binario)
    });

    if (response.ok) {
      // Crear un enlace temporal para descargar el archivo
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Contactos.xlsx'; // Nombre del archivo a descargar
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      console.log("Error al exportar a Excel");
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
                <div className="d-flex justify-content-between align-items-center">
                <Button 
                  className="buttonGreen" 
                  size="l" 
                  color="success" 
                  onClick={() => setMostrarModal(!mostrarModal)}
                >
                  Nuevo contacto
                  </Button>
                <Button
                  className="buttonBlue"
                  size="sm"
                  color="info"
                  onClick={exportarExcel}
                >
                  Exportar a Excel
                </Button>
                </div>
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