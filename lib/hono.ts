import { hc } from "hono/client";

import { AppType } from "@/app/api/[[...route]]/route";

export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!);






// import { createClient } from "hono/client";
// import { AppType } from "@/app/api/[[...route]]/route";

// // Base URL explicitly set karo
// const client = createClient<AppType>({
//   baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
//   fetch: async (url, options) => {
//     console.log("Hono Client Fetch:", { url, options });
//     try {
//       // Clerk token add karo
//       const { auth } = await import("@clerk/nextjs");
//       const token = await auth().getToken();
//       console.log("Clerk Token:", token ? "Token Found" : "No Token");

//       const headers = {
//         ...options?.headers,
//         Authorization: token ? `Bearer ${token}` : "",
//       };

//       return fetch(url, { ...options, headers });
//     } catch (error) {
//       console.error("Hono Client Fetch Error:", error);
//       throw error;
//     }
//   },
// });

// export { client };