import "./Titulo.css";

function Titulo({children, name}) {
  return (
    <div className="title">
        {children}
      <span>{name}</span>
    </div>
  );
}

export default Titulo;
