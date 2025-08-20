import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import ColorPeg from '../../components/mastermind/ColorPeg';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const Route = createFileRoute('/mastermind/')({
  component: Mastermind,
});

// Define the available colors for the game
const availableColors = [
  'bg-red-600',
  'bg-green-600',
  'bg-blue-600',
  'bg-yellow-400',
  'bg-orange-600',
  'bg-purple-600',
];

type Guess = {
  code: Array<number>;
  whites: number;
  reds: number;
};

function Mastermind() {
  const numColors = 6;
  const codeLength = 4;
  const maxGuesses = 12;

  const [code, _] = useState<Array<number>>(getRandomCode(codeLength));
  const [currentGuess, setCurrentGuess] = useState<Array<number | null>>([
    null,
    null,
    null,
    null,
  ]);
  const [guesses, setGuesses] = useState<Array<Guess>>([]);
  const [finished, setFinished] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    checkIfPlayerIsFinished();
  }, [guesses]);

  function randIntMax(max: number): number {
    return Math.floor(Math.random() * max);
  }

  function getRandomCode(length: number): Array<number> {
    const randomCode: Array<number> = [];
    for (let i = 0; i < length; i++) {
      randomCode.push(randIntMax(numColors));
    }
    return randomCode;
  }

  function checkIfPlayerIsFinished() {
    console.log(guesses.length);
    if (guesses.length === 0) return;
    if (guesses[guesses.length - 1].reds === codeLength) {
      setWon(true);
      setFinished(true);
    } else if (guesses.length >= maxGuesses) {
      setFinished(true);
    }
  }

  function handleGuess() {
    if (currentGuess.indexOf(null) >= 0) return;
    const guess = currentGuess as Array<number>;
    const redsCount = guess
      .map((num, i): number => (num === code[i] ? 1 : 0))
      .reduce((sum, a) => sum + a, 0);
    let whitesCount = 0;

    if (redsCount !== 4) {
      const codeCopy = [...code];
      for (const digit of guess) {
        const index = codeCopy.indexOf(digit);
        if (index >= 0) {
          whitesCount++;
          codeCopy.splice(index, 1);
        }
      }
      whitesCount -= redsCount;
    }

    setGuesses([
      ...guesses,
      { code: guess, whites: whitesCount, reds: redsCount },
    ]);
    setCurrentGuess([null, null, null, null]);
  }

  function handleSetPin(color: number) {
    const index = currentGuess.indexOf(null);
    if (index === -1) return;
    const newCurrentGuess = currentGuess;
    newCurrentGuess[index] = color;
    setCurrentGuess([...newCurrentGuess]);
  }

  function handleUnsetPin(pin: number) {
    const newCurrentGuess = currentGuess;
    newCurrentGuess[pin] = null;
    setCurrentGuess([...newCurrentGuess]);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-[#282c34] text-white font-inter p-4 sm:p-6 md:p-8">
      {/* Title */}
      <div className="mb-8 mt-4">
        <p className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 rounded-md">
          Mastermind
        </p>
      </div>

      {/* Main game area */}
      <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-8 w-full max-w-6xl">
        {/* Game board */}
        <Card className="p-4">
          {/* Previous guesses */}
          <div className="flex flex-col-reverse justify-end min-h-[400px] max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {guesses.map((guess, i) => (
              <div key={i} className="flex justify-center">
                <span className="text-gray-400 pr-2">{guess.code}</span>
                <span className="pr-2">{guess.whites}</span>
                <span className="text-red-600">{guess.reds}</span>
              </div>
            ))}
          </div>

          {/* Current guess input area */}
          <div className="flex">
            {currentGuess.map((e, i) => (
              <ColorPeg
                key={i}
                color={`${e !== null ? availableColors[e] : 'bg-gray-800'}`}
                size="h-12 w-12"
                onClick={() => handleUnsetPin(i)}
                cursor={e !== null}
                className="mx-2"
              />
            ))}
          </div>
          <Button disabled={finished} onClick={handleGuess}>
            Guess
          </Button>
          {finished ? (
            won ? (
              <div>Smart! You won in {guesses.length} guesses :D</div>
            ) : (
              <div>Stupid! You lost XD</div>
            )
          ) : (
            <div></div>
          )}
        </Card>

        {/* Color palette on right */}
        <div className="flex flex-col items-center bg-gray-900 p-6 rounded-xl shadow-lg mt-8 lg:mt-0">
          <p className="text-lg font-semibold mb-4 text-gray-300">
            Available Colors
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-4">
            {availableColors.map((color, index) => (
              <ColorPeg
                key={index}
                color={color}
                size="h-12 w-12"
                onClick={() => {
                  handleSetPin(index);
                }}
                cursor
                className="hover:scale-110 active:scale-95 transform transition-transform duration-100"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
