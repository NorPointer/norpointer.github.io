import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/mastermind/')({
  component: FirstPage,
})

function FirstPage() {
  return <div>Hello mastermind!</div>
}
