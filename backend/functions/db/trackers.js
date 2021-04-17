import {
  Casefold,
  Collection,

  Create,
  CreateCollection,
  CreateIndex,
  Delete,
  Get,
  Index,
  Match,
  Paginate
} from "faunadb";
import {
  ALL_TRACKERS_INDEX,
  ALL_TRACKER_NAMES_INDEX,
  CONFIGS_COLLECTION,
  SORT_INDEX_SUFFIX
} from "../utils/config";
import { getRandomSecret } from "../utils/secret";
import { db } from "./db";

const createConfigEntry = async (name, timestamp) => {
  const secret = getRandomSecret();

  await db.query(
    Create(Collection(CONFIGS_COLLECTION), {
      data: {
        name: Casefold(name),
        secret: Casefold(secret),
        timestamp,
      },
    })
  );
  return secret;
};

const createCollection = async (name) => {
  return await db.query(CreateCollection({ name: Casefold(name) }));
};

const createSortingIndex = async (name) => {
  return await db.query(
    CreateIndex({
      name: Casefold(name + SORT_INDEX_SUFFIX),
      unique: false,
      serialized: true,
      source: Collection(Casefold(name)),
      values: [
        {
          field: ["data", "timestamp"],
          reverse: true,
        },
        {
          field: ["ref"],
        },
      ],
    })
  );
};

export const createTracker = async (name, timestamp) => {
  const secret = await createConfigEntry(name, timestamp);
  await createCollection(name);
  await createSortingIndex(name);

  return secret;
};

export const deleteTracker = async (name) => {
  const { ref } = await db.query(
    Get(Match(Index(ALL_TRACKERS_INDEX), Casefold(name)))
  );
  const { data } = await db.query(Delete(ref));
  await db.query(Delete(Collection(name)));
  return data;
};

export const nameAlreadyExists = async (name) => {
  const { data } = await db.query(
    Paginate(Match(Index(ALL_TRACKER_NAMES_INDEX), Casefold(name)))
  );
  return data.length > 0;
};
