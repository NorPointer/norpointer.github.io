import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/mastermind/')({
  component: FirstPage,
});

enum MastermindColors {
  Blue,
  Green,
  Yellow,
  Red,
  Pink,
  Purple,
}

function FirstPage() {
  const numColors = 6;
  const codeLength = 4;
  const code: Array<MastermindColors> = getRandomCode(codeLength);

  function randIntMax(max: number) {
    return Math.floor(Math.random() * max);
  }

  function getRandomCode(length: number) {
    const randomCode: Array<MastermindColors> = [];
    for (let i = 0; i < length; i++) {
      randomCode.push(randIntMax(numColors));
    }
    return randomCode;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
      <p>Hello mastermind!</p>
      <div>Your random code is:</div>
      <div>{code.map((color) => color.toString())}</div>
      <input
        className="bg-[#282c34]"
        type="number"
        id="guessInput"
        minLength={4}
        maxLength={4}
        size={10}
      />
    </div>
  );
}
