import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Upload, Tag, MoreVertical, FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "sonner";
import axios from "axios";
import { cn } from "@/lib/utils";

const groupColors: Record<string, string> = {
  Students: "bg-primary/20 text-primary",
  Lecturers: "bg-accent/20 text-accent",
  "Clinical Staff": "bg-success/20 text-success",
  Management: "bg-warning/20 text-warning",
};

interface Subscriber {
  id: number;
  email: string;
  first_name: string | null;
  last_name: string | null;
  status: string;
  tags: string[] | null;
  created_at: string;
}

function parseCSV(text: string) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];

  const headerLine = lines[0].toLowerCase();
  const headers = headerLine.split(",").map((h) => h.trim().replace(/^["']|["']$/g, ""));

  const firstNameIdx = headers.findIndex((h) => h.includes("first") || h.includes("name"));
  const lastNameIdx = headers.findIndex((h) => h.includes("last"));
  const emailIdx = headers.findIndex((h) => h.includes("email"));
  const tagIdx = headers.findIndex((h) => h.includes("tag"));

  if (emailIdx === -1) return [];

  const results: { first_name: string; last_name: string; email: string; tags: string[] }[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",").map((c) => c.trim().replace(/^["']|["']$/g, ""));
    const email = cols[emailIdx]?.trim();
    if (!email || !email.includes("@")) continue;

    results.push({
      first_name: firstNameIdx >= 0 ? cols[firstNameIdx] || "" : "",
      last_name: lastNameIdx >= 0 ? cols[lastNameIdx] || "" : "",
      email,
      tags: tagIdx >= 0 ? (cols[tagIdx] ? cols[tagIdx].split(";").map(t => t.trim()) : []) : [],
    });
  }

  return results;
}

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [csvOpen, setCsvOpen] = useState(false);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [csvPreview, setCsvPreview] = useState<{ first_name: string; last_name: string; email: string; tags: string[] }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await axios.get("/api/subscribers");
      setSubscribers(response.data);
    } catch (error) {
      toast.error("Failed to fetch subscribers");
    } finally {
      setLoading(false);
    }
  };

  const filtered = subscribers.filter((s) =>
    (s.first_name?.toLowerCase() || "").includes(search.toLowerCase()) ||
    (s.last_name?.toLowerCase() || "").includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async () => {
    if (!newEmail) {
      toast.error("Email is required");
      return;
    }
    try {
      const response = await axios.post("/api/subscribers", {
        first_name: newFirstName,
        last_name: newLastName,
        email: newEmail,
        status: "active",
      });
      setSubscribers([response.data, ...subscribers]);
      setNewFirstName("");
      setNewLastName("");
      setNewEmail("");
      setOpen(false);
      toast.success("Subscriber added");
    } catch (error: any) {
      if (error.response?.status === 422) {
        toast.error("Email already exists or is invalid");
      } else {
        toast.error("Failed to add subscriber");
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith(".csv")) {
      toast.error("Please select a CSV file");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const parsed = parseCSV(text);
      if (parsed.length === 0) {
        toast.error("No valid subscribers found. Ensure CSV has an 'email' column.");
        return;
      }
      setCsvPreview(parsed);
      setCsvOpen(true);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleImport = async () => {
    toast.loading(`Importing ${csvPreview.length} subscribers...`);
    let successCount = 0;
    let failCount = 0;

    for (const sub of csvPreview) {
      try {
        await axios.post("/api/subscribers", {
          first_name: sub.first_name,
          last_name: sub.last_name,
          email: sub.email,
          tags: sub.tags,
          status: "active",
        });
        successCount++;
      } catch (e) {
        failCount++;
      }
    }

    toast.dismiss();
    if (successCount > 0) {
      toast.success(`Successfully imported ${successCount} subscribers`);
      fetchSubscribers();
    }
    if (failCount > 0) {
      toast.error(`Failed to import ${failCount} subscribers (duplicates or invalid)`);
    }
    setCsvOpen(false);
    setCsvPreview([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search subscribers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-secondary border-border text-foreground"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept=".csv"
            className="hidden"
          />
          <Button variant="outline" className="flex-1 sm:flex-none border-border text-foreground hover:bg-secondary" onClick={() => fileInputRef.current?.click()}>
            <Upload className="w-4 h-4 mr-2" /> Import CSV
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="flex-1 sm:flex-none gradient-primary text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" /> Add Subscriber
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-strong border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground font-display">Add Subscriber</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">First Name</Label>
                    <Input
                      value={newFirstName}
                      onChange={(e) => setNewFirstName(e.target.value)}
                      placeholder="e.g. Adebayo"
                      className="bg-secondary border-border text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Last Name</Label>
                    <Input
                      value={newLastName}
                      onChange={(e) => setNewLastName(e.target.value)}
                      placeholder="e.g. Olumide"
                      className="bg-secondary border-border text-foreground"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">Email Address</Label>
                  <Input
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    type="email"
                    placeholder="adebayo@student.aacohs.edu.ng"
                    className="bg-secondary border-border text-foreground"
                  />
                </div>
                <Button onClick={handleAdd} className="w-full gradient-primary text-primary-foreground">
                  Add Subscriber
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="glass rounded-xl overflow-hidden border border-border">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-secondary/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tags</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">Loading subscribers...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">No subscribers found.</td>
                </tr>
              ) : (
                filtered.map((s, i) => (
                  <motion.tr
                    key={s.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="hover:bg-secondary/30 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-foreground">{s.first_name} {s.last_name}</div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{s.email}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider",
                        s.status === "active" ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                      )}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {s.tags && s.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-[10px] bg-secondary/50 border-border text-muted-foreground px-1.5 py-0 h-5">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={csvOpen} onOpenChange={setCsvOpen}>
        <DialogContent className="glass-strong border-border max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-foreground font-display flex items-center gap-2">
              <FileUp className="w-5 h-5 text-primary" />
              Confirm CSV Import
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto mt-4 border border-border rounded-lg bg-secondary/20">
            <table className="w-full text-sm text-left">
              <thead className="bg-secondary/50 sticky top-0 border-b border-border">
                <tr>
                  <th className="px-4 py-2 font-medium text-muted-foreground">Name</th>
                  <th className="px-4 py-2 font-medium text-muted-foreground">Email</th>
                  <th className="px-4 py-2 font-medium text-muted-foreground">Tags</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {csvPreview.map((item, i) => (
                  <tr key={i}>
                    <td className="px-4 py-2 text-foreground">{item.first_name} {item.last_name}</td>
                    <td className="px-4 py-2 text-muted-foreground">{item.email}</td>
                    <td className="px-4 py-2">
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map(t => (
                          <Badge key={t} variant="outline" className="text-[10px] h-4 px-1">{t}</Badge>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" className="border-border text-foreground hover:bg-secondary" onClick={() => setCsvOpen(false)}>
              Cancel
            </Button>
            <Button className="gradient-primary text-primary-foreground px-8" onClick={handleImport}>
              Import {csvPreview.length} Subscribers
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Subscribers;
