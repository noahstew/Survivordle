function HowToPlay() {
  return (
    <div className="text-lg bg-survivor-sand pt-10 px-6 pb-2 rounded-lg shadow-lg shadow-gray-700 flex flex-col items-center justify-center min-h-[60vh] border-4 border-survivor-orange relative">
      <div
        className="absolute -top-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg shadow-md text-2xl sm:text-3xl md:text-5xl font-bold text-black border-4 border-survivor-orange bg-white text-center whitespace-nowrap"
        style={{ minWidth: 'min(90vw, 420px)' }}
      >
        Welcome to <span className="text-survivor-orange">Survivordle</span>
      </div>
      <div className="w-full mx-auto ">
        <h2 className="text-xl sm:text-2xl md:text-3xl pb-4 mt-2 font-bold">
          How to Play:
        </h2>
        <p className="text-base sm:text-lg md:text-xl">
          <span className="bg-survivor-orange p-1 rounded-lg align-middle text-base sm:text-lg md:text-xl font-bold">
            GOAL:
          </span>{' '}
          Try and guess your favourite Survivor contestants in this wordle-style
          fan game!
        </p>
        <div className="border-black border-b-2 my-4"></div>
        <p className="text-base sm:text-lg md:text-xl">
          Choose a Survivor player and select guess. Depending on the attribute,
          you will get a hint of either{' '}
          <span className="bg-white p-1 rounded-lg align-middle text-base sm:text-lg md:text-xl font-bold">
            higher↑
          </span>
          ,{' '}
          <span className="bg-white p-1 rounded-lg align-middle text-base sm:text-lg md:text-xl font-bold">
            lower↓
          </span>
          ,{' '}
          <span className="bg-yellow-500 p-1 rounded-lg align-middle text-base sm:text-lg md:text-xl font-bold">
            similar
          </span>
          , or
          <span className="bg-survivor-green p-1 rounded-lg align-middle text-base sm:text-lg md:text-xl font-bold">
            correct
          </span>
          .
        </p>
        <div className="border-black border-b-2 my-4"></div>

        <h2 className="text-lg sm:text-2xl md:text-3xl pb-4 font-bold">
          Daily & Unlimited Modes
        </h2>
        <p className="text-base sm:text-lg md:text-xl">
          The{' '}
          <span className="bg-survivor-blue p-1 rounded-lg align-middle text-base sm:text-lg md:text-xl font-bold">
            daily
          </span>{' '}
          mode is a single game that resets every day, while the{' '}
          <span className="bg-survivor-green p-1 rounded-lg align-middle text-base sm:text-lg md:text-xl font-bold">
            unlimited
          </span>{' '}
          mode allows you to play as many games as you want. They are selectable
          at the top corner's of the page.
        </p>

        <div className="border-black border-b-2 my-4"></div>

        <p className="text-base sm:text-lg md:text-xl">
          <span className="bg-survivor-orange p-1 rounded-lg align-middle text-base sm:text-lg md:text-xl font-bold">
            ***NOTE:
          </span>{' '}
          Rules are slightly different for each game mode, see below for
          details.
        </p>
      </div>
    </div>
  );
}
export default HowToPlay;
