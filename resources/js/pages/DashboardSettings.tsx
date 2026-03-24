import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "sonner";

const DashboardSettings = () => {
  const [senderName, setSenderName] = useState("AACOHS Communications");
  const [senderEmail, setSenderEmail] = useState("noreply@aacohs.edu.ng");

  return (
    <DashboardLayout>
      <div className="max-w-2xl space-y-8">
        <div className="glass rounded-xl p-6">
          <h3 className="font-display font-semibold text-foreground mb-4">Sender Defaults</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-foreground">Default Sender Name</Label>
              <Input value={senderName} onChange={(e) => setSenderName(e.target.value)} className="bg-secondary border-border text-foreground" />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Default Sender Email</Label>
              <Input value={senderEmail} onChange={(e) => setSenderEmail(e.target.value)} className="bg-secondary border-border text-foreground" />
            </div>
            <Button className="gradient-primary text-primary-foreground" onClick={() => toast.success("Settings saved")}>Save Changes</Button>
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <h3 className="font-display font-semibold text-foreground mb-4">Email Configuration</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Track Opens</p>
                <p className="text-xs text-muted-foreground">Insert tracking pixel in emails</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Track Clicks</p>
                <p className="text-xs text-muted-foreground">Wrap links for click tracking</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Auto Unsubscribe Link</p>
                <p className="text-xs text-muted-foreground">Add unsubscribe footer to all campaigns</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <h3 className="font-display font-semibold text-foreground mb-4">SMTP Configuration</h3>
          <p className="text-sm text-muted-foreground mb-4">Connect your SMTP provider to start sending emails. Supports SendGrid, Mailgun, Amazon SES, or custom SMTP.</p>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-foreground">SMTP Host</Label>
              <Input placeholder="smtp.sendgrid.net" className="bg-secondary border-border text-foreground" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground">Port</Label>
                <Input placeholder="587" className="bg-secondary border-border text-foreground" />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Encryption</Label>
                <Input placeholder="TLS" className="bg-secondary border-border text-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">API Key / Password</Label>
              <Input type="password" placeholder="••••••••" className="bg-secondary border-border text-foreground" />
            </div>
            <Button variant="outline" className="border-border text-foreground hover:bg-secondary" onClick={() => toast.info("SMTP test coming soon")}>Test Connection</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardSettings;
