import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, LayoutTemplate, MousePointerClick, Users, BarChart3, Zap, GraduationCap, BookOpen, Stethoscope, Globe } from "lucide-react";
import aacohsLogo from "@/assets/aacohs-logo.png";
import { Button } from "@/components/ui/button";
import ParticlesBackground from "@/components/ParticlesBackground";

const features = [
  { icon: Mail, title: "Email Campaigns", desc: "Create and send targeted campaigns to specific groups" },
  { icon: LayoutTemplate, title: "Smart Templates", desc: "Pre-built templates for newsletters, announcements & more" },
  { icon: MousePointerClick, title: "Drag & Drop Builder", desc: "Visual email designer with blocks and components" },
  { icon: Users, title: "Subscriber Management", desc: "Organize contacts with tags, groups and segments" },
  { icon: BarChart3, title: "Campaign Analytics", desc: "Track opens, clicks, bounces and engagement" },
  { icon: Zap, title: "Automation", desc: "Set up welcome emails, reminders and scheduled sends" },
];

const audiences = [
  { icon: GraduationCap, title: "Students", desc: "Admission updates, results, event invites, and campus news" },
  { icon: BookOpen, title: "Lecturers", desc: "Academic calendar, department updates, research bulletins" },
  { icon: Stethoscope, title: "Clinical Staff", desc: "Schedule changes, training notifications, policy updates" },
  { icon: Globe, title: "Stakeholders", desc: "Reports, partnership opportunities, institutional updates" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Landing = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ParticlesBackground />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5">
        <div className="flex items-center gap-3">
          <img src={aacohsLogo} alt="AACOHS Logo" className="w-10 h-10 object-contain" />
          <span className="font-display font-bold text-lg text-foreground">AACOHS Mail</span>
        </div>
        <Link to="/login">
          <Button variant="outline" className="neon-border bg-transparent text-foreground hover:bg-primary/10">
            Admin Login
          </Button>
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-20 pb-32">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase glass neon-border text-primary mb-6">
            Internal Communication Platform
          </span>
        </motion.div>
        <motion.h1
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold max-w-4xl leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="text-foreground">AACOHS</span>{" "}
          <span className="gradient-text">Communication</span>{" "}
          <span className="text-foreground">Platform</span>
        </motion.h1>
        <motion.p
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Smart Email Communication for Alao Akala College of Health and Science.
          Design, send, and track email campaigns with ease.
        </motion.p>
        <motion.div
          className="mt-10 flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link to="/login">
            <Button size="lg" className="gradient-primary text-primary-foreground font-semibold px-8 animate-pulse-glow">
              Admin Login
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 md:px-12 pb-24">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Powerful <span className="gradient-text">Features</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">Everything you need to manage institutional email communication.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="glass rounded-xl p-6 hover:neon-border transition-all duration-300 group cursor-default"
            >
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <f.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Audiences */}
      <section className="relative z-10 px-6 md:px-12 pb-24">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Reach Every <span className="gradient-text">Audience</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">Communicate effectively with every member of the AACOHS community.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {audiences.map((a, i) => (
            <motion.div
              key={a.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="glass rounded-xl p-6 text-center hover:neon-border transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-full gradient-accent flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <a.icon className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{a.title}</h3>
              <p className="text-muted-foreground text-sm">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-8 text-center">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} AACOHS – Alao Akala College of Health and Science. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Landing;
