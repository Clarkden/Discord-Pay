import { serializeNonPOJO } from "$lib/utils.js";

export const load = ({ locals }: any) => {

    // if(!locals.pb.authStore.)

  if (locals.pb.authStore.isValid) {
    return {
      user: serializeNonPOJO(locals.pb.authStore.model),
    };
  }

  return {
    user: undefined,
  };
};
