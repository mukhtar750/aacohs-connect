import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Monitor, Smartphone } from "lucide-react";
import { useState } from "react";

const templateHTML: Record<string, string> = {
  Newsletter: `
    <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;background:#ffffff;border-radius:8px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#1e3a5f,#3b82f6);padding:32px;text-align:center">
        <h1 style="color:#fff;margin:0;font-size:28px">AACOHS Weekly Newsletter</h1>
        <p style="color:#93c5fd;margin:8px 0 0;font-size:14px">Alao Akala College of Health and Science</p>
      </div>
      <div style="padding:24px">
        <h2 style="color:#1e3a5f;font-size:20px;margin:0 0 12px">Campus Highlights</h2>
        <p style="color:#444;font-size:14px;line-height:1.7;margin:0 0 16px">Dear Community Member, here are this week's top stories from AACOHS. Stay informed about academics, events, and campus life.</p>
        <div style="background:#f0f9ff;border-left:4px solid #3b82f6;padding:16px;border-radius:4px;margin:0 0 16px">
          <h3 style="color:#1e3a5f;margin:0 0 4px;font-size:16px">📢 New Research Lab Opening</h3>
          <p style="color:#555;font-size:13px;margin:0">The new Biomedical Research Lab opens next Monday. All students are invited to the ribbon-cutting ceremony.</p>
        </div>
        <div style="background:#f0f9ff;border-left:4px solid #06b6d4;padding:16px;border-radius:4px;margin:0 0 16px">
          <h3 style="color:#1e3a5f;margin:0 0 4px;font-size:16px">🏆 Sports Day Results</h3>
          <p style="color:#555;font-size:13px;margin:0">Congratulations to the Department of Nursing for winning this year's inter-departmental sports competition!</p>
        </div>
        <div style="text-align:center;margin:24px 0">
          <a href="#" style="display:inline-block;padding:12px 32px;background:linear-gradient(135deg,#3b82f6,#06b6d4);color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px">Read More on Portal</a>
        </div>
      </div>
      <div style="background:#f8fafc;padding:16px;text-align:center;border-top:1px solid #e5e7eb">
        <p style="color:#94a3b8;font-size:11px;margin:0">AACOHS – Alao Akala College of Health and Science</p>
        <p style="color:#94a3b8;font-size:11px;margin:4px 0 0"><a href="#" style="color:#3b82f6;text-decoration:underline">Unsubscribe</a></p>
      </div>
    </div>`,
  Announcement: `
    <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;background:#ffffff;border-radius:8px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#7c3aed,#a855f7);padding:40px 32px;text-align:center">
        <div style="font-size:48px;margin-bottom:12px">📣</div>
        <h1 style="color:#fff;margin:0;font-size:26px">Important Announcement</h1>
      </div>
      <div style="padding:24px">
        <h2 style="color:#7c3aed;font-size:18px;margin:0 0 12px;text-align:center">Academic Calendar Update</h2>
        <p style="color:#444;font-size:14px;line-height:1.7;margin:0 0 16px;text-align:center">The management of AACOHS wishes to inform all students and staff of the following important update regarding the academic calendar.</p>
        <div style="background:#faf5ff;border:1px solid #e9d5ff;padding:20px;border-radius:8px;margin:0 0 20px">
          <p style="color:#6b21a8;font-size:14px;margin:0;font-weight:600">Key Details:</p>
          <ul style="color:#555;font-size:13px;line-height:2;margin:8px 0 0;padding-left:20px">
            <li>Resumption date: January 15, 2026</li>
            <li>Registration deadline: January 22, 2026</li>
            <li>Late registration fee applies after deadline</li>
          </ul>
        </div>
        <div style="text-align:center;margin:24px 0">
          <a href="#" style="display:inline-block;padding:12px 32px;background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px">View Full Details</a>
        </div>
      </div>
      <div style="background:#f8fafc;padding:16px;text-align:center;border-top:1px solid #e5e7eb">
        <p style="color:#94a3b8;font-size:11px;margin:0">AACOHS – Alao Akala College of Health and Science</p>
      </div>
    </div>`,
  "Event Invitation": `
    <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;background:#ffffff;border-radius:8px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#059669,#14b8a6);padding:40px 32px;text-align:center">
        <div style="font-size:48px;margin-bottom:12px">🎉</div>
        <h1 style="color:#fff;margin:0;font-size:26px">You're Invited!</h1>
        <p style="color:#a7f3d0;margin:8px 0 0;font-size:14px">AACOHS Annual Gala Night 2026</p>
      </div>
      <div style="padding:24px">
        <table width="100%" style="margin:0 0 20px">
          <tr><td style="padding:8px 0;color:#888;font-size:13px;width:80px">📅 Date</td><td style="color:#333;font-size:14px;font-weight:600">March 28, 2026</td></tr>
          <tr><td style="padding:8px 0;color:#888;font-size:13px">⏰ Time</td><td style="color:#333;font-size:14px;font-weight:600">6:00 PM</td></tr>
          <tr><td style="padding:8px 0;color:#888;font-size:13px">📍 Venue</td><td style="color:#333;font-size:14px;font-weight:600">AACOHS Main Auditorium</td></tr>
          <tr><td style="padding:8px 0;color:#888;font-size:13px">👔 Dress</td><td style="color:#333;font-size:14px;font-weight:600">Formal / Traditional</td></tr>
        </table>
        <p style="color:#444;font-size:14px;line-height:1.7;margin:0 0 20px">Join us for an evening of celebration, awards, and entertainment. Refreshments will be served.</p>
        <div style="text-align:center;margin:24px 0">
          <a href="#" style="display:inline-block;padding:14px 40px;background:linear-gradient(135deg,#059669,#14b8a6);color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:16px">RSVP Now</a>
        </div>
      </div>
      <div style="background:#f8fafc;padding:16px;text-align:center;border-top:1px solid #e5e7eb">
        <p style="color:#94a3b8;font-size:11px;margin:0">AACOHS – Alao Akala College of Health and Science</p>
      </div>
    </div>`,
  "School Updates": `
    <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;background:#ffffff;border-radius:8px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#d97706,#f59e0b);padding:32px;text-align:center">
        <h1 style="color:#fff;margin:0;font-size:26px">🏫 School Updates</h1>
        <p style="color:#fef3c7;margin:8px 0 0;font-size:13px">March 2026 Edition</p>
      </div>
      <div style="padding:24px">
        <div style="margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid #f3f4f6">
          <h3 style="color:#b45309;font-size:16px;margin:0 0 8px">📚 Library Hours Extended</h3>
          <p style="color:#555;font-size:13px;line-height:1.6;margin:0">The campus library will now remain open until 10 PM on weekdays to accommodate exam preparation.</p>
        </div>
        <div style="margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid #f3f4f6">
          <h3 style="color:#b45309;font-size:16px;margin:0 0 8px">🚌 New Shuttle Schedule</h3>
          <p style="color:#555;font-size:13px;line-height:1.6;margin:0">Updated shuttle routes and timings are now available on the student portal.</p>
        </div>
        <div style="margin-bottom:20px">
          <h3 style="color:#b45309;font-size:16px;margin:0 0 8px">🍽️ Cafeteria Menu Refresh</h3>
          <p style="color:#555;font-size:13px;line-height:1.6;margin:0">New healthy meal options have been added to the campus cafeteria starting this week.</p>
        </div>
        <div style="text-align:center;margin:20px 0">
          <a href="#" style="display:inline-block;padding:12px 32px;background:linear-gradient(135deg,#d97706,#f59e0b);color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px">Visit Student Portal</a>
        </div>
      </div>
      <div style="background:#f8fafc;padding:16px;text-align:center;border-top:1px solid #e5e7eb">
        <p style="color:#94a3b8;font-size:11px;margin:0">AACOHS – Alao Akala College of Health and Science</p>
      </div>
    </div>`,
  "Admission Notice": `
    <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;background:#ffffff;border-radius:8px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#e11d48,#f43f5e);padding:40px 32px;text-align:center">
        <div style="font-size:48px;margin-bottom:12px">🎓</div>
        <h1 style="color:#fff;margin:0;font-size:26px">Congratulations!</h1>
        <p style="color:#fecdd3;margin:8px 0 0;font-size:14px">You've Been Admitted to AACOHS</p>
      </div>
      <div style="padding:24px">
        <p style="color:#444;font-size:14px;line-height:1.7;margin:0 0 16px">Dear <strong>[Student Name]</strong>,</p>
        <p style="color:#444;font-size:14px;line-height:1.7;margin:0 0 16px">We are pleased to inform you that you have been offered admission into the <strong>[Programme Name]</strong> programme at Alao Akala College of Health and Science.</p>
        <div style="background:#fff1f2;border:1px solid #fecdd3;padding:20px;border-radius:8px;margin:0 0 20px">
          <p style="color:#9f1239;font-size:14px;margin:0 0 8px;font-weight:600">Next Steps:</p>
          <ol style="color:#555;font-size:13px;line-height:2;margin:0;padding-left:20px">
            <li>Accept your offer on the student portal</li>
            <li>Pay the acceptance fee before the deadline</li>
            <li>Upload required documents</li>
            <li>Collect your admission letter</li>
          </ol>
        </div>
        <div style="text-align:center;margin:24px 0">
          <a href="#" style="display:inline-block;padding:14px 40px;background:linear-gradient(135deg,#e11d48,#f43f5e);color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:16px">Accept Admission</a>
        </div>
      </div>
      <div style="background:#f8fafc;padding:16px;text-align:center;border-top:1px solid #e5e7eb">
        <p style="color:#94a3b8;font-size:11px;margin:0">AACOHS – Alao Akala College of Health and Science</p>
      </div>
    </div>`,
  "Result Notification": `
    <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;background:#ffffff;border-radius:8px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#4338ca,#6366f1);padding:40px 32px;text-align:center">
        <div style="font-size:48px;margin-bottom:12px">📊</div>
        <h1 style="color:#fff;margin:0;font-size:26px">Exam Results Published</h1>
        <p style="color:#c7d2fe;margin:8px 0 0;font-size:14px">2025/2026 First Semester</p>
      </div>
      <div style="padding:24px">
        <p style="color:#444;font-size:14px;line-height:1.7;margin:0 0 16px">Dear Student,</p>
        <p style="color:#444;font-size:14px;line-height:1.7;margin:0 0 16px">Your examination results for the <strong>2025/2026 First Semester</strong> have been published on the student portal.</p>
        <div style="background:#eef2ff;border:1px solid #c7d2fe;padding:20px;border-radius:8px;margin:0 0 20px;text-align:center">
          <p style="color:#4338ca;font-size:14px;margin:0 0 4px;font-weight:600">Session: 2025/2026</p>
          <p style="color:#555;font-size:13px;margin:0">Semester: First | Status: Published</p>
        </div>
        <p style="color:#666;font-size:13px;line-height:1.6;margin:0 0 16px">If you have any concerns about your results, please visit the Examinations Office within 2 weeks of publication.</p>
        <div style="text-align:center;margin:24px 0">
          <a href="#" style="display:inline-block;padding:14px 40px;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:16px">View Results</a>
        </div>
      </div>
      <div style="background:#f8fafc;padding:16px;text-align:center;border-top:1px solid #e5e7eb">
        <p style="color:#94a3b8;font-size:11px;margin:0">AACOHS – Alao Akala College of Health and Science</p>
      </div>
    </div>`,
};

interface TemplatePreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templateName: string;
}

const TemplatePreview = ({ open, onOpenChange, templateName }: TemplatePreviewProps) => {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const html = templateHTML[templateName] || "<p>No preview available</p>";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between pr-6">
            <span>{templateName} Template</span>
            <div className="flex gap-1">
              <Button size="sm" variant="ghost" onClick={() => setDevice("desktop")} className={device === "desktop" ? "text-primary" : "text-muted-foreground"}>
                <Monitor className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setDevice("mobile")} className={device === "mobile" ? "text-primary" : "text-muted-foreground"}>
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto bg-muted/50 rounded-lg p-4">
          <div
            className={`mx-auto transition-all ${device === "mobile" ? "max-w-[375px]" : "max-w-[600px]"}`}
            style={{ background: "#f1f5f9", padding: "16px", borderRadius: "8px" }}
          >
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { templateHTML };
export default TemplatePreview;
