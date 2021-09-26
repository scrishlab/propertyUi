import {createClient} from '@supabase/supabase-js';
const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMjU3NTg5OCwiZXhwIjoxOTQ4MTUxODk4fQ.PCd4jiJmZkLrMeA3qg6ry8Ocl1iAf1HjdcNFtpGZSzI";

const supabase = createClient("https://fvmqujwsitkcejuauyqf.supabase.co", anonKey);



export default supabase;