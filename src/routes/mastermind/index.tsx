import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Route = createFileRoute('/mastermind/')({
  component: Mastermind,
});

enum MastermindColors {
  Blue,
  Green,
  Yellow,
  Red,
  Pink,
  Purple,
}

type Guess = {
  code: string;
  whites: number;
  reds: number;
};

function Mastermind() {
  const numColors = 6;
  const codeLength = 4;
  const maxGuesses = 12;

  const [code, _] = useState<Array<MastermindColors>>(
    getRandomCode(codeLength),
  );
  const [guessInput, setGuessInput] = useState('');
  const [guesses, setGuesses] = useState<Array<Guess>>([]);
  const [finished, setFinished] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    checkIfPlayerIsFinished();
  }, [guesses]);

  function randIntMax(max: number): number {
    return Math.floor(Math.random() * max);
  }

  function getRandomCode(length: number): Array<MastermindColors> {
    const randomCode: Array<MastermindColors> = [];
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
    const guess = guessInput.split('').map((e) => Number(e));
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
      { code: guessInput, whites: whitesCount, reds: redsCount },
    ]);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-[#282c34] text-white text-[calc(10px+2vmin)]">
      <div>
        <div className="pt-30">
          <p>Mastermind</p>
        </div>
      </div>
      <div>
        <div className="pb-40">
          <div className="flex flex-col pb-2">
            {guesses.map((guess, i) => (
              <div key={i} className="flex justify-center">
                <span className="text-gray-400 pr-2">{guess.code}</span>
                <span className="pr-2">{guess.whites}</span>
                <span className="text-red-600">{guess.reds}</span>
              </div>
            ))}
          </div>
          <div className="pb-2">
            <Input
              className="bg-[]"
              type="text"
              id="guessInput"
              minLength={4}
              maxLength={4}
              size={10}
              disabled={finished}
              value={guessInput}
              onChange={(e) => {
                const onlyNums = e.target.value.replace(/[^0-5]/g, '');
                setGuessInput(onlyNums);
              }}
            />
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
        </div>
      </div>
    </div>
  );
}
