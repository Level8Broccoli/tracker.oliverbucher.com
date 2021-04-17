import { verifySecret } from "./db/auth";
import { addEntry } from "./db/entries";
import { methods } from "./http/utils";
import { INTERNAL_CODES } from "./utils/config";
import {
  badRequest,
  created,
  methodNotAllowed,
  ok,
  serverError,
} from "./utils/responses";
import {
  nameIsValid,
  secretIsValid,
  timestampIsValid,
} from "./utils/validation";

export async function handler({ body, httpMethod }) {
  if (httpMethod !== methods.POST) {
    return methodNotAllowed();
  }

  const { name, secret, timestamp } = JSON.parse(body);
  if (
    typeof name !== "string" ||
    typeof secret !== "string" ||
    typeof timestamp !== "string"
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

  if (!timestampIsValid(timestamp)) {
    return ok({
      data: { msg: `Zeitstempel '${timestamp}' ist nicht valide.` },
      code: INTERNAL_CODES.PROPERTY.TIMESTAMP,
    });
  }

  try {
    if (await !verifySecret(name, secret)) {
      return ok({
        data: { msg: `Authentifizierung fehlgeschlagen.` },
        code: INTERNAL_CODES.AUTHENTIFICATION,
      });
    }

    const entry = await addEntry(name, timestamp);

    return created({
      data: { entry },
      code: INTERNAL_CODES.SUCCESS,
    });
  } catch (e) {
    return serverError(e);
  }
}
