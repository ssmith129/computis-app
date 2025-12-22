import { AppLayout } from "@/components/layout/AppLayout";
import { WalletIngestionContent } from "@/components/wallet-ingestion/wallet-ingestion-content";

export default function WalletIngestion() {
  return (
    <AppLayout activeItem="Wallets and Exchanges">
      <WalletIngestionContent />
    </AppLayout>
  );
}
