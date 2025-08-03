import './index.css';  // importa o CSS dedicado

export default function Button({ title = "Enviar" }) {
  return (
    <button type="submit" className="Button">
      {title}
    </button>
  );
}
