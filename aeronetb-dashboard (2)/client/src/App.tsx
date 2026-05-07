import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Dashboard from "@/pages/Dashboard";
import IoTMonitoring from "@/pages/IoTMonitoring";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Orders from "@/pages/Orders";
import QualityControl from "@/pages/QualityControl";
import Settings from "@/pages/Settings";
import Shipments from "@/pages/Shipments";
import Suppliers from "@/pages/Suppliers";
import { Redirect, Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

function ProtectedRoute({
  component: Component,
}: {
  component: React.ComponentType;
}) {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Redirect to="/" />;
  return <Component />;
}

function Router() {
  const { isLoggedIn } = useAuth();

  return (
    <Switch>
      <Route path="/">
        {isLoggedIn ? <Redirect to="/dashboard" /> : <Login />}
      </Route>
      <Route path="/dashboard">
        <ProtectedRoute component={Dashboard} />
      </Route>
      <Route path="/orders">
        <ProtectedRoute component={Orders} />
      </Route>
      <Route path="/suppliers">
        <ProtectedRoute component={Suppliers} />
      </Route>
      <Route path="/shipments">
        <ProtectedRoute component={Shipments} />
      </Route>
      <Route path="/quality-control">
        <ProtectedRoute component={QualityControl} />
      </Route>
      <Route path="/iot-monitoring">
        <ProtectedRoute component={IoTMonitoring} />
      </Route>
      <Route path="/settings">
        <ProtectedRoute component={Settings} />
      </Route>
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
