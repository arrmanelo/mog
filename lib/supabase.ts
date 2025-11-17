import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://swxgpgaijdvliquarljm.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3eGdwZ2FpamR2bGlxdWFybGptIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjQxMjA1MCwiZXhwIjoyMDc3OTg4MDUwfQ.HYl07iWPerSsqkMonh-QzINRG09rVWbzMaxt_lDEDuE"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)