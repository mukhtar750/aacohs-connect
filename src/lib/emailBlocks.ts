export type Block = {
  id: string;
  type: string;
  content: string;
  styles?: Record<string, string>;
};

export const blockTypes = [
  { type: "heading", label: "Heading" },
  { type: "text", label: "Text Block" },
  { type: "image", label: "Image" },
  { type: "button", label: "Button" },
  { type: "divider", label: "Divider" },
  { type: "social", label: "Social Icons" },
  { type: "columns", label: "Columns" },
  { type: "html", label: "Custom HTML" },
] as const;

export const defaultContent: Record<string, string> = {
  heading: "Welcome to AACOHS",
  text: "This is a paragraph of text. Edit it to add your own content.",
  image: "https://placehold.co/600x200/1e3a5f/60a5fa?text=AACOHS+Banner",
  button: "Learn More",
  divider: "",
  social: "Facebook | Twitter | Instagram",
  columns: "Column 1 | Column 2",
  html: '<div style="padding:16px;background:#f0f9ff;border-radius:8px"><p style="color:#333;font-family:Arial,sans-serif">Custom HTML block — edit this code</p></div>',
};

/** Parse a template HTML string into editable blocks */
export function parseHTMLToBlocks(html: string): Block[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div>${html}</div>`, "text/html");
  const root = doc.body.firstElementChild;
  if (!root) return [{ id: Date.now().toString(), type: "html", content: html }];

  const blocks: Block[] = [];
  let id = Date.now();

  const walk = (el: Element) => {
    const children = Array.from(el.children);
    for (const child of children) {
      const tag = child.tagName.toLowerCase();

      // Headings
      if (/^h[1-6]$/.test(tag)) {
        const fontSize = (child as HTMLElement).style.fontSize || "24px";
        blocks.push({ id: String(id++), type: "heading", content: child.textContent || "", styles: { fontSize } });
        continue;
      }

      // Images
      if (tag === "img") {
        const img = child as HTMLImageElement;
        blocks.push({
          id: String(id++), type: "image", content: img.src,
          styles: { width: img.style.width || "100%", height: img.style.height || "auto" },
        });
        continue;
      }

      // HR / divider
      if (tag === "hr") {
        blocks.push({ id: String(id++), type: "divider", content: "" });
        continue;
      }

      // Links that look like buttons (inline-block with padding)
      if (tag === "a" && (child as HTMLElement).style.display === "inline-block") {
        blocks.push({
          id: String(id++), type: "button", content: child.textContent || "",
          styles: { background: (child as HTMLElement).style.background || "linear-gradient(135deg,#3b82f6,#06b6d4)" },
        });
        continue;
      }

      // Paragraphs
      if (tag === "p") {
        blocks.push({ id: String(id++), type: "text", content: child.textContent || "" });
        continue;
      }

      // Table → columns
      if (tag === "table") {
        const cells = Array.from(child.querySelectorAll("td")).map((td) => td.textContent?.trim() || "");
        if (cells.length) {
          blocks.push({ id: String(id++), type: "columns", content: cells.join(" | ") });
          continue;
        }
      }

      // Containers: recurse into divs, sections, etc.
      if (child.children.length > 0) {
        walk(child);
      } else if (child.textContent?.trim()) {
        blocks.push({ id: String(id++), type: "text", content: child.textContent.trim() });
      }
    }
  };

  walk(root);
  return blocks.length > 0 ? blocks : [{ id: String(id++), type: "html", content: html }];
}

export function generateHTML(blocks: Block[]): string {
  return blocks.map((b) => {
    const s = b.styles || {};
    switch (b.type) {
      case "heading": return `<h1 style="color:${s.color || "#1e3a5f"};font-family:${s.fontFamily || "Arial,sans-serif"};font-size:${s.fontSize || "24px"};font-weight:${s.fontWeight || "bold"};font-style:${s.fontStyle || "normal"};text-decoration:${s.textDecoration || "none"};text-align:${s.textAlign || "left"};background-color:${s.backgroundColor || "transparent"};line-height:${s.lineHeight || "1.4"};padding:${s.padding || "0"};margin:0 0 16px">${b.content}</h1>`;
      case "text": return `<p style="color:${s.color || "#333"};font-family:${s.fontFamily || "Arial,sans-serif"};font-size:${s.fontSize || "14px"};font-weight:${s.fontWeight || "normal"};font-style:${s.fontStyle || "normal"};text-decoration:${s.textDecoration || "none"};text-align:${s.textAlign || "left"};background-color:${s.backgroundColor || "transparent"};line-height:${s.lineHeight || "1.6"};padding:${s.padding || "0"};margin:0 0 16px">${b.content.replace(/\n/g, "<br>")}</p>`;
      case "image": return `<img src="${b.content}" alt="Email image" style="width:${s.width || "100%"};height:${s.height || "auto"};border-radius:8px;margin:0 0 16px" />`;
      case "button": return `<a href="${s.href || "#"}" style="display:inline-block;padding:12px 24px;background:${s.background || "linear-gradient(135deg,#3b82f6,#06b6d4)"};color:#fff;text-decoration:none;border-radius:8px;font-family:Arial,sans-serif;font-weight:600;margin:0 0 16px">${b.content}</a>`;
      case "divider": return `<hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0" />`;
      case "social": return `<p style="color:${s.color || "#666"};font-family:${s.fontFamily || "Arial,sans-serif"};font-size:${s.fontSize || "12px"};text-align:center;margin:16px 0">${b.content}</p>`;
      case "columns": return `<table width="100%"><tr>${b.content.split("|").map((c) => `<td style="padding:8px;font-family:Arial,sans-serif;font-size:14px;color:#333">${c.trim()}</td>`).join("")}</tr></table>`;
      case "html": return b.content;
      default: return "";
    }
  }).join("\n");
}
