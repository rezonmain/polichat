// Mostly adapted from: https://dev.twitch.tv/docs/irc/example-parser/

import { empty } from "@rezonmain/utils-empty";
import {
  TwitchIRCMessage,
  TwitchIRCCommand,
  TwitchIRCMessageTags,
  TwitchIRCSource,
  TwitchIRCRawParts,
  TwitchIRCParams,
} from "@/types/twitch.types";
import {
  parseSimpleNestedTag,
  parseEmotesTag,
  parseEmoteSetsTag,
} from "@/helpers/twitchTags.helpers";

const parseRawParts = (raw: string): TwitchIRCRawParts => {
  let index = 0;
  let endIndex = 0;
  const p = { tgs: "", src: "", cmd: "", pms: "" };

  if (raw[index] === "@") {
    endIndex = raw.indexOf(" ");
    p.tgs = raw.slice(1, endIndex);
    index = endIndex + 1;
  }

  if (raw[index] === ":") {
    endIndex = raw.indexOf(" ", index);
    p.src = raw.slice(index + 1, endIndex);
    index = endIndex + 1;
  }

  const hasParams = raw.indexOf(":", index) >= 0;
  if (hasParams) {
    endIndex = raw.indexOf(":", index);
    p.cmd = raw.slice(index, endIndex - 1);
    p.pms = raw.slice(endIndex + 1).trimEnd();
  } else {
    p.cmd = raw.slice(index).trimEnd();
  }

  return p;
};

const parseTagsFromRawPart = (rawPart: string): TwitchIRCMessageTags | null => {
  if (empty(rawPart)) return null;
  const parsedTags: TwitchIRCMessageTags = {};
  const tags = rawPart.split(";");

  for (const tag of tags) {
    const [key, value] = tag.split("=");
    if (empty(key) || empty(value)) continue;

    switch (key) {
      case "badges":
      case "badge-info":
        parsedTags[key] = parseSimpleNestedTag(value);
        continue;
      case "emotes":
        parsedTags[key] = parseEmotesTag(value);
        continue;
      case "emote-sets":
        parsedTags[key] = parseEmoteSetsTag(value);
        continue;
      case "client-nonce":
      case "flags":
        continue;
      default:
        parsedTags[key] = value;
        break;
    }
  }

  return parsedTags;
};

const parseSourceFromRawPart = (rawPart: string): TwitchIRCSource | null => {
  if (empty(rawPart)) return null;

  const splitted = rawPart.split("!");
  return {
    nick: splitted.length === 2 ? splitted[0] : null,
    host: splitted.length === 1 ? splitted[0] : splitted[1],
  };
};

const parseCommandFromRawPart = (rawPart: string): TwitchIRCCommand => {
  const splitted = rawPart.split(" ");

  switch (splitted[0]) {
    case "JOIN":
    case "PART":
    case "NOTICE":
    case "CLEARCHAT":
    case "HOSTTARGET":
    case "PRIVMSG":
    case "USERSTATE":
    case "ROOMSTATE":
    case "001":
      return {
        ident: splitted[0],
        channel: splitted[1],
      };

    case "PING":
    case "GLOBALUSERSTATE":
    case "RECONECT":
    case "002":
    case "003":
    case "004":
    case "353":
    case "366":
    case "372":
    case "375":
    case "376":
      return {
        ident: splitted[0],
      };

    case "CAP":
      return {
        ident: splitted[0],
        isCapRequestEnabled: splitted[2] === "ACK",
      };

    default:
      return {
        ident: splitted[0],
        unsupported: true,
      };
  }
};

const parseParamsFromRawPart = (rawPart: string): TwitchIRCParams => {
  if (empty(rawPart)) {
    return { params: "" };
  }
  if (rawPart[0] === "!") {
    return { botCommand: rawPart.slice(1), params: rawPart };
  }

  return { params: rawPart };
};

const parseCompleteMessage = (raw: string): TwitchIRCMessage => {
  const parts = parseRawParts(raw);
  return {
    raw,
    tags: parseTagsFromRawPart(parts.tgs),
    source: parseSourceFromRawPart(parts.src),
    command: parseCommandFromRawPart(parts.cmd),
    parameters: parseParamsFromRawPart(parts.pms),
  };
};

export {
  parseRawParts,
  parseTagsFromRawPart,
  parseSourceFromRawPart,
  parseCommandFromRawPart,
  parseParamsFromRawPart,
  parseCompleteMessage,
};
