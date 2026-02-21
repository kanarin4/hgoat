import { supabase } from "../services/supabaseClient";
import { USE_SUPABASE } from "../services/config";

export async function logout() {
  if (!USE_SUPABASE) {
    console.log("Mocking logout...");
    window.location.reload(); // Refresh to clear mock session in useSession
    return;
  }

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Logout error:", error.message);
    alert("Logout failed.");
  } else {
    console.log("Logged out successfully");
  }
}