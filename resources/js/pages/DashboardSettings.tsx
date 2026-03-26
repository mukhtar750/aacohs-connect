import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "sonner";
import { FormEventHandler } from "react";

interface Props {
  initialSettings: Record<string, any>;
}

const DashboardSettings = ({ initialSettings = {} }: Props) => {
  const { data, setData, post, processing } = useForm({
    sender_name: initialSettings.sender_name || "AACOHS Communications",
    sender_email: initialSettings.sender_email || "noreply@aacohs.edu.ng",
    track_opens: initialSettings.track_opens === "true" || initialSettings.track_opens === true || true,
    track_clicks: initialSettings.track_clicks === "true" || initialSettings.track_clicks === true || true,
    auto_unsubscribe: initialSettings.auto_unsubscribe === "true" || initialSettings.auto_unsubscribe === true || true,
    smtp_host: initialSettings.smtp_host || "",
    smtp_port: initialSettings.smtp_port || "",
    smtp_encryption: initialSettings.smtp_encryption || "",
    smtp_password: initialSettings.smtp_password || "",
    smtp_username: initialSettings.smtp_username || "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("settings.update"), {
      onSuccess: () => toast.success("Settings saved successfully"),
      onError: () => toast.error("Failed to save settings"),
    });
  };

  return (
    <DashboardLayout>
      <form onSubmit={submit} className="max-w-2xl space-y-8">
        <div className="glass rounded-xl p-6">
          <h3 className="font-display font-semibold text-foreground mb-4">Sender Defaults</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-foreground">Default Sender Name</Label>
              <Input 
                value={data.sender_name} 
                onChange={(e) => setData("sender_name", e.target.value)} 
                className="bg-secondary border-border text-foreground" 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Default Sender Email</Label>
              <Input 
                value={data.sender_email} 
                onChange={(e) => setData("sender_email", e.target.value)} 
                className="bg-secondary border-border text-foreground" 
              />
            </div>
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
              <Switch checked={data.track_opens} onCheckedChange={(val) => setData('track_opens', val)} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Track Clicks</p>
                <p className="text-xs text-muted-foreground">Wrap links for click tracking</p>
              </div>
              <Switch checked={data.track_clicks} onCheckedChange={(val) => setData('track_clicks', val)} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Auto Unsubscribe Link</p>
                <p className="text-xs text-muted-foreground">Add unsubscribe footer to all campaigns</p>
              </div>
              <Switch checked={data.auto_unsubscribe} onCheckedChange={(val) => setData('auto_unsubscribe', val)} />
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <h3 className="font-display font-semibold text-foreground mb-4">SMTP Configuration</h3>
          <p className="text-sm text-muted-foreground mb-4">Connect your SMTP provider to start sending emails. Supports SendGrid, Mailgun, Amazon SES, or custom SMTP.</p>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-foreground">SMTP Host</Label>
              <Input value={data.smtp_host} onChange={(e) => setData("smtp_host", e.target.value)} placeholder="smtp.sendgrid.net" className="bg-secondary border-border text-foreground" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground">Port</Label>
                <Input value={data.smtp_port} onChange={(e) => setData("smtp_port", e.target.value)} placeholder="587" className="bg-secondary border-border text-foreground" />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Encryption</Label>
                <Input value={data.smtp_encryption} onChange={(e) => setData("smtp_encryption", e.target.value)} placeholder="TLS" className="bg-secondary border-border text-foreground" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground">SMTP Username</Label>
                <Input value={data.smtp_username} onChange={(e) => setData("smtp_username", e.target.value)} placeholder="apikey" className="bg-secondary border-border text-foreground" />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">API Key / Password</Label>
                <Input value={data.smtp_password} onChange={(e) => setData("smtp_password", e.target.value)} type="password" placeholder="••••••••" className="bg-secondary border-border text-foreground" />
              </div>
            </div>
            
            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={processing} className="gradient-primary text-primary-foreground">
                {processing ? "Saving..." : "Save All Settings"}
              </Button>
              <Button type="button" variant="outline" className="border-border text-foreground hover:bg-secondary" onClick={() => toast.info("SMTP test coming soon")}>
                Test Connection
              </Button>
            </div>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default DashboardSettings;
