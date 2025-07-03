import GameMode from './GameMode';
import HowToPlay from './HowToPlay';
import { gameModes } from '@/data/gameModes';

function Hero() {
  return (
    <div className="bg-survivor-sand-light p-6 md:p-8 lg:p-12 pt-16">
      <HowToPlay />
      <div className="flex flex-col gap-8 md:flex-row md:gap-8 md:justify-center mt-16">
        <GameMode
          title={gameModes[0]?.title}
          description={gameModes[0]?.description}
          colour={gameModes[0]?.colour}
          dailyLink={gameModes[0]?.dailyLink}
          unlimitedLink={gameModes[0]?.unlimitedLink}
        />
        <GameMode
          title={gameModes[1]?.title}
          description={gameModes[1]?.description}
          colour={gameModes[1]?.colour}
          dailyLink={gameModes[1]?.dailyLink}
          unlimitedLink={gameModes[1]?.unlimitedLink}
        />
      </div>
    </div>
  );
}
export default Hero;
