import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { WalletIngestionContent } from "@/components/wallet-ingestion/wallet-ingestion-content";

export default function WalletIngestion() {
  return <DashboardLayout activeItem="Wallets and Exchanges">
    <WalletIngestionContent />
  </DashboardLayout>;
}
