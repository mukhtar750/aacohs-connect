import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Send, Clock, FileText, MoreVertical, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "sonner";

const initialCampaigns = [
  { id: 1, name: "Admission Notice 2025", subject: "Your Admission is Confirmed!", status: "sent", recipients: 1240, openRate: 72, clickRate: 24, sentAt: "2025-03-08" },
  { id: 2, name: "Mid-Semester Exam Schedule", subject: "Important: Exam Dates Released", status: "sent", recipients: 890, openRate: 81, clickRate: 31, sentAt: "2025-03-05" },
  { id: 3, name: "Health Week Newsletter", subject: "AACOHS Health Week 2025", status: "draft", recipients: 0, openRate: 0, clickRate: 0, sentAt: "" },
  { id: 4, name: "Staff Meeting Reminder", subject: "Reminder: Staff Meeting March 12", status: "scheduled", recipients: 156, openRate: 0, clickRate: 0, sentAt: "2025-03-12" },
  { id: 5, name: "Research Symposium Invite", subject: "You're Invited: Annual Research Symposium", status: "draft", recipients: 0, openRate: 0, clickRate: 0, sentAt: "" },
];

const statusColors: Record<string, string> = {
  sent: "bg-success/20 text-success",
  draft: "bg-muted text-muted-foreground",
  scheduled: "bg-warning/20 text-warning",
};

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSubject, setNewSubject] = useState("");

  const filtered = campaigns.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  const handleCreate = () => {
    if (!newName || !newSubject) { toast.error("Fill in all fields"); return; }
    setCampaigns([{ id: Date.now(), name: newName, subject: newSubject, status: "draft", recipients: 0, openRate: 0, clickRate: 0, sentAt: "" }, ...campaigns]);
    setNewName(""); setNewSubject(""); setOpen(false);
    toast.success("Campaign created as draft");
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
            <DialogHeader><DialogTitle className="text-foreground font-display">Create Campaign</DialogTitle></DialogHeader>
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
        {filtered.map((c, i) => (
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
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[c.status]}`}>{c.status}</span>
              {c.status === "sent" && (
                <>
                  <span className="text-muted-foreground">{c.recipients.toLocaleString()} sent</span>
                  <span className="text-muted-foreground">{c.openRate}% opened</span>
                </>
              )}
              <Button variant="ghost" size="icon" className="text-muted-foreground"><MoreVertical className="w-4 h-4" /></Button>
            </div>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Campaigns;
