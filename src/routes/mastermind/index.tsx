import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
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

function Mastermind() {
  const numColors = 6;
  const codeLength = 4;

  const [code, _] = useState<Array<MastermindColors>>(
    getRandomCode(codeLength),
  );
  const [guessInput, setGuess] = useState('');

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

  function handleGuess() {
    const guess = guessInput.split('').map((e) => Number(e));
    const whites = guess.reduce(
      (sum, val, i) => sum + (val === code[i] ? 1 : 0),
      0,
    );
    console.log(code);
    console.log(guess);
    console.log(whites);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
      <p>Hello mastermind!</p>
      <div>Your random code is:</div>
      <div>{code.map((color) => color.toString())}</div>
      <div>
        <Input
          className="bg-[#282c34]"
          type="text"
          id="guessInput"
          minLength={4}
          maxLength={4}
          size={10}
          value={guessInput}
          onChange={(e) => {
            const onlyNums = e.target.value.replace(/\D/g, '');
            setGuess(onlyNums);
          }}
        />
      </div>
      <Button onClick={handleGuess}>Guess</Button>
    </div>
  );
}
