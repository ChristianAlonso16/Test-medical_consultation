import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import DiagnosisDropdown from './DiagnosisDropDown';
import diagnosisData from '../data/diagnosis_data.json';

const Formulario = ({ onGuardarConsulta }) => {
  const [diagnosticos, setDiagnosticos] = useState([]);
  const [filtroDiagnostico, setFiltroDiagnostico] = useState('');
  const [sexo, setSexo] = useState('');
  const [edad, setEdad] = useState('');
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [estatura, setEstatura] = useState('');
  const [peso, setPeso] = useState('');
  const [saturacionOxigeno, setSaturacionOxigeno] = useState('');
  const [motivoConsulta, setMotivoConsulta] = useState('');

  useEffect(() => {
    setDiagnosticos(diagnosisData);
  }, []);

  
  const handleSexoChange = e => {
    setSexo(e.target.value);
  };

  
  const calcularEdad = (fechaNacimiento) => {
    const fechaActual = new Date();
    const fechaNac = new Date(fechaNacimiento);
    
    if (fechaNac > fechaActual) {
        alert("La fecha de nacimiento no puede ser mayor que la fecha actual");
        return 0;
    }
  
    const anioActual = fechaActual.getFullYear();
    const anioNac = fechaNac.getFullYear();
    const mesActual = fechaActual.getMonth() + 1;
    const mesNac = fechaNac.getMonth() + 1;
    const diaActual = fechaActual.getDate();
    const diaNac = fechaNac.getDate();
  
    let edad = 0;
    edad = anioActual - anioNac;
  
    let meses = mesActual - mesNac;
    if (meses < 0 || (meses === 0 && diaActual < diaNac)) {
        edad--; 
        meses = (mesActual + 12) - mesNac; 
    }
  
    let dias = diaActual - diaNac;
    if (edad > 0) {
        return `${edad} años`;
    } else if (meses > 0) {
        return `${meses} meses`;
    } else {
        return `${dias} días`;
    }
};

  
  const handleFechaNacimientoChange = (e) => {
    const fechaIngresada = e.target.value;
    setFechaNacimiento(fechaIngresada);
    
    const edadCalculada = calcularEdad(fechaIngresada);
    setEdad(edadCalculada); 
  };

  const handleDiagnosticoSelect = (diagnostico) => {
    setFiltroDiagnostico(`${diagnostico.catalog_key} - ${diagnostico.nombre}`);
  };
  
  const filtrarDiagnosticos = () => {
    return diagnosticos.filter(diagnostico => {
      const { linf, lsup, lsex } = diagnostico;
  
      const convertirEdad = (edadString) => {
        const valorNumerico = parseInt(edadString.substring(0, 3), 10);
        const unidad = edadString.substring(3);
  
        switch (unidad) {
          case 'H':
            return valorNumerico / 24 / 365; 
          case 'D':
            return valorNumerico / 365; 
          case 'M':
            return valorNumerico / 12; 
          case 'A':
            return valorNumerico;
          default:
            return 0;
        }
      };
  
      const sexoValido = lsex === 'NO' || lsex === sexo;
      let edadEnAnios = calcularEdad(fechaNacimiento);
      if (edadEnAnios.includes("años")) {
          edadEnAnios = parseInt(edadEnAnios); 
      } else if (edadEnAnios.includes("meses")) {
          const meses = parseInt(edadEnAnios);
          edadEnAnios = meses / 12;
      } else if (edadEnAnios.includes("días")) {
          const dias = parseInt(edadEnAnios);
          edadEnAnios = dias / 365;
      }

      let edadValida = false;
      if (linf !== 'NO' && lsup !== 'NO') {
        const edadMinima = convertirEdad(linf);
        const edadMaxima = convertirEdad(lsup);
        edadValida = edadEnAnios >= edadMinima && edadEnAnios <= edadMaxima;
      } else {
        edadValida = true; 
       }
  
      return edadValida && sexoValido;
    });
  };
  
  const validarFormulario = () => {
    const fechaActual = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let validDate = true;
    if (fechaNac > fechaActual) {
      validDate=false;
    }  
      return (
      nombre !== '' &&
      fechaNacimiento !== '' &&
      validDate &&
      sexo !== '' &&
      temperatura !== '' &&
      estatura !== '' &&
      peso !== '' &&
      saturacionOxigeno !== '' &&
      filtroDiagnostico !== ''
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const datosConsulta = {
      nombre,
      fechaNacimiento,
      edad,
      sexo,
      temperatura,
      estatura,
      peso,
      saturacionOxigeno,
      motivoConsulta,
      filtroDiagnostico
    };
    onGuardarConsulta(datosConsulta);
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Nombre Completo:</Form.Label>
          <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Fecha de Nacimiento:</Form.Label>
          <Form.Control type="date" value={fechaNacimiento} onChange={handleFechaNacimientoChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Sexo:</Form.Label>
          <Form.Control as="select" onChange={handleSexoChange}>
            <option value="">Seleccione</option>
            <option value="MUJER">Mujer</option>
            <option value="HOMBRE">Hombre</option>
          </Form.Control>
        </Form.Group>


        <Form.Group>
          <Form.Label>Temperatura:</Form.Label>
          <Form.Control type="text" value={temperatura} required onChange={(e) => setTemperatura(e.target.value)} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Estatura:</Form.Label>
          <Form.Control type="number" min={1} required value={estatura} onChange={(e) => setEstatura(e.target.value)} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Peso:</Form.Label>
          <Form.Control type="number" min={1} required value={peso} onChange={(e) => setPeso(e.target.value)} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Saturación de Oxígeno:</Form.Label>
          <Form.Control type="text" required value={saturacionOxigeno} onChange={(e) => setSaturacionOxigeno(e.target.value)} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Motivo de Consulta:</Form.Label>
          <Form.Control type="text"  value={motivoConsulta} onChange={(e) => setMotivoConsulta(e.target.value)} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Diagnóstico:</Form.Label>
          <Form.Control
            type="text"
            value={filtroDiagnostico}
            onChange={e => setFiltroDiagnostico(e.target.value)}
          />
          <DiagnosisDropdown
            diagnosticos={filtrarDiagnosticos()}
            filtro={filtroDiagnostico}
            onDiagnosticoSelect={handleDiagnosticoSelect}
          />
        </Form.Group>

        <Button className='mt-2' type="submit" variant="secondary" disabled={!validarFormulario()}>Guardar Consulta</Button>
      </Form>
    </div>
  );
};

export default Formulario;
