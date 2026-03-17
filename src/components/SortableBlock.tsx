import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, FileCode, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Block } from "@/lib/emailBlocks";
import BlockStyleToolbar from "./BlockStyleToolbar";

interface SortableBlockProps {
  block: Block;
  onUpdate: (id: string, content: string) => void;
  onUpdateStyle: (id: string, key: string, value: string) => void;
  onRemove: (id: string) => void;
}

const SortableBlock = ({ block: b, onUpdate, onUpdateStyle, onRemove }: SortableBlockProps) => {
  const [showToolbar, setShowToolbar] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: b.id });
  const hasToolbar = ["heading", "text", "social"].includes(b.type);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : "auto" as const,
  };

  return (
    <div ref={setNodeRef} style={style} className="group relative mb-3 border border-transparent hover:border-blue-400/30 rounded-lg p-2 transition-all">
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute -left-7 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing p-1"
      >
        <GripVertical className="w-4 h-4 text-gray-400" />
      </div>

      {/* Remove + style toggle */}
      <div className="absolute -right-2 -top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        {hasToolbar && (
          <button onClick={() => setShowToolbar(!showToolbar)}
            className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
            {showToolbar ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        )}
        <button onClick={() => onRemove(b.id)}
          className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
          <Trash2 className="w-3 h-3" />
        </button>
      </div>

      {b.type === "heading" && (
        <div>
          <input
            value={b.content}
            onChange={(e) => onUpdate(b.id, e.target.value)}
            className="w-full bg-transparent border-none outline-none"
            style={{
              fontFamily: b.styles?.fontFamily || "Arial, sans-serif",
              fontSize: b.styles?.fontSize || "24px",
              color: b.styles?.color || "#1e3a5f",
              fontWeight: b.styles?.fontWeight || "bold",
              fontStyle: b.styles?.fontStyle || "normal",
              textDecoration: b.styles?.textDecoration || "none",
              textAlign: (b.styles?.textAlign as any) || "left",
              backgroundColor: b.styles?.backgroundColor || "transparent",
              lineHeight: b.styles?.lineHeight || "1.4",
              padding: b.styles?.padding || "0px",
              borderRadius: "4px",
            }}
          />
          {showToolbar && <BlockStyleToolbar block={b} onUpdateStyle={onUpdateStyle} />}
        </div>
      )}

      {b.type === "text" && (
        <div>
          <textarea
            value={b.content}
            onChange={(e) => onUpdate(b.id, e.target.value)}
            rows={3}
            className="w-full bg-transparent border-none outline-none resize-none"
            style={{
              fontFamily: b.styles?.fontFamily || "Arial, sans-serif",
              fontSize: b.styles?.fontSize || "14px",
              color: b.styles?.color || "#333333",
              fontWeight: b.styles?.fontWeight || "normal",
              fontStyle: b.styles?.fontStyle || "normal",
              textDecoration: b.styles?.textDecoration || "none",
              textAlign: (b.styles?.textAlign as any) || "left",
              backgroundColor: b.styles?.backgroundColor || "transparent",
              lineHeight: b.styles?.lineHeight || "1.6",
              padding: b.styles?.padding || "0px",
              borderRadius: "4px",
            }}
          />
          {showToolbar && <BlockStyleToolbar block={b} onUpdateStyle={onUpdateStyle} />}
        </div>
      )}

      {b.type === "image" && (
        <div>
          <img src={b.content} alt="Block" className="rounded-lg" style={{ width: b.styles?.width || "100%", height: b.styles?.height || "auto" }} />
          <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-2 space-y-1">
            <input
              value={b.content}
              onChange={(e) => onUpdate(b.id, e.target.value)}
              className="w-full text-xs text-gray-400 bg-gray-50 border border-gray-200 rounded px-2 py-1 outline-none"
              placeholder="Image URL"
            />
            <div className="flex gap-2 items-center">
              <label className="text-[10px] text-gray-500">Width:</label>
              <input
                value={b.styles?.width || "100%"}
                onChange={(e) => onUpdateStyle(b.id, "width", e.target.value)}
                className="w-20 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded px-2 py-0.5 outline-none"
                placeholder="e.g. 300px"
              />
              <label className="text-[10px] text-gray-500">Height:</label>
              <input
                value={b.styles?.height || "auto"}
                onChange={(e) => onUpdateStyle(b.id, "height", e.target.value)}
                className="w-20 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded px-2 py-0.5 outline-none"
                placeholder="e.g. 200px"
              />
            </div>
          </div>
        </div>
      )}

      {b.type === "button" && (
        <div className="text-center">
          <input
            value={b.content}
            onChange={(e) => onUpdate(b.id, e.target.value)}
            className="inline-block px-6 py-3 text-white font-semibold rounded-lg text-sm bg-transparent outline-none text-center"
            style={{ background: b.styles?.background || "linear-gradient(135deg, #3b82f6, #06b6d4)" }}
          />
        </div>
      )}

      {b.type === "divider" && <hr className="border-gray-200 my-2" />}

      {b.type === "social" && (
        <input
          value={b.content}
          onChange={(e) => onUpdate(b.id, e.target.value)}
          className="w-full text-xs text-gray-500 bg-transparent border-none outline-none text-center"
        />
      )}

      {b.type === "columns" && (
        <input
          value={b.content}
          onChange={(e) => onUpdate(b.id, e.target.value)}
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
            onChange={(e) => onUpdate(b.id, e.target.value)}
            rows={6}
            className="w-full mt-2 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-md p-2 font-mono outline-none resize-y"
            placeholder="Enter HTML code..."
          />
        </div>
      )}
    </div>
  );
};

export default SortableBlock;
