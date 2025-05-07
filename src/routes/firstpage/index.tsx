import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/firstpage/')({
  component: FirstPage,
})

function FirstPage() {
  return <div>Hello "/firstpage"!</div>
}
