import { useState, useEffect } from "react";
import { CardData } from "./data/CardData";
import { DisplayState } from "./data/DisplayState";
import data from "./data/data.json";
import Card from "./components/Card";
import { ToggleButton } from "./ui/ToggleButton";
import { DisplayControlButton } from "./ui/DisplayControlButton";

function App() {
  const [cards, setCards] = useState([]);
  const [displayState, setDisplayState] = useState(DisplayState.all);

  // Read the card data from data.json.
  useEffect(() => {
    const cardData = data.map(
      (item, idx) => new CardData(idx, item.logo, item.name, item.description)
    );

    setCards(cardData);
  }, []);

  function removeCard(id) {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  }

  return (
    <div className="min-h-screen w-full gradient-bg">
      <div className="container mx-auto pt-8">
        <section id="header" className="section-autosize flex justify-center">
          <div className="flex flex-row justify-between w-full bg-primary rounded-xl p-2 mx-4">
            <div className="flex items-center gap-2">
              <img
                src="assets/images/logo.svg"
                alt="Company logo"
                className="h-8 w-8"
              />
              <h1 className="font-bold text-xl">Extensions</h1>
            </div>

            <ToggleButton />
          </div>
        </section>
        <section className="mt-16 section-autosize">
          <div id="display-controls">
            <h1 className="font-bold text-3xl">Extensions List</h1>
            <div id="controls-buttons" className="flex gap-3">
              <DisplayControlButton
                active={displayState === DisplayState.all}
                onClick={() => setDisplayState(DisplayState.all)}
              >
                All
              </DisplayControlButton>
              <DisplayControlButton
                active={displayState === DisplayState.active}
                onClick={() => setDisplayState(DisplayState.active)}
              >
                Active
              </DisplayControlButton>
              <DisplayControlButton
                active={displayState === DisplayState.inactive}
                onClick={() => setDisplayState(DisplayState.inactive)}
              >
                Inactive
              </DisplayControlButton>
            </div>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                displayState={displayState}
                removeSelf={() => removeCard(card.id)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
