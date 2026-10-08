import { useState } from "react";

interface CounterMessageProps {
  counter: number;
  target: number;
}

function CounterMessage({ counter, target }: CounterMessageProps) {
  return (
    <div>
      {counter >= target ? "목표에 도달했습니다!" : "아직 도전 중입니다!"}
    </div>
  );
}

function App() {
  const [counter, setCounter] = useState(0);
  const handleOnClick = () => {
    setCounter(counter + 1);
  };

  const resetOnClickClear = () => {
    setCounter(0);
  };

  const handleOn3Click = () => {
    setCounter((prev) => prev + 1);
    setCounter((prev) => prev + 1);
    setCounter((prev) => prev + 1);
  };

  const handleOnClickDec = () => {
    if (counter === 0) return;
    setCounter((prev) => prev - 1);
  };

  return (
    <>
      <p>{counter}</p>
      <CounterMessage counter={counter} target={10} />
      <button onClick={handleOnClick}>+1</button>
      <button onClick={handleOn3Click}>+3</button>
      <button onClick={handleOnClickDec} disabled={counter === 0}>
        -1
      </button>
      <button onClick={resetOnClickClear}>초기화</button>
    </>
  );
}

export default App;
