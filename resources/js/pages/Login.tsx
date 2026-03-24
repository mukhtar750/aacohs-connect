import { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";

import { toast } from "sonner";

const Login = () => {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    post("/login", {
      onSuccess: () => toast.success("Welcome back, Admin!"),
      onError: () => toast.error("Invalid credentials"),
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 relative">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/10 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <div className="glass-strong rounded-2xl p-8 neon-border">
          <div className="flex items-center gap-3 mb-8">
            <Logo className="w-12 h-12" />

            <div>
              <h1 className="font-display font-bold text-xl text-foreground">AACOHS Mail</h1>
              <p className="text-xs text-muted-foreground">Admin Portal</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@aacohs.edu.ng"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                  className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={data.password}
                  onChange={(e) => setData("password", e.target.value)}
                  className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>
            <Button type="submit" disabled={processing} className="w-full gradient-primary text-primary-foreground font-semibold">
              {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Login with: <strong>admin@aacohs.edu.ng</strong> / <strong>password</strong>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
