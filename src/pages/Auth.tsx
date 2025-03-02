
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, User, Shield, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useInterop } from "@/contexts/InteropContext";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isConnected, sendMessage } = useInterop();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      // Send login request to .NET host
      if (isConnected) {
        // In real implementation, we would wait for a response from the host
        // For now, we'll simulate a successful auth after 1 second
        sendMessage("AUTH_REQUEST", { 
          username, 
          // NOTE: In production we should hash this password first
          // Only sending for demo purposes
          password 
        });
        
        setTimeout(() => {
          setIsLoading(false);
          // Simulate successful login
          navigate("/radar");
        }, 1000);
      } else {
        // If not connected to .NET host, simulate local auth
        // In production, this would be removed and we'd rely on the host
        setTimeout(() => {
          setIsLoading(false);
          if (username === "admin" && password === "password") {
            navigate("/radar");
          } else {
            setError("Invalid credentials");
          }
        }, 1000);
      }
    } catch (err) {
      setIsLoading(false);
      setError("Authentication failed. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <Card className="w-full max-w-md border-slate-700 bg-slate-800/50 shadow-xl backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight text-cyan-400">
            System Authentication
          </CardTitle>
          <CardDescription className="text-slate-400">
            Enter your credentials to access the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            {error && (
              <Alert variant="destructive" className="mb-4 bg-red-900/20 border-red-900">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-200">
                  Username
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="h-4 w-4 text-slate-400" />
                  </div>
                  <Input
                    id="username"
                    placeholder="Enter username"
                    className="pl-10 bg-slate-900/50 border-slate-700 text-slate-200"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">
                  Password
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-4 w-4 text-slate-400" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    className="pl-10 bg-slate-900/50 border-slate-700 text-slate-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white" 
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-200 border-t-transparent"></span>
                Authenticating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Login
              </span>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
