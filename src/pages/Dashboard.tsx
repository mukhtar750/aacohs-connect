import { motion } from "framer-motion";
import { Mail, Users, Eye, MousePointerClick, TrendingUp, Send } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import DashboardLayout from "@/components/DashboardLayout";

const stats = [
  { label: "Total Campaigns", value: "47", icon: Mail, change: "+12%" },
  { label: "Subscribers", value: "2,834", icon: Users, change: "+8%" },
  { label: "Open Rate", value: "68.4%", icon: Eye, change: "+3.2%" },
  { label: "Click Rate", value: "24.1%", icon: MousePointerClick, change: "+1.8%" },
];

const chartData = [
  { month: "Jan", sent: 320, opened: 210, clicked: 80 },
  { month: "Feb", sent: 450, opened: 310, clicked: 120 },
  { month: "Mar", sent: 380, opened: 260, clicked: 95 },
  { month: "Apr", sent: 520, opened: 380, clicked: 150 },
  { month: "May", sent: 610, opened: 440, clicked: 190 },
  { month: "Jun", sent: 580, opened: 410, clicked: 175 },
];

const recentCampaigns = [
  { name: "Admission Notice 2025", status: "Sent", recipients: 1240, openRate: "72%", date: "Mar 8" },
  { name: "Mid-Semester Exam Schedule", status: "Sent", recipients: 890, openRate: "81%", date: "Mar 5" },
  { name: "Health Week Newsletter", status: "Draft", recipients: 0, openRate: "—", date: "Mar 10" },
  { name: "Staff Meeting Reminder", status: "Scheduled", recipients: 156, openRate: "—", date: "Mar 12" },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-5 hover:neon-border transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                <s.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xs font-medium text-success flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> {s.change}
              </span>
            </div>
            <p className="text-2xl font-display font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass rounded-xl p-6">
          <h3 className="font-display font-semibold text-foreground mb-4">Campaign Performance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="month" stroke="hsl(215, 20%, 55%)" fontSize={12} />
              <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(222, 47%, 9%)", border: "1px solid hsl(222, 30%, 18%)", borderRadius: "8px", color: "hsl(210, 40%, 96%)" }} />
              <Bar dataKey="sent" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="opened" fill="hsl(199, 89%, 48%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass rounded-xl p-6">
          <h3 className="font-display font-semibold text-foreground mb-4">Engagement Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={chartData}>
              <XAxis dataKey="month" stroke="hsl(215, 20%, 55%)" fontSize={12} />
              <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(222, 47%, 9%)", border: "1px solid hsl(222, 30%, 18%)", borderRadius: "8px", color: "hsl(210, 40%, 96%)" }} />
              <Area type="monotone" dataKey="clicked" stroke="hsl(199, 89%, 48%)" fill="hsl(199, 89%, 48%)" fillOpacity={0.15} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Campaigns */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass rounded-xl p-6">
        <h3 className="font-display font-semibold text-foreground mb-4">Recent Campaigns</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground border-b border-border">
                <th className="text-left py-3 px-2 font-medium">Campaign</th>
                <th className="text-left py-3 px-2 font-medium">Status</th>
                <th className="text-left py-3 px-2 font-medium">Recipients</th>
                <th className="text-left py-3 px-2 font-medium">Open Rate</th>
                <th className="text-left py-3 px-2 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentCampaigns.map((c) => (
                <tr key={c.name} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 px-2 text-foreground font-medium flex items-center gap-2">
                    <Send className="w-4 h-4 text-primary" /> {c.name}
                  </td>
                  <td className="py-3 px-2">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      c.status === "Sent" ? "bg-success/20 text-success" :
                      c.status === "Draft" ? "bg-muted text-muted-foreground" :
                      "bg-warning/20 text-warning"
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-muted-foreground">{c.recipients.toLocaleString()}</td>
                  <td className="py-3 px-2 text-muted-foreground">{c.openRate}</td>
                  <td className="py-3 px-2 text-muted-foreground">{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Dashboard;
