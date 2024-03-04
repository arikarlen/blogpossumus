export default function Container({
  children,
  className = "",
  style = {},
  fluid = false,
  onClick,
  id="",
}) {
  return (
    <section
      onClick={onClick}
      className={`${
        !fluid && "container mr-auto ml-auto px-4"
      } ${className} `}
      style={style}
      id={id}
    >
      {children}
    </section>
  );
}
