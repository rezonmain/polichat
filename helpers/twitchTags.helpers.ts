/**
 * Parses tags of shape `key=foo/1,bar/2,baz/3` into an object
 * @param tags
 */
const parseSimpleNestedTag = (tags: string): Record<string, string> => {
  const parsedTags: Record<string, string> = {};
  tags.split(",").forEach((tag) => {
    const [key, value] = tag.split("/");
    parsedTags[key] = value;
  });

  return parsedTags;
};

/**
 * Parses the emote tag of shape `emotes=id:start1-end1,start2-end2/id:start1-end1`
 * @param emoteTag
 * @returns
 */
const parseEmotesTag = (
  emoteTag: string
): Record<string, { start: string; end: string }[]> => {
  const emotes: Record<string, { start: string; end: string }[]> = {};

  emoteTag.split("/").forEach((emote) => {
    const [id, positionsString] = emote.split(":");
    const positions = positionsString.split(",");

    emotes[id] = positions.map((position) => {
      const [start, end] = position.split("-");
      return { start, end };
    });
  });

  return emotes;
};

/**
 * Parses the emote-sets tag of shape `emote-sets=1,2,3`
 * @param emoteSetsTag
 * @returns
 */
const parseEmoteSetsTag = (emoteSetsTag: string): string[] => {
  return emoteSetsTag.split(",");
};

export { parseSimpleNestedTag, parseEmotesTag, parseEmoteSetsTag };
