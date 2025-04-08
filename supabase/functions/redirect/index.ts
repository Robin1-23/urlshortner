// import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
// import { createClient } from 'npm:@supabase/supabase-js@2.39.7';

// const corsHeaders = {
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
// };

// serve(async (req) => {
//   if (req.method === 'OPTIONS') {
//     return new Response('ok', { headers: corsHeaders });
//   }

//   try {
//     const supabase = createClient(
//       Deno.env.get('SUPABASE_URL') ?? '',
//       Deno.env.get('SUPABASE_ANON_KEY') ?? ''
//     );

//     const url = new URL(req.url);
//     const shortCode = url.pathname.slice(1);

//     // Get link and check expiration
//     const { data: link, error: linkError } = await supabase
//       .from('links')
//       .select('id, original_url, expires_at')
//       .eq('short_code', shortCode)
//       .single();

//     if (linkError || !link) {
//       return new Response('Link not found', { status: 404 });
//     }

//     // Check if link has expired
//     if (link.expires_at && new Date(link.expires_at) < new Date()) {
//       return new Response('Link has expired', { status: 410 });
//     }

//     // Update click count
//     await supabase.rpc('increment_click_count', { link_id: link.id });

//     // Record analytics
//     const userAgent = req.headers.get('user-agent') || '';
//     const country = req.headers.get('cf-ipcountry') || '';
//     const city = req.headers.get('cf-ipcity') || '';

//     await supabase.from('analytics').insert([
//       {
//         link_id: link.id,
//         browser: userAgent,
//         country,
//         city,
//       },
//     ]);

//     return new Response(null, {
//       status: 302,
//       headers: {
//         ...corsHeaders,
//         Location: link.original_url,
//       },
//     });
//   } catch (error) {
//     console.error('Error:', error);
//     return new Response('Internal Server Error', { status: 500 });
//   }
// });






import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.39.7';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY');

  if (!supabaseUrl || !supabaseKey) {
    return new Response('Missing Supabase config', { status: 500, headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const url = new URL(req.url);
    const shortCode = url.pathname.slice(1);
    console.log('Shortcode:', shortCode);

    const { data: link, error: linkError } = await supabase
      .from('links')
      .select('id, original_url, expires_at')
      .eq('short_code', shortCode)
      .single();

    if (linkError || !link) {
      console.error('Link error:', linkError);
      return new Response('Link not found', { status: 404, headers: corsHeaders });
    }

    if (link.expires_at && new Date(link.expires_at) < new Date()) {
      return new Response('Link has expired', { status: 410, headers: corsHeaders });
    }

    await supabase.rpc('increment_click_count', { link_id: link.id });

    const userAgent = req.headers.get('user-agent') || '';
    const country = req.headers.get('cf-ipcountry') || '';
    const city = req.headers.get('cf-ipcity') || '';

    await supabase.from('analytics').insert([
      {
        link_id: link.id,
        browser: userAgent,
        country,
        city,
      },
    ]);

    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        Location: link.original_url,
      },
    });
  } catch (error) {
    console.error('Unhandled error:', error);
    return new Response('Internal Server Error', { status: 500, headers: corsHeaders });
  }
});
