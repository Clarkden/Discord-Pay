import { serializeNonPOJO } from "$lib/utils.js";
import { redirect } from "@sveltejs/kit";

export const load = ({ locals }) => {
  if (locals.pb.authStore.isValid) {
    return {
      user: serializeNonPOJO(locals.pb.authStore.model),
    };
  }

  throw redirect(303, "/login");
};
