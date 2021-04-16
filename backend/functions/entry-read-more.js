import { getAllEntries, getMoreEntries } from "./db/entries";
import { methods } from "./http/utils";
import { INTERNAL_CODES } from "./utils/config";
import {
  badRequest,
  methodNotAllowed,
  ok,
  serverError,
} from "./utils/responses";
import { nameIsValid } from "./utils/validation";

export async function handler({ path, httpMethod }) {
  if (httpMethod !== methods.GET) {
    return methodNotAllowed();
  }

  const [name, next] = path.split("/").slice(-2);
  if (typeof name !== "string" || typeof next !== "string") {
    return badRequest();
  }

  if (!nameIsValid(name)) {
    return ok({
      data: { msg: `Gewählter Name '${name}' ist nicht valide.` },
      code: INTERNAL_CODES.PROPERTY.NAME,
    });
  }

  try {
    const data = await getMoreEntries(name, next);

    return ok({
      data,
      code: INTERNAL_CODES.SUCCESS,
    });
  } catch (e) {
    return serverError(e);
  }
}
