    import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
     console.log (createClient);
    const supaKey = 'https://jzxxnlisarhqbdkqobmy.supabase.co';
    const supaUrl = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6eHhubGlzYXJocWJka3FvYm15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNDEyMzQsImV4cCI6MjA3NjgxNzIzNH0.blYwoj2ObZ0Om5UoARD07HNFk9xXvfKmXIfihRIzf8Q';

    const supaBase = createClient (supaKey , supaUrl);

    export default supaBase