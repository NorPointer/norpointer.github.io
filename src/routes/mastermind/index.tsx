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
  const [currentGuessIsEmpty, setCurrentGuessIsEmpty] = useState<boolean>();
  const [currentGuessIsFull, setCurrentGuessIsFull] = useState<boolean>();
  const [guesses, setGuesses] = useState<Array<Guess>>([]);
  const [finished, setFinished] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    checkIfPlayerIsFinished();
  }, [guesses]);

  useEffect(() => {
    setCurrentGuessIsEmpty(currentGuess.every(el => el === null));
    setCurrentGuessIsFull(currentGuess.every(el => el !== null))
  }, [currentGuess]);

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
    handleClearCurrentGuess();
  }

  function handleSetPeg(color: number) {
    const index = currentGuess.indexOf(null);
    if (index === -1) return;
    const newCurrentGuess = currentGuess;
    newCurrentGuess[index] = color;
    setCurrentGuess([...newCurrentGuess]);
  }

  function handleUnsetPeg(peg: number) {
    const newCurrentGuess = currentGuess;
    newCurrentGuess[peg] = null;
    setCurrentGuess([...newCurrentGuess]);
  }

  function handleClearCurrentGuess() {
    setCurrentGuess([null, null, null, null]);
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
          <div className="flex flex-col justify-start min-h-[770px] max-h-[770px] overflow-y-auto pr-2 custom-scrollbar mt-1">
            {guesses.map((guess, i) => (
              <div className="flex pb-3" key={i}>
                {guess.code.map((e, j) => (
                  <ColorPeg
                    key={j}
                    color={`${availableColors[e]}`}
                    size="h-12 w-12"
                    onClick={() => {}}
                    className="mx-2"
                  />
                ))}
                <span className="pr-2">{guess.whites}</span>
                <span className="text-red-600">{guess.reds}</span>
              </div>
            ))}
            {[...Array(maxGuesses - guesses.length)].map((_, i) => (
              <div className="flex pb-3" key={guesses.length + i}>
                {[...Array(4)].map((_, j) => (
                  <ColorPeg
                    key={j}
                    color={'bg-gray-800'}
                    size="h-12 w-12"
                    onClick={() => {}}
                    className="mx-2"
                  />
                ))}
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
                onClick={() => handleUnsetPeg(i)}
                cursor={e !== null}
                className="mx-2"
              />
            ))}
          </div>
          <div className="grid grid-cols-4 gap-2">
            <Button
              className="col-span-3"
              disabled={finished || !currentGuessIsFull}
              onClick={handleGuess}
            >
              Guess
            </Button>
            <Button
              className="col-span-1"
              variant="outline"
              disabled={currentGuessIsEmpty}
              onClick={handleClearCurrentGuess}
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m18 9-.84 8.398c-.127 1.273-.19 1.909-.48 2.39a2.5 2.5 0 0 1-1.075.973C15.098 21 14.46 21 13.18 21h-2.36c-1.279 0-1.918 0-2.425-.24a2.5 2.5 0 0 1-1.076-.973c-.288-.48-.352-1.116-.48-2.389L6 9m7.5 6.5v-5m-3 5v-5m-6-4h4.615m0 0 .386-2.672c.112-.486.516-.828.98-.828h3.038c.464 0 .867.342.98.828l.386 2.672m-5.77 0h5.77m0 0H19.5" />
              </svg>
            </Button>
          </div>
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
                  handleSetPeg(index);
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
