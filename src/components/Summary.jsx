import React from 'react';

const Summary = ({ datosConsulta }) => {
  return (
    <div>
      <p>Nombre: {datosConsulta.nombre}</p>
      <p>Fecha de nacimiento: {datosConsulta.fechaNacimiento}</p>
      <p>Edad: {datosConsulta.edad}</p>
      <p>Sexo: {datosConsulta.sexo}</p>
      <p>Temperatura: {datosConsulta.temperatura}</p>
      <p>Estatura: {datosConsulta.estatura}</p>
      <p>Peso: {datosConsulta.peso}</p>
      <p>Saturación de oxígeno: {datosConsulta.saturacionOxigeno}</p>
      <p>Motivo de consulta: {datosConsulta.motivoConsulta}</p>
      <p>Padecimiento: {datosConsulta.filtroDiagnostico}</p>
    </div>
  );
};

export default Summary;
