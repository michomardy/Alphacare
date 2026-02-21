import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gzcotwcnczymtecxbumm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6Y290d2NuY3p5bXRlY3hidW1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0MjU0NjUsImV4cCI6MjA4MTAwMTQ2NX0.ntF7Kfo6s53qXGGamVVTBV9tQ5FLw4wQlI87M0vc2Dg';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
