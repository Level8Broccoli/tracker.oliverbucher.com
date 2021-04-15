import { methods } from "./http/utils";
import { verifySecret } from "./db/auth";
import { deleteEntry } from "./db/entries";
import { INTERNAL_CODES } from "./utils/config";
import {
  badRequest,
  methodNotAllowed,
  noContent,
  ok,
  serverError,
} from "./utils/responses";
import { nameIsValid, secretIsValid } from "./utils/validation";

export async function handler({ path, body, httpMethod }) {
  if (httpMethod === methods.OPTIONS) {
    return noContent({
      "Access-Control-Allow-Methods": "DELETE",
    });
  }
  if (httpMethod !== methods.DELETE) {
    return methodNotAllowed();
  }

  const [name] = path.split("/").slice(-1);
  const { secret, id } = JSON.parse(body);

  if (
    typeof name !== "string" ||
    typeof secret !== "string" ||
    typeof id !== "string"
  ) {
    return badRequest();
  }

  if (!nameIsValid(name)) {
    return ok({
      data: { msg: `Gewählter Name '${name}' ist nicht valide.` },
      code: INTERNAL_CODES.PROPERTY.NAME,
    });
  }

  if (!secretIsValid(secret)) {
    return ok({
      data: { msg: `Geheimwörter '${secret}' sind nicht valide.` },
      code: INTERNAL_CODES.PROPERTY.SECRET,
    });
  }

  try {
    if (await !verifySecret(name, secret)) {
      return ok({
        data: { msg: `Authentifizierung fehlgeschlagen.` },
        code: INTERNAL_CODES.AUTHENTIFICATION,
      });
    }

    const entry = await deleteEntry(name, id);

    return ok({
      data: { entry },
      code: INTERNAL_CODES.SUCCESS,
    });
  } catch (e) {
    return serverError(e);
  }
}
