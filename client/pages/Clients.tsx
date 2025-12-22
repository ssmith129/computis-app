import { AppLayout } from "@/components/layout/AppLayout";
import { ClientsContent } from "@/components/clients/clients-content";

export default function Clients() {
  return (
    <AppLayout activeItem="Clients">
      <ClientsContent />
    </AppLayout>
  );
}
