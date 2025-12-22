import { AppLayout } from "@/components/layout/AppLayout";
import { WalletsContent } from "@/components/wallets/wallets-content";

export default function Wallets() {
  return (
    <AppLayout activeItem="Wallets and Exchanges">
      <WalletsContent />
    </AppLayout>
  );
}
