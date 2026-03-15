import { templateHTML } from "@/components/TemplatePreview";

export interface CustomTemplate {
  id: number;
  name: string;
  desc: string;
  color: string;
  html: string;
}

const defaultTemplates: CustomTemplate[] = [
  { id: 1, name: "Newsletter", desc: "Weekly campus newsletter with sections for news, events and updates", color: "from-blue-500 to-cyan-500", html: templateHTML["Newsletter"] || "" },
  { id: 2, name: "Announcement", desc: "Important institutional announcements with clear call-to-action", color: "from-violet-500 to-purple-500", html: templateHTML["Announcement"] || "" },
  { id: 3, name: "Event Invitation", desc: "Beautifully designed event invite with RSVP button", color: "from-emerald-500 to-teal-500", html: templateHTML["Event Invitation"] || "" },
  { id: 4, name: "School Updates", desc: "General updates about campus life, policies and calendars", color: "from-amber-500 to-orange-500", html: templateHTML["School Updates"] || "" },
  { id: 5, name: "Admission Notice", desc: "Admission confirmation with important enrollment details", color: "from-pink-500 to-rose-500", html: templateHTML["Admission Notice"] || "" },
  { id: 6, name: "Result Notification", desc: "Exam result notification with links to the student portal", color: "from-indigo-500 to-blue-500", html: templateHTML["Result Notification"] || "" },
];

const gradientOptions = [
  "from-blue-500 to-cyan-500",
  "from-violet-500 to-purple-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-pink-500 to-rose-500",
  "from-indigo-500 to-blue-500",
  "from-red-500 to-orange-500",
  "from-teal-500 to-green-500",
];

let listeners: (() => void)[] = [];
let templates: CustomTemplate[] = [...defaultTemplates];

export function getTemplates() {
  return templates;
}

export function addTemplate(name: string, desc: string, html: string) {
  const color = gradientOptions[templates.length % gradientOptions.length];
  const newTemplate: CustomTemplate = {
    id: Date.now(),
    name,
    desc,
    color,
    html,
  };
  templates = [...templates, newTemplate];
  listeners.forEach((l) => l());
  return newTemplate;
}

export function subscribeTemplates(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}
