import { Button } from '@/components/ui/button';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/thirdpage/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div>CEO's page!</div>
      <Button variant="primary">Click me</Button>
    </div>
  );
}
