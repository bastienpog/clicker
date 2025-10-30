"use client";

import Score from "./Score";
import Planet from "./Planet";
import Shop from "./Shop";
import Stats from "./Stats";
import GameLoop from "./GameLoop";
import Settings from "./Settings";
import Achievements from "./Achievements";

const Home = () => {
  return (
    <main>
      <div className="fixed top-0 right-0">
        <Settings />
      </div>
      <div className="flex flex-col items-center justify-center h-screen">
        <GameLoop />
        <Score />
        <Planet />
        <Shop />
        <div className="flex flex-row space-x-40">
          <Stats />
          <Achievements />
        </div>
      </div>
    </main>
  );
};

export default Home;
