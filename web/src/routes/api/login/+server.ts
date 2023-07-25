// import { error } from "@sveltejs/kit";

// export async function POST({ request, locals }: any) {
//   const { email, password } = await request.json();

//   try {
//     const { token, user } = await locals.pb
//       .collection("users")
//       .authWithPassword(email, password);
//     return new Response(JSON.stringify({ token, user }));
//   } catch (err: any) {
//     console.log(err)
//     throw error(err.data.code, { message: err.data.message });
//   }
// }
