"use client";

import Score from "./Score";
import ClickButton from "./ClickButton";
import Shop from "./Shop";
import Stats from "./Stats";
import GameLoop from "./GameLoop";

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <GameLoop />
      <Score />
      <ClickButton />
      <Shop />
      <Stats />
    </main>
  );
};

export default Home;
