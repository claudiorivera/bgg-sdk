import { createAxiosInstance } from "~/lib/axios";
import { createCollection } from "~/routes/collection";
import { createFamily } from "~/routes/family";
import { createForum } from "~/routes/forum";
import { createForumList } from "~/routes/forumList";
import { createGuild } from "~/routes/guild";
import { createHot } from "~/routes/hot";
import * as playsFactories from "~/routes/plays";
import { createSearch } from "~/routes/search";
import { createThing } from "~/routes/thing";
import { createThread } from "~/routes/thread";
import { createUser } from "~/routes/user";

export type BggClient = {
  collection: ReturnType<typeof createCollection>;
  family: ReturnType<typeof createFamily>;
  forum: ReturnType<typeof createForum>;
  forumList: ReturnType<typeof createForumList>;
  guild: ReturnType<typeof createGuild>;
  hot: ReturnType<typeof createHot>;
  search: ReturnType<typeof createSearch>;
  thing: ReturnType<typeof createThing>;
  thread: ReturnType<typeof createThread>;
  user: ReturnType<typeof createUser>;
  plays: {
    id: ReturnType<typeof playsFactories.createId>;
    username: ReturnType<typeof playsFactories.createUsername>;
  };
};

export const createBggClient = (config: BggClientConfig): BggClient => {
  const axios = createAxiosInstance(config);

  return {
    collection: createCollection(axios),
    family: createFamily(axios),
    forum: createForum(axios),
    forumList: createForumList(axios),
    guild: createGuild(axios),
    hot: createHot(axios),
    search: createSearch(axios),
    thing: createThing(axios),
    thread: createThread(axios),
    user: createUser(axios),
    plays: {
      id: playsFactories.createId(axios),
      username: playsFactories.createUsername(axios),
    },
  };
};

export default createBggClient;

export type BggClientConfig = {
  token?: string;
};

export * from "~/routes/types/index";
