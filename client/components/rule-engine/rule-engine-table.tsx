import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { 
  MoreHorizontal, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight,
  Play,
  Pause,
  Edit,
  Trash2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

interface RuleEngineTableProps {
  activeTab: string;
}

const initialRules = [
  {
    id: "1",
    name: "BTC Mining Income",
    type: "Income",
    created: "2023-10-15",
    lastRun: "2023-10-24",
    affectedTransactions: 23,
    status: "Active",
    typeColor: "bg-green-100 text-green-800"
  },
  {
    id: "2",
    name: "ETH-BTC Swaps",
    type: "Trade",
    created: "2023-09-28",
    lastRun: "2023-10-24",
    affectedTransactions: 8,
    status: "Active",
    typeColor: "bg-blue-100 text-blue-800"
  },
  {
    id: "3",
    name: "Merge Internal Transfers",
    type: "Merge",
    created: "2023-09-14",
    lastRun: "2023-10-24",
    affectedTransactions: 42,
    status: "Active",
    typeColor: "bg-purple-100 text-purple-800"
  },
  {
    id: "4",
    name: "Exchange Fees",
    type: "Expense",
    created: "2023-08-22",
    lastRun: "2023-10-24",
    affectedTransactions: 16,
    status: "Paused",
    typeColor: "bg-red-100 text-red-800"
  },
  {
    id: "5",
    name: "Split Staking Rewards",
    type: "Split",
    created: "2023-07-05",
    lastRun: "2023-10-24",
    affectedTransactions: 7,
    status: "Active",
    typeColor: "bg-yellow-100 text-yellow-800"
  }
];

const getStatusVariant = (status: string): "success" | "warning" | "error" | "pending" => {
  switch (status) {
    case "Active": return "success";
    case "Paused": return "warning";
    case "Error": return "error";
    default: return "pending";
  }
};

export function RuleEngineTable({ activeTab }: RuleEngineTableProps) {
  const [rules, setRules] = useState(initialRules);
  const [selectedRules, setSelectedRules] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<{ id: string; name: string } | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredRules = rules.filter(rule => {
    if (activeTab === "All") return true;
    return rule.type === activeTab;
  });

  const totalPages = Math.ceil(filteredRules.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedRules = filteredRules.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRules(displayedRules.map(r => r.id));
    } else {
      setSelectedRules([]);
    }
  };

  const handleSelectRule = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRules(prev => [...prev, id]);
    } else {
      setSelectedRules(prev => prev.filter(r => r !== id));
    }
  };

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedRules.length === displayedRules.length && displayedRules.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" className="p-0 h-auto font-medium">
                  Rule Name
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last Run</TableHead>
              <TableHead>Affected Transactions</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedRules.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedRules.includes(rule.id)}
                    onCheckedChange={(checked) => handleSelectRule(rule.id, !!checked)}
                  />
                </TableCell>
                <TableCell className="font-medium">{rule.name}</TableCell>
                <TableCell>
                  <Badge className={rule.typeColor}>
                    {rule.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{rule.created}</TableCell>
                <TableCell className="text-muted-foreground">{rule.lastRun}</TableCell>
                <TableCell className="font-medium">{rule.affectedTransactions}</TableCell>
                <TableCell>
                  <StatusBadge variant={getStatusVariant(rule.status)}>
                    {rule.status}
                  </StatusBadge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      {rule.status === "Active" ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Rule
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Play className="mr-2 h-4 w-4" />
                          Run Now
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Table Footer */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-4 py-2 border-t">
        <div className="text-sm text-muted-foreground">
          Showing {Math.min(displayedRules.length, itemsPerPage)} of {filteredRules.length} rules
        </div>

        {/* Pagination */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8 p-0"
                >
                  {page}
                </Button>
              );
            })}
            {totalPages > 5 && <span className="text-muted-foreground">...</span>}
            <span className="text-sm text-muted-foreground ml-2">{totalPages}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
