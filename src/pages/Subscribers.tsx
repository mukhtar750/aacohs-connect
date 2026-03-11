import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Upload, Tag, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "sonner";

const initialSubscribers = [
  { id: 1, name: "Adebayo Olumide", email: "adebayo@student.aacohs.edu.ng", group: "Students", tag: "100L", status: "active" },
  { id: 2, name: "Fatima Abdullahi", email: "fatima@student.aacohs.edu.ng", group: "Students", tag: "200L", status: "active" },
  { id: 3, name: "Dr. Okonkwo Chidi", email: "okonkwo@staff.aacohs.edu.ng", group: "Lecturers", tag: "Anatomy", status: "active" },
  { id: 4, name: "Nurse Aisha Bello", email: "aisha@staff.aacohs.edu.ng", group: "Clinical Staff", tag: "Nursing", status: "active" },
  { id: 5, name: "Prof. Alao Ibrahim", email: "alao@aacohs.edu.ng", group: "Management", tag: "Admin", status: "active" },
  { id: 6, name: "Chinwe Obi", email: "chinwe@student.aacohs.edu.ng", group: "Students", tag: "300L", status: "unsubscribed" },
];

const groupColors: Record<string, string> = {
  Students: "bg-primary/20 text-primary",
  Lecturers: "bg-accent/20 text-accent",
  "Clinical Staff": "bg-success/20 text-success",
  Management: "bg-warning/20 text-warning",
};

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState(initialSubscribers);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newGroup, setNewGroup] = useState("");

  const filtered = subscribers.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!newName || !newEmail) { toast.error("Name and email required"); return; }
    setSubscribers([{ id: Date.now(), name: newName, email: newEmail, group: newGroup || "Students", tag: "", status: "active" }, ...subscribers]);
    setNewName(""); setNewEmail(""); setNewGroup(""); setOpen(false);
    toast.success("Subscriber added");
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search subscribers..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-secondary border-border text-foreground" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-border text-foreground hover:bg-secondary">
            <Upload className="w-4 h-4 mr-2" /> Import CSV
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary text-primary-foreground"><Plus className="w-4 h-4 mr-2" /> Add Subscriber</Button>
            </DialogTrigger>
            <DialogContent className="glass-strong border-border">
              <DialogHeader><DialogTitle className="text-foreground font-display">Add Subscriber</DialogTitle></DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label className="text-foreground">Full Name</Label>
                  <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. John Doe" className="bg-secondary border-border text-foreground" />
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">Email</Label>
                  <Input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="e.g. john@aacohs.edu.ng" className="bg-secondary border-border text-foreground" />
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">Group</Label>
                  <Select value={newGroup} onValueChange={setNewGroup}>
                    <SelectTrigger className="bg-secondary border-border text-foreground"><SelectValue placeholder="Select group" /></SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="Students">Students</SelectItem>
                      <SelectItem value="Lecturers">Lecturers</SelectItem>
                      <SelectItem value="Clinical Staff">Clinical Staff</SelectItem>
                      <SelectItem value="Management">Management</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAdd} className="w-full gradient-primary text-primary-foreground">Add Subscriber</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total", value: subscribers.length },
          { label: "Active", value: subscribers.filter((s) => s.status === "active").length },
          { label: "Groups", value: new Set(subscribers.map((s) => s.group)).size },
          { label: "Unsubscribed", value: subscribers.filter((s) => s.status === "unsubscribed").length },
        ].map((s) => (
          <div key={s.label} className="glass rounded-xl p-4 text-center">
            <p className="text-2xl font-display font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left py-3 px-4 font-medium">Name</th>
                <th className="text-left py-3 px-4 font-medium">Email</th>
                <th className="text-left py-3 px-4 font-medium">Group</th>
                <th className="text-left py-3 px-4 font-medium">Tag</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <motion.tr
                  key={s.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                >
                  <td className="py-3 px-4 text-foreground font-medium">{s.name}</td>
                  <td className="py-3 px-4 text-muted-foreground">{s.email}</td>
                  <td className="py-3 px-4">
                    <Badge variant="secondary" className={groupColors[s.group] || ""}>{s.group}</Badge>
                  </td>
                  <td className="py-3 px-4">
                    {s.tag && <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Tag className="w-3 h-3" />{s.tag}</span>}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-medium capitalize ${s.status === "active" ? "text-success" : "text-muted-foreground"}`}>{s.status}</span>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="icon" className="text-muted-foreground"><MoreVertical className="w-4 h-4" /></Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Subscribers;
