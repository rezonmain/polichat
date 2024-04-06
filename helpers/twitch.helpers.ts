import {
  TwitchIRCMessage,
  TwitchIRCCommand,
  TwitchIRCMessageTags,
  TwitchIRCSource,
  TwitchIRCRawParts,
} from "@/types/twitch.types";

const parseRawParts = (raw: string): TwitchIRCRawParts => {
  return { tgs: "", src: "", cmd: "", pms: "" };
};

const parseTagsFromRawPart = (rawPart: string): TwitchIRCMessageTags => {
  return {};
};

const parseSourceFromRawPart = (rawPart: string): TwitchIRCSource => {
  return { nick: "", host: "" };
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
