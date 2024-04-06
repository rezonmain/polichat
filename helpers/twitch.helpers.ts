// Mostly adapted from: https://dev.twitch.tv/docs/irc/example-parser/

import { empty } from "@rezonmain/utils-empty";
import {
  TwitchIRCMessage,
  TwitchIRCCommand,
  TwitchIRCMessageTags,
  TwitchIRCSource,
  TwitchIRCRawParts,
} from "@/types/twitch.types";

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

const parseTagsFromRawPart = (rawPart: string): TwitchIRCMessageTags => {
  return {};
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
  return { command: "", channel: "", botCommand: "" };
};

const parseParamsFromRawPart = (rawPart: string): string[] => {
  return [];
};

const parseCompleteMessage = (raw: string): TwitchIRCMessage => {
  const parts = parseRawParts(raw);
  return {
    raw,
    tags: parseTagsFromRawPart(parts.tgs),
    source: parseSourceFromRawPart(parts.src),
    command: parseCommandFromRawPart(parts.cmd),
    params: parseParamsFromRawPart(parts.pms),
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
