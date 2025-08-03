import './index.css';  // importa o CSS dedicado
import { useState } from "react";
import type { ReactNode } from "react";


interface ModalButtonProps {
  title: string;
  modal: (props: { fechar: () => void }) => ReactNode;
}

export default function ModalButton({ title, modal }: ModalButtonProps) {
  const [mostrar, setMostrar] = useState(false);
  const abrir = () => setMostrar(true);
  const fechar = () => setMostrar(false);

  return (
    <>
      <button className='Button' onClick={abrir}>{title}</button>
      {mostrar && (
        <div style={overlay}>
          <div style={modalStyle}>
            {modal({ fechar })}
          </div>
        </div>
      )}
    </>
  );
}

const overlay = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  minWidth: "300px",
};

