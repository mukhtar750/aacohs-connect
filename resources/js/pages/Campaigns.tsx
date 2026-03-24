import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Send, Clock, FileText, MoreVertical, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "sonner";
import axios from "axios";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  sent: "bg-success/20 text-success",
  draft: "bg-muted text-muted-foreground",
  scheduled: "bg-warning/20 text-warning",
};

interface Campaign {
  id: number;
  name: string;
  subject: string;
  status: string;
  recipients_count: number;
  sent_at: string | null;
  created_at: string;
}

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSubject, setNewSubject] = useState("");

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get("/api/campaigns");
      setCampaigns(response.data);
    } catch (error) {
      toast.error("Failed to fetch campaigns");
    } finally {
      setLoading(false);
    }
  };

  const filtered = campaigns.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  const handleCreate = async () => {
    if (!newName || !newSubject) {
      toast.error("Fill in all fields");
      return;
    }
    try {
      const response = await axios.post("/api/campaigns", {
        name: newName,
        subject: newSubject,
        status: "draft",
      });
      setCampaigns([response.data, ...campaigns]);
      setNewName("");
      setNewSubject("");
      setOpen(false);
      toast.success("Campaign created as draft");
    } catch (error) {
      toast.error("Failed to create campaign");
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search campaigns..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-secondary border-border text-foreground" />
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-primary-foreground"><Plus className="w-4 h-4 mr-2" /> New Campaign</Button>
          </DialogTrigger>
          <DialogContent className="glass-strong border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground font-display">Create Campaign</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">Create a new campaign to reach your subscribers.</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label className="text-foreground">Campaign Name</Label>
                <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Semester Newsletter" className="bg-secondary border-border text-foreground" />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Email Subject</Label>
                <Input value={newSubject} onChange={(e) => setNewSubject(e.target.value)} placeholder="e.g. Important Update from AACOHS" className="bg-secondary border-border text-foreground" />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Recipient Group</Label>
                <Select>
                  <SelectTrigger className="bg-secondary border-border text-foreground"><SelectValue placeholder="Select group" /></SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="all">All Subscribers</SelectItem>
                    <SelectItem value="students">Students</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="lecturers">Lecturers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCreate} className="w-full gradient-primary text-primary-foreground">Create Campaign</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-10 text-muted-foreground">Loading campaigns...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">No campaigns found.</div>
        ) : (
          filtered.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:neon-border transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  {c.status === "sent" ? <Send className="w-4 h-4 text-success" /> : c.status === "scheduled" ? <Clock className="w-4 h-4 text-warning" /> : <FileText className="w-4 h-4 text-muted-foreground" />}
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{c.name}</h4>
                  <p className="text-sm text-muted-foreground">{c.subject}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex flex-col items-center">
                  <span className="text-foreground font-semibold">{c.recipients_count}</span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Recipients</span>
                </div>
                <div className={cn("px-3 py-1 rounded-full text-xs font-medium capitalize shrink-0", statusColors[c.status])}>
                  {c.status}
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
};

export default Campaigns;
