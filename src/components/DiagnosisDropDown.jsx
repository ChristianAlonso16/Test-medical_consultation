import React from 'react';
import { ListGroup } from 'react-bootstrap';

const DiagnosisDropdown = ({ diagnosticos, filtro, onDiagnosticoSelect }) => {
  const handleDiagnosticoSelect = (diagnostico) => {
    onDiagnosticoSelect(diagnostico);
  };
  const filteredDiagnosticos = filtro
    ? diagnosticos.filter(diagnostico =>
        diagnostico.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
        diagnostico.catalog_key.toLowerCase().includes(filtro.toLowerCase())
      )
    : [];

  return (
    <div style={{ position: 'relative' }}>
      {filteredDiagnosticos.length > 0 && (
        <ListGroup style={{ position: 'absolute', top: '100%', left: 0, zIndex: 1, width: '100%' }}>
          {filteredDiagnosticos.map(diagnostico => (
            <ListGroup.Item
              key={diagnostico.catalog_key}
              onClick={() => handleDiagnosticoSelect(diagnostico)}
              style={{ cursor: 'pointer' }}
            >
              {diagnostico.catalog_key} - {diagnostico.nombre}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default DiagnosisDropdown;
