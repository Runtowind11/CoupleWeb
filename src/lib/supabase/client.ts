import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return document.cookie.split("; ").filter(Boolean).map((c) => {
            const idx = c.indexOf("=");
            return { name: c.substring(0, idx), value: c.substring(idx + 1) };
          });
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            const { maxAge, ...rest } = options ?? {};
            const isRemove = !value || maxAge === 0;
            let cookie = `${name}=${value}`;
            if (rest.path) cookie += `; path=${rest.path}`;
            if (rest.domain) cookie += `; domain=${rest.domain}`;
            if (rest.sameSite) cookie += `; samesite=${String(rest.sameSite).toLowerCase()}`;
            if (rest.secure) cookie += "; secure";
            if (isRemove) cookie += `; max-age=0`;
            document.cookie = cookie;
          });
        },
      },
    },
  );
}
