import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Copy, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";
import TemplatePreview from "@/components/TemplatePreview";
import { toast } from "sonner";

const templates = [
  { id: 1, name: "Newsletter", desc: "Weekly campus newsletter with sections for news, events and updates", color: "from-blue-500 to-cyan-500" },
  { id: 2, name: "Announcement", desc: "Important institutional announcements with clear call-to-action", color: "from-violet-500 to-purple-500" },
  { id: 3, name: "Event Invitation", desc: "Beautifully designed event invite with RSVP button", color: "from-emerald-500 to-teal-500" },
  { id: 4, name: "School Updates", desc: "General updates about campus life, policies and calendars", color: "from-amber-500 to-orange-500" },
  { id: 5, name: "Admission Notice", desc: "Admission confirmation with important enrollment details", color: "from-pink-500 to-rose-500" },
  { id: 6, name: "Result Notification", desc: "Exam result notification with links to the student portal", color: "from-indigo-500 to-blue-500" },
];

const Templates = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState("");

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h3 className="font-display text-xl font-semibold text-foreground">Template Library</h3>
        <p className="text-sm text-muted-foreground mt-1">Choose a template to start your next campaign.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl overflow-hidden hover:neon-border transition-all group"
          >
            {/* Preview area */}
            <div className={`h-40 bg-gradient-to-br ${t.color} opacity-80 flex items-center justify-center relative`}>
              <FileText className="w-12 h-12 text-foreground/80" />
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <Button size="sm" variant="outline" className="border-foreground/30 text-foreground bg-background/50 hover:bg-background/80" onClick={() => { setPreviewTemplate(t.name); setPreviewOpen(true); }}>
                  <Eye className="w-4 h-4 mr-1" /> Preview
                </Button>
              </div>
            </div>
            <div className="p-5">
              <h4 className="font-display font-semibold text-foreground mb-1">{t.name}</h4>
              <p className="text-sm text-muted-foreground mb-4">{t.desc}</p>
              <div className="flex gap-2">
                <Button size="sm" className="gradient-primary text-primary-foreground flex-1">Use Template</Button>
                <Button size="sm" variant="outline" className="border-border text-foreground hover:bg-secondary" onClick={() => toast.success("Template duplicated")}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Templates;
