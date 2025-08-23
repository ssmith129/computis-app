import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { WalletIngestionTabs } from "./wallet-ingestion-tabs";
import { UploadArea } from "./upload-area";
import { SupportedExchanges } from "./supported-exchanges";
import { RecentUploads } from "./recent-uploads";

export function WalletIngestionContent() {
  const [activeTab, setActiveTab] = useState("upload");

  return (
    <div className="flex-1 h-0 bg-background overflow-auto">
      {/* Header */}
      <div className="border-b border-border bg-background">
        <div className="flex items-center justify-between p-6 pb-0">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-foreground">Wallet Ingestion</h1>
            <p className="text-muted-foreground">Upload, validate, and map CSV data for seamless integration</p>
          </div>
          <Button variant="outline" size="sm">
            <HelpCircle className="h-4 w-4 mr-2" />
            Help
          </Button>
        </div>
        
        {/* Tabs */}
        <div className="px-6 pt-6">
          <WalletIngestionTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {activeTab === "upload" && (
            <>
              <UploadArea />
              <SupportedExchanges />
              <RecentUploads />
            </>
          )}
          {activeTab === "validate" && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Validation step - Upload files first</p>
            </div>
          )}
          {activeTab === "mapping" && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Schema mapping step - Complete validation first</p>
            </div>
          )}
          {activeTab === "review" && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Review & import step - Complete mapping first</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
