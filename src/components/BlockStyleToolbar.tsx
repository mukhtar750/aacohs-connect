import { AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline } from "lucide-react";
import { Block } from "@/lib/emailBlocks";

const fonts = [
  "Arial, sans-serif",
  "Georgia, serif",
  "Courier New, monospace",
  "Verdana, sans-serif",
  "Trebuchet MS, sans-serif",
  "Times New Roman, serif",
  "Tahoma, sans-serif",
  "Helvetica, sans-serif",
];

const fontLabels: Record<string, string> = {
  "Arial, sans-serif": "Arial",
  "Georgia, serif": "Georgia",
  "Courier New, monospace": "Courier",
  "Verdana, sans-serif": "Verdana",
  "Trebuchet MS, sans-serif": "Trebuchet",
  "Times New Roman, serif": "Times",
  "Tahoma, sans-serif": "Tahoma",
  "Helvetica, sans-serif": "Helvetica",
};

const colors = [
  "#1e3a5f", "#333333", "#000000", "#ffffff",
  "#3b82f6", "#ef4444", "#22c55e", "#f59e0b",
  "#8b5cf6", "#ec4899", "#06b6d4", "#64748b",
];

interface Props {
  block: Block;
  onUpdateStyle: (id: string, key: string, value: string) => void;
}

const BlockStyleToolbar = ({ block, onUpdateStyle }: Props) => {
  const s = block.styles || {};

  const toggle = (key: string, val: string, def: string) => {
    onUpdateStyle(block.id, key, s[key] === val ? def : val);
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5 mt-2 p-2 bg-gray-50 rounded-lg border border-gray-100">
      {/* Font family */}
      <select
        value={s.fontFamily || "Arial, sans-serif"}
        onChange={(e) => onUpdateStyle(block.id, "fontFamily", e.target.value)}
        className="text-[10px] h-6 px-1 rounded bg-white border border-gray-200 text-gray-600 outline-none cursor-pointer"
      >
        {fonts.map((f) => (
          <option key={f} value={f}>{fontLabels[f]}</option>
        ))}
      </select>

      {/* Font size */}
      <select
        value={s.fontSize || (block.type === "heading" ? "24px" : "14px")}
        onChange={(e) => onUpdateStyle(block.id, "fontSize", e.target.value)}
        className="text-[10px] h-6 w-14 px-1 rounded bg-white border border-gray-200 text-gray-600 outline-none cursor-pointer"
      >
        {["10px","12px","14px","16px","18px","20px","24px","28px","32px","36px","42px","48px"].map((sz) => (
          <option key={sz} value={sz}>{sz}</option>
        ))}
      </select>

      <div className="w-px h-4 bg-gray-200" />

      {/* Bold / Italic / Underline */}
      <button onClick={() => toggle("fontWeight", "bold", "normal")}
        className={`w-6 h-6 rounded flex items-center justify-center text-xs ${s.fontWeight === "bold" ? "bg-blue-500 text-white" : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-100"}`}>
        <Bold className="w-3 h-3" />
      </button>
      <button onClick={() => toggle("fontStyle", "italic", "normal")}
        className={`w-6 h-6 rounded flex items-center justify-center text-xs ${s.fontStyle === "italic" ? "bg-blue-500 text-white" : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-100"}`}>
        <Italic className="w-3 h-3" />
      </button>
      <button onClick={() => toggle("textDecoration", "underline", "none")}
        className={`w-6 h-6 rounded flex items-center justify-center text-xs ${s.textDecoration === "underline" ? "bg-blue-500 text-white" : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-100"}`}>
        <Underline className="w-3 h-3" />
      </button>

      <div className="w-px h-4 bg-gray-200" />

      {/* Alignment */}
      {(["left", "center", "right"] as const).map((a) => {
        const Icon = a === "left" ? AlignLeft : a === "center" ? AlignCenter : AlignRight;
        return (
          <button key={a} onClick={() => onUpdateStyle(block.id, "textAlign", a)}
            className={`w-6 h-6 rounded flex items-center justify-center ${s.textAlign === a ? "bg-blue-500 text-white" : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-100"}`}>
            <Icon className="w-3 h-3" />
          </button>
        );
      })}

      <div className="w-px h-4 bg-gray-200" />

      {/* Text color */}
      <div className="flex items-center gap-1">
        <span className="text-[9px] text-gray-400">Text</span>
        <div className="relative">
          <input
            type="color"
            value={s.color || (block.type === "heading" ? "#1e3a5f" : "#333333")}
            onChange={(e) => onUpdateStyle(block.id, "color", e.target.value)}
            className="w-5 h-5 rounded cursor-pointer border border-gray-200 p-0"
          />
        </div>
        <div className="flex gap-0.5">
          {colors.slice(0, 6).map((c) => (
            <button key={c} onClick={() => onUpdateStyle(block.id, "color", c)}
              className="w-3.5 h-3.5 rounded-sm border border-gray-200" style={{ background: c }} />
          ))}
        </div>
      </div>

      {/* Background color */}
      <div className="flex items-center gap-1">
        <span className="text-[9px] text-gray-400">Bg</span>
        <input
          type="color"
          value={s.backgroundColor || "#ffffff"}
          onChange={(e) => onUpdateStyle(block.id, "backgroundColor", e.target.value)}
          className="w-5 h-5 rounded cursor-pointer border border-gray-200 p-0"
        />
        <button onClick={() => onUpdateStyle(block.id, "backgroundColor", "transparent")}
          className="text-[9px] px-1 py-0.5 rounded bg-white border border-gray-200 text-gray-400 hover:bg-gray-100">
          None
        </button>
      </div>

      {/* Line height */}
      <div className="flex items-center gap-1">
        <span className="text-[9px] text-gray-400">Line</span>
        <select
          value={s.lineHeight || "1.6"}
          onChange={(e) => onUpdateStyle(block.id, "lineHeight", e.target.value)}
          className="text-[10px] h-6 w-12 px-1 rounded bg-white border border-gray-200 text-gray-600 outline-none cursor-pointer"
        >
          {["1", "1.2", "1.4", "1.6", "1.8", "2", "2.4"].map((lh) => (
            <option key={lh} value={lh}>{lh}</option>
          ))}
        </select>
      </div>

      {/* Padding */}
      <div className="flex items-center gap-1">
        <span className="text-[9px] text-gray-400">Pad</span>
        <select
          value={s.padding || "0px"}
          onChange={(e) => onUpdateStyle(block.id, "padding", e.target.value)}
          className="text-[10px] h-6 w-14 px-1 rounded bg-white border border-gray-200 text-gray-600 outline-none cursor-pointer"
        >
          {["0px","4px","8px","12px","16px","24px","32px"].map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BlockStyleToolbar;
