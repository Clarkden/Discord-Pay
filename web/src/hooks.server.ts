import { serializeNonPOJO } from "$lib/utils";
import { pb } from "$lib/db/connection";

export const handle = async ({ event, resolve }) => {
  event.locals.pb = pb

  event.locals.pb.authStore.loadFromCookie(
    event.request.headers.get("cookie") || ""
  );

  try {
    if (event.locals.pb.authStore.isValid) {
      await event.locals.pb.collection("users").authRefresh();
      event.locals.user = serializeNonPOJO(event.locals.pb.authStore.model);
    }
  } catch (_) {
    console.log('catch', _)
    event.locals.pb.authStore.clear();
    event.locals.user = undefined;
  }

  const response = await resolve(event);

  response.headers.set(
    "set-cookie",
    event.locals.pb.authStore.exportToCookie({ secure: false })
  );

  return response;
};
