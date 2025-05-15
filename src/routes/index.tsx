import { createFileRoute } from '@tanstack/react-router'
import logo from '../logo.svg'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <img
          src={logo}
          className="h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]"
          alt="logo"
        />
        <p>
          Edit <code>src/routes/index.tsx</code> and save to reload.
        </p>
        <a
          className="text-[#61dafb] hover:underline"
          href="/mastermind"
          rel="noopener noreferrer"
        >
          Mastermind
        </a>
        <a
          className="text-[#61dafb] hover:underline"
          href="/secondpage"
          rel="noopener noreferrer"
        >
          Second page
        </a>
        <a
          className="text-[#61dafb] hover:underline"
          href="/thirdpage"
          rel="noopener noreferrer"
        >
          Third page
        </a>
      </header>
    </div>
  )
}
