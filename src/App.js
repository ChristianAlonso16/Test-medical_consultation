import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './components/Form';
import Summary from './components/Summary';

function App() {
  const [datosConsulta, setDatosConsulta] = useState(null);

  const handleGuardarConsulta = (datos) => {
    setDatosConsulta(datos);
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Consulta Médica</h1>
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="bg-light p-4 rounded shadow">
            <h2 className="text-center mb-4">Registro de Consulta</h2>
            <Form onGuardarConsulta={handleGuardarConsulta} />
          </div>
        </Col>
      </Row>
      {datosConsulta && (
        <Row className="mt-5">
          <Col md={6} className="mx-auto">
            <div className="bg-light p-4 rounded shadow">
              <h2 className="text-center mb-4">Resumen de la Consulta</h2>
              <Summary datosConsulta={datosConsulta} />
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default App;
