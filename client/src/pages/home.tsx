import { useAuth } from "@/hooks/useAuth";
import Landing from "./landing";

export default function Home() {
  const { isAuthenticated } = useAuth();
  
  // For now, authenticated users see the same landing page
  // This can be customized later to show personalized content
  return <Landing />;
}
