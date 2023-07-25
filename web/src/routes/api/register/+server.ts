// export async function POST({ request, locals }) {
//   const { email, name, password, passwordConfirm } = await request.json();
//   try {
//     const { token, user } = await locals.pb.collection("users").create({
//       email,
//       name,
//       password,
//       passwordConfirm,
//       role: "free",
//     });

//     await locals.pb.collection("users").requestVerification(email);

//     return new Response(JSON.stringify({ token, user }));
//   } catch (err) {
//     throw new Error(JSON.stringify(err));
//   }
// }
