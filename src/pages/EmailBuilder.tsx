import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Type, Image, MousePointerClick, Minus, Share2, Columns, Eye, Code, Smartphone, Monitor, FileCode, Save } from "lucide-react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import DashboardLayout from "@/components/DashboardLayout";
import SortableBlock from "@/components/SortableBlock";
import { templateHTML } from "@/components/TemplatePreview";
import { Block, blockTypes, defaultContent, parseHTMLToBlocks, generateHTML } from "@/lib/emailBlocks";
import { toast } from "sonner";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  heading: Type, text: Type, image: Image, button: MousePointerClick,
  divider: Minus, social: Share2, columns: Columns, html: FileCode,
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

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  // Load template — parse into editable blocks
  useEffect(() => {
    if (templateName && templateHTML[templateName]) {
      const parsed = parseHTMLToBlocks(templateHTML[templateName]);
      setBlocks(parsed);
      toast.success(`"${templateName}" template loaded — all blocks are editable`);
    }
  }, [templateName]);

  useEffect(() => {
    if (view === "code" && !htmlDirty) {
      setRawHTML(generateHTML(blocks));
    }
  }, [view, blocks, htmlDirty]);

  const addBlock = (type: string) => {
    setBlocks([...blocks, { id: Date.now().toString(), type, content: defaultContent[type] }]);
  };

  const updateBlock = (id: string, content: string) => {
    setBlocks(blocks.map((b) => (b.id === id ? { ...b, content } : b)));
  };

  const updateBlockStyle = (id: string, key: string, value: string) => {
    setBlocks(blocks.map((b) => (b.id === id ? { ...b, styles: { ...b.styles, [key]: value } } : b)));
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter((b) => b.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setBlocks((prev) => {
        const oldIndex = prev.findIndex((b) => b.id === active.id);
        const newIndex = prev.findIndex((b) => b.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const applyHTMLToBlocks = () => {
    const parsed = parseHTMLToBlocks(rawHTML);
    setBlocks(parsed);
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
            {blockTypes.map((bt) => {
              const Icon = iconMap[bt.type];
              return (
                <button
                  key={bt.type}
                  onClick={() => addBlock(bt.type)}
                  className="glass rounded-lg p-3 flex flex-col items-center gap-1 hover:neon-border transition-all text-muted-foreground hover:text-foreground"
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  <span className="text-[10px] font-medium">{bt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-1">
              <Button size="sm" variant={view === "visual" ? "default" : "ghost"} onClick={() => { if (htmlDirty) applyHTMLToBlocks(); setView("visual"); }} className={view === "visual" ? "gradient-primary text-primary-foreground" : "text-muted-foreground"}>
                <Eye className="w-4 h-4 mr-1" /> Visual
              </Button>
              <Button size="sm" variant={view === "code" ? "default" : "ghost"} onClick={() => { setRawHTML(generateHTML(blocks)); setHtmlDirty(false); setView("code"); }} className={view === "code" ? "gradient-primary text-primary-foreground" : "text-muted-foreground"}>
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
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
                  <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
                    {blocks.map((b) => (
                      <SortableBlock
                        key={b.id}
                        block={b}
                        onUpdate={updateBlock}
                        onUpdateStyle={updateBlockStyle}
                        onRemove={removeBlock}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
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
