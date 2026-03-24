import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { motion } from "framer-motion";
import { FileText, Copy, Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";
import TemplatePreview from "@/components/TemplatePreview";
import { templateHTML } from "@/components/TemplatePreview";
import { toast } from "sonner";
import axios from "axios";

interface Template {
  id: number;
  name: string;
  description: string | null;
  html_content: string | null;
  category: string | null;
  color?: string;
}

const Templates = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState("");
  const [previewHTML, setPreviewHTML] = useState("");

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await axios.get("/api/templates");
      setTemplates(response.data);
    } catch (error) {
      toast.error("Failed to load templates");
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = (t: Template) => {
    setPreviewTemplate(t.name);
    setPreviewHTML(t.html_content || templateHTML[t.name] || "");
    setPreviewOpen(true);
  };

  const colors = [
    "from-blue-500/20 to-indigo-500/20",
    "from-purple-500/20 to-pink-500/20",
    "from-emerald-500/20 to-teal-500/20",
    "from-orange-500/20 to-red-500/20",
    "from-cyan-500/20 to-blue-500/20",
  ];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h3 className="font-display text-xl font-semibold text-foreground">Template Library</h3>
        <p className="text-sm text-muted-foreground mt-1">Choose a template to start your next campaign.</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="w-8 h-8 animate-spin mb-2" />
          <p>Loading templates...</p>
        </div>
      ) : templates.length === 0 ? (
        <div className="text-center py-20 glass rounded-xl border-dashed border-2 border-border">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
          <h4 className="text-lg font-medium text-foreground">No templates found</h4>
          <p className="text-sm text-muted-foreground mt-1 mb-6">Create your first template in the Email Builder.</p>
          <Button onClick={() => router.visit("/dashboard/builder")} className="gradient-primary text-primary-foreground">
            Go to Email Builder
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl overflow-hidden hover:neon-border transition-all group"
            >
              <div className={`h-40 bg-gradient-to-br ${colors[i % colors.length]} opacity-80 flex items-center justify-center relative`}>
                <FileText className="w-12 h-12 text-foreground/80" />
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <Button size="sm" variant="outline" className="border-foreground/30 text-foreground bg-background/50 hover:bg-background/80" onClick={() => handlePreview(t)}>
                    <Eye className="w-4 h-4 mr-1" /> Preview
                  </Button>
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-display font-semibold text-foreground mb-1">{t.name}</h4>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{t.description || "No description provided."}</p>
                <div className="flex gap-2">
                  <Button size="sm" className="gradient-primary text-primary-foreground flex-1" onClick={() => router.visit(`/dashboard/builder?templateId=${t.id}`)}>Use Template</Button>
                  <Button size="sm" variant="outline" className="border-border text-foreground hover:bg-secondary" onClick={() => toast.success("Template duplicated")}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <TemplatePreview open={previewOpen} onOpenChange={setPreviewOpen} templateName={previewTemplate} customHTML={previewHTML} />
    </DashboardLayout>
  );
};

export default Templates;
