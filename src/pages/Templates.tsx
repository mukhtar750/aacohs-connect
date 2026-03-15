import { useState, useEffect, useSyncExternalStore } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Copy, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";
import TemplatePreview from "@/components/TemplatePreview";
import { getTemplates, subscribeTemplates, CustomTemplate } from "@/lib/templateStore";
import { templateHTML } from "@/components/TemplatePreview";
import { toast } from "sonner";

const Templates = () => {
  const navigate = useNavigate();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState("");
  const [previewHTML, setPreviewHTML] = useState("");

  const templates = useSyncExternalStore(subscribeTemplates, getTemplates);

  const handlePreview = (t: CustomTemplate) => {
    setPreviewTemplate(t.name);
    setPreviewHTML(t.html || templateHTML[t.name] || "");
    setPreviewOpen(true);
  };

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
            <div className={`h-40 bg-gradient-to-br ${t.color} opacity-80 flex items-center justify-center relative`}>
              <FileText className="w-12 h-12 text-foreground/80" />
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <Button size="sm" variant="outline" className="border-foreground/30 text-foreground bg-background/50 hover:bg-background/80" onClick={() => handlePreview(t)}>
                  <Eye className="w-4 h-4 mr-1" /> Preview
                </Button>
              </div>
            </div>
            <div className="p-5">
              <h4 className="font-display font-semibold text-foreground mb-1">{t.name}</h4>
              <p className="text-sm text-muted-foreground mb-4">{t.desc}</p>
              <div className="flex gap-2">
                <Button size="sm" className="gradient-primary text-primary-foreground flex-1" onClick={() => navigate(`/dashboard/builder?template=${encodeURIComponent(t.name)}`)}>Use Template</Button>
                <Button size="sm" variant="outline" className="border-border text-foreground hover:bg-secondary" onClick={() => toast.success("Template duplicated")}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <TemplatePreview open={previewOpen} onOpenChange={setPreviewOpen} templateName={previewTemplate} customHTML={previewHTML} />
    </DashboardLayout>
  );
};

export default Templates;
