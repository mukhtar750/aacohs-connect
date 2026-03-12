import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Type, Image, MousePointerClick, Minus, Share2, Columns, GripVertical, Eye, Code, Smartphone, Monitor, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import DashboardLayout from "@/components/DashboardLayout";
import { templateHTML } from "@/components/TemplatePreview";
import { toast } from "sonner";

type Block = { id: string; type: string; content: string };

const blockTypes = [
  { type: "heading", icon: Type, label: "Heading" },
  { type: "text", icon: Type, label: "Text Block" },
  { type: "image", icon: Image, label: "Image" },
  { type: "button", icon: MousePointerClick, label: "Button" },
  { type: "divider", icon: Minus, label: "Divider" },
  { type: "social", icon: Share2, label: "Social Icons" },
  { type: "columns", icon: Columns, label: "Columns" },
  { type: "html", icon: FileCode, label: "Custom HTML" },
];

const defaultContent: Record<string, string> = {
  heading: "Welcome to AACOHS",
  text: "This is a paragraph of text. Edit it to add your own content.",
  image: "https://placehold.co/600x200/1e3a5f/60a5fa?text=AACOHS+Banner",
  button: "Learn More",
  divider: "",
  social: "Facebook | Twitter | Instagram",
  columns: "Column 1 | Column 2",
  html: "<div style=\"padding:16px;background:#f0f9ff;border-radius:8px\"><p style=\"color:#333;font-family:Arial,sans-serif\">Custom HTML block — edit this code</p></div>",
};

