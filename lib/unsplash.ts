import { createApi } from "unsplash-js";

const accessKey = process.env.UNSPLASH_ACCESS_KEY!;

console.log(accessKey);

export const unsplash = createApi({
  accessKey: "LPxecI5tgPRUosyF8HNY3K75HuNSPTtNixg1q82CkX0",
  fetch: fetch,
});
