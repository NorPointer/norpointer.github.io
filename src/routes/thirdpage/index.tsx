import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/thirdpage/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Anmol's page!</div>;
}
