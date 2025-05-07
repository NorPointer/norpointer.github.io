import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/secondpage/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/secondpage"!</div>
}
