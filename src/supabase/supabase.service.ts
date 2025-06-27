/* eslint-disable prettier/prettier */
 
import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const databaseUrl ="https://rsctlmexmrtoamsucnsp.supabase.co";
    
    const supabaseKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzY3RsbWV4bXJ0b2Ftc3VjbnNwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MTc2NzU0NywiZXhwIjoyMDU3MzQzNTQ3fQ.pNmAk7BSwi_Vt_7lWrrMXKboXpbwNQ_LRO5MnP8hvF4"   
  

    this.supabase = createClient(databaseUrl, supabaseKey, {
      auth: {
        persistSession: false,  
        autoRefreshToken: false
      },
      global: {  // <-- Correct property name for headers in v2
        headers: {
          'Authorization': `Bearer ${supabaseKey}`,
          'apikey': supabaseKey
        }
      }
    });
  }

  getClient() {
    return this.supabase;
  }
}
