
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, User, Shield, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useInterop } from "@/contexts/InteropContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import InteropService from "@/utils/interopService";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isConnected, sendMessage } = useInterop();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Set up listener for AUTH_RESPONSE message
  useEffect(() => {
    const handleAuthResponse = (event) => {
      if (event.data && event.data.type === "AUTH_RESPONSE") {
        setIsLoading(false);
        const response = event.data.payload;
        
        if (response.success) {
          toast({
            title: "Authentication Successful",
            description: `Welcome back, ${response.username}`,
          });
          navigate("/radar");
        } else {
          setError(response.errorMessage || "Authentication failed");
        }
      }
    };

    // Add the event listener for window messages
    window.addEventListener("message", handleAuthResponse);

    // Set up interop service handler for auth responses
    const authResponseHandler = (message) => {
      setIsLoading(false);
      const response = message.payload;
      
      if (response.success) {
        toast({
          title: "Authentication Successful",
          description: `Welcome back, ${response.username || 'user'}`,
        });
        navigate("/radar");
      } else {
        setError(response.errorMessage || "Authentication failed");
      }
    };

    // Register the handler with our interop service
    InteropService.on("AUTH_RESPONSE", authResponseHandler);
    
    return () => {
      window.removeEventListener("message", handleAuthResponse);
      InteropService.off("AUTH_RESPONSE", authResponseHandler);
    };
  }, [navigate, toast]);

  const simulateSuccessfulLogin = () => {
    setIsLoading(true);
    setError("");
    
    // Simulate a delay for authentication
    setTimeout(() => {
      // Simulate the response we'd get from the .NET host
      const simulatedResponse = {
        type: "AUTH_RESPONSE",
        payload: {
          success: true,
          token: "simulated-jwt-token-12345",
          expiresAt: Date.now() + 3600000, // 1 hour from now
          username: username || "admin"
        },
        timestamp: Date.now()
      };
      
      // Process the simulated response
      InteropService.simulateIncomingMessage("AUTH_RESPONSE", simulatedResponse.payload);
    }, 1500);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      if (isConnected) {
        // Send login request to .NET host
        InteropService.sendMessage("AUTH_REQUEST", { 
          username, 
          password 
        });
        
        // Response will be handled by the effect's handler
      } else {
        // For testing: simulate a successful login when not connected to host
        simulateSuccessfulLogin();
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

              <div className="flex justify-center mt-2">
                <Button 
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white" 
                  onClick={handleLogin}
                  disabled={isLoading}
                  type="button"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-200 border-t-transparent"></span>
                      Authenticating...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Shield className="h-4 w-4" />
                      Login
                    </span>
                  )}
                </Button>
              </div>
              
              <div className="mt-2">
                <Button 
                  variant="outline" 
                  className="w-full border-slate-700 bg-slate-900/30 text-slate-300 hover:bg-slate-900/50"
                  onClick={simulateSuccessfulLogin}
                  type="button"
                >
                  Simulate Successful Login
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
