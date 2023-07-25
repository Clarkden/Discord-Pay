// import { error } from "@sveltejs/kit";

// export async function POST({ request, locals }) {
//   const { email } = await request.json();

//   try {
//     await locals.pb.collection("users").requestPasswordReset(email);
//     return new Response();
//   } catch (err: any) {
//     throw error(err.data.code, { message: err.data.message });
//   }
// }
