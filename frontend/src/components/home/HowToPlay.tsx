function HowToPlay() {
  return (
    <div className="text-lg bg-survivor-sand p-6 rounded-lg shadow-lg shadow-gray-700">
      <h1 className="text-6xl font-bold mb-4 text-center p-4">
        Welcome to <span className="text-survivor-orange">Survivordle</span>
      </h1>
      <h2 className="text-4xl pb-4">How to Play</h2>
      <p>
        <span className="bg-survivor-orange p-2 rounded-lg ">GOAL:</span> Try
        and guess your favourite Survivor contestants in this wordle-style fan
        game!
      </p>
      <div className="border-black border-b-2 my-4"></div>
      <p>
        Choose a Survivor player and select guess. Depending on the attribute,
        you will get a hint of either{' '}
        <span className="bg-white p-2 rounded-lg">higher ↑</span>,{' '}
        <span className="bg-white p-2 rounded-lg">lower ↓</span>,{' '}
        <span className="bg-yellow-500 p-2 rounded-lg">similar</span>, or
        <span className="bg-survivor-green p-2 rounded-lg">correct</span>.
      </p>
      <div className="border-black border-b-2 my-4"></div>

      <h2 className="text-4xl pb-4">Daily & Unlimited Modes</h2>
      <p>
        The <span className="bg-survivor-blue p-2 rounded-lg">daily</span> mode
        is a single game that resets every day, while the{' '}
        <span className="bg-survivor-green p-2 rounded-lg">unlimited</span> mode
        allows you to play as many games as you want. They are selectable at the
        top corner's of the page.
      </p>

      <div className="border-black border-b-2 my-4"></div>

      <p>
        <span className="bg-survivor-orange p-2 rounded-lg ">***NOTE:</span>{' '}
        Rules are slightly different for each game mode, see below for details.
      </p>
    </div>
  );
}
export default HowToPlay;
