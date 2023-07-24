export async function POST({ request, locals }) {
  const { token, model } = await request.json();
  try {
    locals.pb.authStore.save(token, model);
    return new Response(JSON.stringify({ success: true }));
  } catch (err) {
    console.log("Error: ", err);
    throw new Error("Something went wrong logging in");
  }
}
