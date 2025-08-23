import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Plus, 
  Search, 
  Users, 
  MoreHorizontal, 
  Mail, 
  Phone,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockClients = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    status: "Active",
    taxYear: "2023",
    transactions: 156,
    lastActivity: "2 days ago",
    progress: "Ready for Review"
  },
  {
    id: "2",
    name: "Sarah Johnson", 
    email: "sarah.j@email.com",
    phone: "+1 (555) 234-5678",
    status: "Active",
    taxYear: "2023", 
    transactions: 89,
    lastActivity: "1 week ago",
    progress: "In Progress"
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "m.brown@email.com", 
    phone: "+1 (555) 345-6789",
    status: "Pending",
    taxYear: "2023",
    transactions: 234,
    lastActivity: "3 days ago",
    progress: "Awaiting Data"
  },
  {
    id: "4",
    name: "Lisa Davis",
    email: "lisa.davis@email.com",
    phone: "+1 (555) 456-7890", 
    status: "Completed",
    taxYear: "2023",
    transactions: 67,
    lastActivity: "1 month ago",
    progress: "Filed"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Active":
      return <Badge className="bg-green-100 text-green-800">{status}</Badge>;
    case "Pending":
      return <Badge className="bg-yellow-100 text-yellow-800">{status}</Badge>;
    case "Completed":
      return <Badge className="bg-blue-100 text-blue-800">{status}</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getProgressIcon = (progress: string) => {
  switch (progress) {
    case "Ready for Review":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "In Progress":
      return <Clock className="h-4 w-4 text-blue-500" />;
    case "Awaiting Data":
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    case "Filed":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    default:
      return <Clock className="h-4 w-4 text-gray-500" />;
  }
};

export function ClientsContent() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 h-0 p-6 bg-background overflow-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Clients</h1>
            <p className="text-muted-foreground">Manage your crypto tax preparation clients</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">24</div>
              <p className="text-sm text-muted-foreground">Total Clients</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">18</div>
              <p className="text-sm text-muted-foreground">Active</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">4</div>
              <p className="text-sm text-muted-foreground">Ready for Review</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">2</div>
              <p className="text-sm text-muted-foreground">Filed</p>
            </CardContent>
          </Card>
        </div>

        {/* Clients Table */}
        <Card>
          <CardHeader>
            <CardTitle>Client Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tax Year</TableHead>
                    <TableHead>Transactions</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 rounded-full p-2">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{client.name}</p>
                            <p className="text-sm text-muted-foreground">ID: {client.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <span>{client.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            <span>{client.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(client.status)}
                      </TableCell>
                      <TableCell className="font-medium">
                        {client.taxYear}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {client.transactions}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getProgressIcon(client.progress)}
                          <span className="text-sm">{client.progress}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {client.lastActivity}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Message
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              Schedule Meeting
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Client Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-muted">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="font-medium">John Smith submitted new transactions</p>
                    <p className="text-sm text-muted-foreground">15 new crypto transactions from Coinbase</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">2 days ago</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-muted">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="font-medium">Sarah Johnson - Review requested</p>
                    <p className="text-sm text-muted-foreground">Client ready for tax return review</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">3 days ago</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  <div>
                    <p className="font-medium">Michael Brown - Missing data</p>
                    <p className="text-sm text-muted-foreground">Awaiting wallet connection for complete records</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">1 week ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
