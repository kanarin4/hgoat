import { supabase } from "../services/supabaseClient";

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Logout error:", error.message);
    alert("Logout failed.");
  } else {
    console.log("Logged out successfully");
  }
}