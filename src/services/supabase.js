import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://cldvuzgablydetvixsvy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsZHZ1emdhYmx5ZGV0dml4c3Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MjM5NjIsImV4cCI6MjA1MDE5OTk2Mn0.FWNaBX-Ne65A4lxNM3DqaWySKdrDeruvRvsxR4XVwAU";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
