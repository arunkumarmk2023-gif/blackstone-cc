import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Fixtures from "./pages/Fixtures";
import Players from "./pages/Players";
import News from "./pages/News";
import Gallery from "./pages/Gallery";
import Sponsors from "./pages/Sponsors";
import JoinUs from "./pages/JoinUs";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/fixtures"} component={Fixtures} />
      <Route path={"/players"} component={Players} />
      <Route path={"/news"} component={News} />
      <Route path={"/gallery"} component={Gallery} />
      <Route path={"/sponsors"} component={Sponsors} />
      <Route path={"/join-us"} component={JoinUs} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
