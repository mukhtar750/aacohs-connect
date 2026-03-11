import { motion } from "framer-motion";
import { Mail, Eye, MousePointerClick, AlertTriangle, UserMinus } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import DashboardLayout from "@/components/DashboardLayout";

const overviewStats = [
  { label: "Emails Sent", value: "12,450", icon: Mail },
  { label: "Avg Open Rate", value: "68.4%", icon: Eye },
  { label: "Avg Click Rate", value: "24.1%", icon: MousePointerClick },
  { label: "Bounce Rate", value: "2.3%", icon: AlertTriangle },
  { label: "Unsubscribe Rate", value: "0.8%", icon: UserMinus },
];

const pieData = [
  { name: "Opened", value: 68.4, color: "hsl(217, 91%, 60%)" },
  { name: "Clicked", value: 24.1, color: "hsl(199, 89%, 48%)" },
  { name: "Ignored", value: 7.5, color: "hsl(222, 30%, 25%)" },
];

const campaignPerformance = [
  { name: "Admission Notice", opens: 890, clicks: 298 },
  { name: "Exam Schedule", opens: 720, clicks: 275 },
  { name: "Newsletter #12", opens: 650, clicks: 195 },
  { name: "Staff Meeting", opens: 120, clicks: 45 },
  { name: "Health Week", opens: 430, clicks: 160 },
];

const Analytics = () => {
  return (
    <DashboardLayout>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {overviewStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-xl p-4 text-center"
          >
            <s.icon className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-xl font-display font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass rounded-xl p-6">
          <h3 className="font-display font-semibold text-foreground mb-4">Engagement Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" stroke="none">
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-2">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                {d.name} ({d.value}%)
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass rounded-xl p-6">
          <h3 className="font-display font-semibold text-foreground mb-4">Top Campaigns</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={campaignPerformance} layout="vertical">
              <XAxis type="number" stroke="hsl(215, 20%, 55%)" fontSize={12} />
              <YAxis type="category" dataKey="name" stroke="hsl(215, 20%, 55%)" fontSize={11} width={110} />
              <Tooltip contentStyle={{ background: "hsl(222, 47%, 9%)", border: "1px solid hsl(222, 30%, 18%)", borderRadius: "8px", color: "hsl(210, 40%, 96%)" }} />
              <Bar dataKey="opens" fill="hsl(217, 91%, 60%)" radius={[0, 4, 4, 0]} />
              <Bar dataKey="clicks" fill="hsl(199, 89%, 48%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
