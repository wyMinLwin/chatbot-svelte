import { supabase } from "$lib/supabaseClient";
import { json } from "@sveltejs/kit";

export async function POST() {
    const {data,error} = await supabase.auth.signInWithOAuth({provider: 'google'})
    console.log(data,error)
    return json({data})
}