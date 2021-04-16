import { Casefold, Get, Index, Match } from "faunadb";
import { ALL_TRACKERS_INDEX } from "../utils/config";
import { db } from "./db";

export const verifySecret = async (name, secret) => {
  const { data } = await db.query(
    Get(Match(Index(ALL_TRACKERS_INDEX), Casefold(name)))
  );
  return data.secret.toLowerCase() === secret.toLowerCase();
};
