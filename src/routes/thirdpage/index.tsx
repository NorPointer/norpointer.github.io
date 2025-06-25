import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/thirdpage/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div>CEO's page!</div>
      <Button variant="ghost">Click me</Button>
    </div>
  );
}
