// export type LoginResponse = {
//   access_token: string;
//   token_type: string;
//   expires_in: number;
// };

// export async function login(username: string, password: string) {
//   const res = await fetch("/api/auth/admin/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ username, password }),
//   });

//   if (!res.ok) {
//     const text = await res.text();
//     throw new Error(text || "Login failed");
//   }

//   return (await res.json()) as LoginResponse;
// }
