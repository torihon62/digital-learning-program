export const Overlay = (props) => {
  const handleOnClick = () => {
    props.onClick();
  };
  return (
    <div
      onClick={handleOnClick}
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "white",
        zIndex: 9999,
      }}
    >
      <p style={{ fontSize: "xx-large" }}>
        がめんを タップして はじめてください
      </p>
    </div>
  );
};
