import { useEffect, useState } from "react";

interface Advice {
  id: number;
  advice: string;
}

function App() {
  const [adviceData, setAdviceData] = useState<Advice>({
    id: 0,
    advice: "Loading advice...",
  });

  async function getAdvice() {
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json();
      setAdviceData({ id: data.slip.id, advice: data.slip.advice });
    } catch (error) {
      console.error("Failed to fetch advice: ", error);
    }
  }

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center text-white w-full h-screen bg-darkGray">
      <div className="bg-midGray relative p-6 rounded-xl shadow-md mx-auto max-w-100 md:max-w-xl flex flex-col items-center space-y-8">
        <div className="text-hospitalGreen uppercase tracking-widest text-xs">
          Advice #{adviceData.id}
        </div>
        <div className="text-3xl mx-4 text-center">"{adviceData.advice}"</div>
        <img
          className="hidden md:block"
          src="/images/pattern-divider-desktop.svg"
          alt=""
        />
        <img
          className="block md:hidden"
          src="/images/pattern-divider-desktop.svg"
          alt=""
        />
        <button onClick={getAdvice} className="absolute -bottom-6 dice-button">
          <img src="/images/icon-dice.svg" alt="" />
        </button>
      </div>
    </div>
  );
}

export default App;
