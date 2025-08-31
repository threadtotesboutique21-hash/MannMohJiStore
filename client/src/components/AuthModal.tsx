import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would be handled by Replit Auth
    console.log("Form submitted", { email, password, isLogin });
  };

  const handleGoogleLogin = () => {
    window.location.href = "/api/login";
  };

  const handleGuestContinue = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            <h2 className="font-serif text-3xl font-bold text-card-foreground mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-muted-foreground font-normal">
              {isLogin ? "Sign in to your account" : "Join our fashion community"}
            </p>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-2">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full"
                data-testid="input-auth-email"
              />
            </div>
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-card-foreground mb-2">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full"
                data-testid="input-auth-password"
              />
            </div>
            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                    data-testid="checkbox-remember-me"
                  />
                  <Label htmlFor="remember" className="text-sm text-muted-foreground">
                    Remember me
                  </Label>
                </div>
                <a href="#" className="text-sm text-primary hover:text-primary/80" data-testid="link-forgot-password">
                  Forgot password?
                </a>
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full luxury-button text-white py-3 rounded-lg font-semibold"
              data-testid="button-auth-submit"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>
          
          <div className="text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-4 text-muted-foreground">Or continue with</span>
              </div>
            </div>
          </div>
          
          {/* Social Login */}
          <div className="space-y-3">
            <Button 
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full flex items-center justify-center px-4 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
              data-testid="button-google-login"
            >
              <i className="fab fa-google text-red-500 mr-3"></i>
              <span className="text-card-foreground">Continue with Google</span>
            </Button>
            <Button 
              onClick={handleGuestContinue}
              variant="ghost"
              className="w-full text-muted-foreground hover:text-foreground transition-colors"
              data-testid="button-guest-continue"
            >
              Continue as Guest
            </Button>
          </div>
          
          <p className="text-center text-sm text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:text-primary/80 font-semibold"
              data-testid="button-toggle-auth-mode"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
