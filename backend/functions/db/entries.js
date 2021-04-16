import {
  Casefold,
  Collection,
  Count,
  Create,
  Delete,
  Documents,
  Get,
  Lambda,
  Map as FaunaMap,
  Paginate,
  Ref,
} from "faunadb";
import { db } from "./db";

export const addEntry = async (name, timestamp, type) => {
  const { data, ref } = await db.query(
    Create(Collection(Casefold(name)), {
      data: { timestamp, type: Casefold(type) },
    })
  );
  return { ...data, ref: ref.id };
};

export const getAllEntries = async (name) => {
  const { data, after } = await db.query(
    FaunaMap(
      Paginate(Documents(Collection(Casefold(name)))),
      Lambda((doc) => Get(doc))
    )
  );

  const count = await db.query(Count(Documents(Collection(Casefold(name)))));

  const dataWithRefId = data.map(({ data, ref }) => ({ ...data, ref: ref.id }));
  const next = after?.[0]?.id || undefined;
  return { data: dataWithRefId, next, count };
};

export const deleteEntry = async (name, id) => {
  const { data, ref } = await db.query(
    Delete(Ref(Collection(Casefold(name)), id))
  );
  return { ...data, ref: ref.id };
};

export const getMoreEntries = async (name, afterId) => {
  const { data, after } = await db.query(
    FaunaMap(
      Paginate(Documents(Collection(Casefold(name))), {
        after: [Ref(Collection(Casefold(name)), afterId)],
      }),
      Lambda((doc) => Get(doc))
    )
  );

  const count = await db.query(Count(Documents(Collection(Casefold(name)))));

  const dataWithRefId = data.map(({ data, ref }) => ({ ...data, ref: ref.id }));
  const next = after?.[0]?.id || undefined;
  return { data: dataWithRefId, next, count };
};
