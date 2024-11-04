function ClickCount(props) {
  const { setClickCount } = props;
  const onButtonClick = (e) => {
    setClickCount((prev) => prev + 1);
    e.preventDefault();
    console.log("clikk me");
  };

  return <button onClick={onButtonClick}>Clicked</button>;
}

export default ClickCount;
