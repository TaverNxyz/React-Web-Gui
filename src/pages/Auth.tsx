
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useInterop } from "@/contexts/InteropContext";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { sendMessage, isConnected } = useInterop();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // If connected to host, send real auth request
    if (isConnected) {
      sendMessage("AUTH_REQUEST", { username, password });
      
      // In a real implementation, you would handle the response
      // For demo purposes, we'll just simulate a successful login
      setTimeout(() => {
        // Set authentication status
        sessionStorage.setItem("authenticated", "true");
        
        setIsLoading(false);
        toast({
          title: "Authentication Successful",
          description: "Welcome back, " + username,
        });
        
        // After successful login, navigate to the radar view as default
        navigate("/radar");
      }, 1500);
    } else {
      // Simulate login for development/testing
      setTimeout(() => {
        // Set authentication status
        sessionStorage.setItem("authenticated", "true");
        
        setIsLoading(false);
        toast({
          title: "Simulated Login",
          description: "Host not connected. Simulating successful login.",
        });
        
        // After successful login, navigate to the radar view as default
        navigate("/radar");
      }, 1500);
    }
  };

  const simulateLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Set authentication status
      sessionStorage.setItem("authenticated", "true");
      
      setIsLoading(false);
      toast({
        title: "Simulation Successful",
        description: "You've been logged in automatically",
      });
      
      // Navigate to radar by default
      navigate("/radar");
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <Card className="w-[350px] bg-slate-950 border-slate-800">
        <CardHeader>
          <CardTitle className="text-xl text-cyan-400">Authentication Required</CardTitle>
          <CardDescription>Enter your credentials to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-slate-900 border-slate-800"
              />
            </div>
            <div className="space-y-2">
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-900 border-slate-800"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-cyan-700 hover:bg-cyan-600"
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button 
            variant="outline" 
            className="w-full border-cyan-800 text-cyan-400" 
            onClick={simulateLogin}
            disabled={isLoading}
          >
            Simulate Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
