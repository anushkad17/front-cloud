import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Cloud } from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative z-10 w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 gradient-ai rounded-2xl flex items-center justify-center shadow-glow animate-float">
            <Cloud className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">
              CloudSync AI
            </h1>
            <p className="text-white/80">
              Intelligent cloud storage with AI-powered features
            </p>
          </div>
        </div>

        <div className="animate-fade-in">
          {isLogin ? (
            <LoginForm onToggleForm={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onToggleForm={() => setIsLogin(true)} />
          )}
        </div>

        <div className="text-center text-white/60 text-sm">
          <p>© 2024 CloudSync AI. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
