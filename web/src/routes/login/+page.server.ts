import { redirect } from "@sveltejs/kit";

export const load = ({ locals }: any) => {
  if (locals.pb.authStore.isValid) {
    throw redirect(303, "/dashboard");
  }

  return {
    user: undefined,
  };
};
