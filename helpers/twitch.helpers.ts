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

const parseCompleteMessage = (rawMessage: string): TwitchIRCMessage => {
  const p = parseRawParts(rawMessage);
  return {
    raw: rawMessage,
    tags: parseTagsFromRawPart(p.tgs),
    source: parseSourceFromRawPart(p.src),
    command: parseCommandFromRawPart(p.cmd),
    params: parseParamsFromRawPart(p.pms),
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