const EmailBuilder = () => {
  const [searchParams] = useSearchParams();
  const templateName = searchParams.get("template");

  const [blocks, setBlocks] = useState<Block[]>([
    { id: "1", type: "heading", content: "AACOHS Newsletter" },
    { id: "2", type: "text", content: "Dear Community Member,\n\nWe are excited to share the latest updates from Alao Akala College of Health and Science." },
    { id: "3", type: "button", content: "Visit Our Portal" },
  ]);
  const [view, setView] = useState<"visual" | "code">("visual");
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [rawHTML, setRawHTML] = useState("");
  const [htmlDirty, setHtmlDirty] = useState(false);

  // Load template if provided via URL param
  useEffect(() => {
    if (templateName && templateHTML[templateName]) {
      setBlocks([{ id: Date.now().toString(), type: "html", content: templateHTML[templateName] }]);
      toast.success(`"${templateName}" template loaded`);
    }
  }, [templateName]);

  // Sync rawHTML when switching to code view
  useEffect(() => {
    if (view === "code" && !htmlDirty) {
      setRawHTML(generateHTML());
    }
  }, [view]);

  const addBlock = (type: string) => {
    setBlocks([...blocks, { id: Date.now().toString(), type, content: defaultContent[type] }]);
  };

  const updateBlock = (id: string, content: string) => {
    setBlocks(blocks.map((b) => (b.id === id ? { ...b, content } : b)));
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter((b) => b.id !== id));
  };

  const generateHTML = () => {
    return blocks.map((b) => {
      switch (b.type) {
        case "heading": return `<h1 style="color:#1e3a5f;font-family:Arial,sans-serif;font-size:24px;margin:0 0 16px">${b.content}</h1>`;
        case "text": return `<p style="color:#333;font-family:Arial,sans-serif;font-size:14px;line-height:1.6;margin:0 0 16px">${b.content.replace(/\n/g, "<br>")}</p>`;
        case "image": return `<img src="${b.content}" alt="Email image" style="max-width:100%;height:auto;border-radius:8px;margin:0 0 16px" />`;
        case "button": return `<a href="#" style="display:inline-block;padding:12px 24px;background:linear-gradient(135deg,#3b82f6,#06b6d4);color:#fff;text-decoration:none;border-radius:8px;font-family:Arial,sans-serif;font-weight:600;margin:0 0 16px">${b.content}</a>`;
        case "divider": return `<hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0" />`;
        case "social": return `<p style="color:#666;font-family:Arial,sans-serif;font-size:12px;text-align:center;margin:16px 0">${b.content}</p>`;
        case "columns": return `<table width="100%"><tr>${b.content.split("|").map((c) => `<td style="padding:8px;font-family:Arial,sans-serif;font-size:14px;color:#333">${c.trim()}</td>`).join("")}</tr></table>`;
        case "html": return b.content;
        default: return "";
      }
    }).join("\n");
  };

  const applyHTMLToBlocks = () => {
    setBlocks([{ id: Date.now().toString(), type: "html", content: rawHTML }]);
    setHtmlDirty(false);
    toast.success("HTML applied to editor");
  };

  const handleHTMLChange = (value: string) => {
    setRawHTML(value);
    setHtmlDirty(true);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)]">
        {/* Blocks Panel */}
        <div className="w-full lg:w-56 shrink-0">
          <h3 className="font-display font-semibold text-foreground mb-3 text-sm">Components</h3>
          <div className="grid grid-cols-4 lg:grid-cols-1 gap-2">
            {blockTypes.map((bt) => (
              <button
                key={bt.type}
                onClick={() => addBlock(bt.type)}
                className="glass rounded-lg p-3 flex flex-col items-center gap-1 hover:neon-border transition-all text-muted-foreground hover:text-foreground"
              >
                <bt.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{bt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-1">
              <Button size="sm" variant={view === "visual" ? "default" : "ghost"} onClick={() => { if (htmlDirty) applyHTMLToBlocks(); setView("visual"); }} className={view === "visual" ? "gradient-primary text-primary-foreground" : "text-muted-foreground"}>
                <Eye className="w-4 h-4 mr-1" /> Visual
              </Button>
              <Button size="sm" variant={view === "code" ? "default" : "ghost"} onClick={() => { setRawHTML(generateHTML()); setHtmlDirty(false); setView("code"); }} className={view === "code" ? "gradient-primary text-primary-foreground" : "text-muted-foreground"}>
                <Code className="w-4 h-4 mr-1" /> HTML
              </Button>
            </div>
            <div className="flex gap-1 items-center">
              {view === "code" && htmlDirty && (
                <Button size="sm" variant="outline" onClick={applyHTMLToBlocks} className="text-xs border-primary text-primary mr-2">
                  Apply Changes
                </Button>
              )}
              <Button size="sm" variant="ghost" onClick={() => setPreviewMode("desktop")} className={previewMode === "desktop" ? "text-primary" : "text-muted-foreground"}>
                <Monitor className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setPreviewMode("mobile")} className={previewMode === "mobile" ? "text-primary" : "text-muted-foreground"}>
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 glass rounded-xl overflow-y-auto">
            {view === "visual" ? (
              <div className={`mx-auto p-6 ${previewMode === "mobile" ? "max-w-sm" : "max-w-2xl"}`} style={{ background: "#ffffff", minHeight: "100%", borderRadius: "12px" }}>
                {blocks.length === 0 && (
                  <div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
                    Click a component to add it here
                  </div>
                )}
                {blocks.map((b) => (
                  <div key={b.id} className="group relative mb-3 border border-transparent hover:border-blue-400/30 rounded-lg p-2 transition-all">
                    <div className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <GripVertical className="w-4 h-4 text-gray-400" />
                    </div>
                    <button
                      onClick={() => removeBlock(b.id)}
                      className="absolute -right-2 -top-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >×</button>

                    {b.type === "heading" && (
                      <input
                        value={b.content}
                        onChange={(e) => updateBlock(b.id, e.target.value)}
                        className="w-full text-2xl font-bold text-gray-800 bg-transparent border-none outline-none"
                        style={{ fontFamily: "Arial, sans-serif" }}
                      />
                    )}
                    {b.type === "text" && (
                      <textarea
                        value={b.content}
                        onChange={(e) => updateBlock(b.id, e.target.value)}
                        rows={3}
                        className="w-full text-sm text-gray-700 bg-transparent border-none outline-none resize-none"
                        style={{ fontFamily: "Arial, sans-serif", lineHeight: 1.6 }}
                      />
                    )}
                    {b.type === "image" && (
                      <div>
                        <img src={b.content} alt="Block" className="w-full rounded-lg" />
                        <input
                          value={b.content}
                          onChange={(e) => updateBlock(b.id, e.target.value)}
                          className="w-full text-xs text-gray-400 bg-transparent border-none outline-none mt-1"
                          placeholder="Image URL"
                        />
                      </div>
                    )}
                    {b.type === "button" && (
                      <div className="text-center">
                        <input
                          value={b.content}
                          onChange={(e) => updateBlock(b.id, e.target.value)}
                          className="inline-block px-6 py-3 text-white font-semibold rounded-lg text-sm bg-transparent outline-none text-center"
                          style={{ background: "linear-gradient(135deg, #3b82f6, #06b6d4)" }}
                        />
                      </div>
                    )}
                    {b.type === "divider" && <hr className="border-gray-200 my-2" />}
                    {b.type === "social" && (
                      <input
                        value={b.content}
                        onChange={(e) => updateBlock(b.id, e.target.value)}
                        className="w-full text-xs text-gray-500 bg-transparent border-none outline-none text-center"
                      />
                    )}
                    {b.type === "columns" && (
                      <input
                        value={b.content}
                        onChange={(e) => updateBlock(b.id, e.target.value)}
                        className="w-full text-sm text-gray-700 bg-transparent border-none outline-none"
                        placeholder="Col 1 | Col 2"
                      />
                    )}
                    {b.type === "html" && (
                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <FileCode className="w-4 h-4 text-blue-500" />
                          <span className="text-xs font-medium text-gray-500">Custom HTML Block</span>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: b.content }} />
                        <textarea
                          value={b.content}
                          onChange={(e) => updateBlock(b.id, e.target.value)}
                          rows={6}
                          className="w-full mt-2 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-md p-2 font-mono outline-none resize-y"
                          placeholder="Enter HTML code..."
                        />
                      </div>
                    )}
                  </div>
                ))}
                {/* Footer */}
                <div className="mt-8 pt-4 border-t border-gray-200 text-center">
                  <p className="text-xs text-gray-400">AACOHS – Alao Akala College of Health and Science</p>
                  <p className="text-xs text-gray-400 mt-1">
                    <a href="#" className="underline">Unsubscribe</a>
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <Textarea
                  value={rawHTML}
                  onChange={(e) => handleHTMLChange(e.target.value)}
                  className="w-full flex-1 bg-transparent border-none text-foreground font-mono text-xs resize-none p-4"
                  style={{ minHeight: "100%" }}
                  placeholder="Write or edit your HTML email code here..."
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmailBuilder;
