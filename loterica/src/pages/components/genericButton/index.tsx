import './index.css';  // importa o CSS dedicado

interface GenButtonProps {
  title?: string;
  onClick?: () => void; // função opcional
}

export default function GenButton({ title = "Enviar", onClick }: GenButtonProps) {
  return (
    <button
      type="submit"
      className="Button"
      onClick={onClick} // será undefined se não for passada
    >
      {title}
    </button>
  );
}
