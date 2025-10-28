"use client";

import Score from "./Score";
import ClickButton from "./ClickButton";
import Shop from "./Shop";
import Stats from "./Stats";
import GameLoop from "./GameLoop";
import Settings from "./Settings";

const Home = () => {
  return (
    <main>
      <div className="fixed top-0 right-0">
        <Settings />
      </div>
      <div className="flex flex-col items-center justify-center h-screen">
        <GameLoop />
        <Score />
        <ClickButton />
        <Shop />
        <Stats />
      </div>
    </main>
  );
};

export default Home;
