import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Users, Eye, MousePointerClick, TrendingUp, Send } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import DashboardLayout from "@/components/DashboardLayout";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState([
    { label: "Total Campaigns", value: "0", icon: Mail, change: "+0%" },
    { label: "Subscribers", value: "0", icon: Users, change: "+0%" },
    { label: "Open Rate", value: "0%", icon: Eye, change: "+0%" },
    { label: "Click Rate", value: "0%", icon: MousePointerClick, change: "+0%" },
  ]);
  const [recentCampaigns, setRecentCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [campaignsRes, subscribersRes] = await Promise.all([
        axios.get("/api/campaigns"),
        axios.get("/api/subscribers"),
      ]);

      const campaigns = campaignsRes.data;
      const subscribers = subscribersRes.data;

      setStats([
        { label: "Total Campaigns", value: campaigns.length.toString(), icon: Mail, change: "+0%" },
        { label: "Subscribers", value: subscribers.length.toLocaleString(), icon: Users, change: "+0%" },
        { label: "Open Rate", value: "0%", icon: Eye, change: "+0%" },
        { label: "Click Rate", value: "0%", icon: MousePointerClick, change: "+0%" },
      ]);

      setRecentCampaigns(campaigns.slice(0, 5));
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    { month: "Jan", sent: 0, opened: 0, clicked: 0 },
    { month: "Feb", sent: 0, opened: 0, clicked: 0 },
    { month: "Mar", sent: 0, opened: 0, clicked: 0 },
    { month: "Apr", sent: 0, opened: 0, clicked: 0 },
    { month: "May", sent: 0, opened: 0, clicked: 0 },
    { month: "Jun", sent: 0, opened: 0, clicked: 0 },
  ];

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
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-muted-foreground border-b border-border">
                <th className="py-3 px-2 font-medium uppercase tracking-wider text-[10px]">Campaign</th>
                <th className="py-3 px-2 font-medium uppercase tracking-wider text-[10px]">Status</th>
                <th className="py-3 px-2 font-medium uppercase tracking-wider text-[10px]">Recipients</th>
                <th className="py-3 px-2 font-medium uppercase tracking-wider text-[10px]">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-muted-foreground">Loading...</td>
                </tr>
              ) : recentCampaigns.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-muted-foreground">No recent campaigns.</td>
                </tr>
              ) : (
                recentCampaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="py-4 px-2 text-foreground font-medium">{c.name}</td>
                    <td className="py-4 px-2">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${
                        c.status === "sent" ? "bg-success/20 text-success" :
                        c.status === "scheduled" ? "bg-warning/20 text-warning" : "bg-muted text-muted-foreground"
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-muted-foreground">{c.recipients_count.toLocaleString()}</td>
                    <td className="py-4 px-2 text-muted-foreground text-xs">{new Date(c.created_at).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Dashboard;
