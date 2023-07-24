import { error } from "@sveltejs/kit";

export async function POST({ request, locals }: any) {
  const { email, password } = await request.json();

  try {
    const { token, user } = await locals.pb
      .collection("users")
      .auth(email, password);
    return new Response(JSON.stringify({ token, user }));
  } catch (err: any) {
    throw error(err.data.code, { message: err.data.message });
  }
}
