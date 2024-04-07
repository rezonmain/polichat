import {
  TwitchIRCCommand,
  TwitchIRCRawParts,
  TwitchIRCSource,
} from "@/types/twitch.types";

const TEST_MESSAGES = [
  "",
  "PING :tmi.twitch.tv",
  "@badges=staff/1,broadcaster/1,turbo/1;color=#FF0000;display-name=PetsgomOO;emote-only=1;emotes=33:0-7;flags=0-7:A.6/P.6,25-36:A.1/I.2;id=c285c9ed-8b1b-4702-ae1c-c64d76cc74ef;mod=0;room-id=81046256;subscriber=0;turbo=0;tmi-sent-ts=1550868292494;user-id=81046256;user-type=staff :petsgomoo!petsgomoo@petsgomoo.tmi.twitch.tv PRIVMSG #petsgomoo :DansGame",
  ":lovingt3s!lovingt3s@lovingt3s.tmi.twitch.tv PRIVMSG #lovingt3s :!dilly",
  ":foo!foo@foo.tmi.twitch.tv PART #bar",
  ":foo!foo@foo.tmi.twitch.tv JOIN #bar",
  ":foo.tmi.twitch.tv 353 foo = #bar :foo",
  ":foo.tmi.twitch.tv 366 foo #bar :End of /NAMES list",
];

const PARSE_RAW_PARTS_CASES: [string, TwitchIRCRawParts][] = [
  [TEST_MESSAGES[0], { tgs: "", src: "", cmd: "", pms: "" }],
  [TEST_MESSAGES[1], { tgs: "", src: "", cmd: "PING", pms: "tmi.twitch.tv" }],
  [
    TEST_MESSAGES[2],
    {
      tgs: "badges=staff/1,broadcaster/1,turbo/1;color=#FF0000;display-name=PetsgomOO;emote-only=1;emotes=33:0-7;flags=0-7:A.6/P.6,25-36:A.1/I.2;id=c285c9ed-8b1b-4702-ae1c-c64d76cc74ef;mod=0;room-id=81046256;subscriber=0;turbo=0;tmi-sent-ts=1550868292494;user-id=81046256;user-type=staff",
      src: "petsgomoo!petsgomoo@petsgomoo.tmi.twitch.tv",
      cmd: "PRIVMSG #petsgomoo",
      pms: "DansGame",
    },
  ],
  [
    TEST_MESSAGES[3],
    {
      tgs: "",
      src: "lovingt3s!lovingt3s@lovingt3s.tmi.twitch.tv",
      cmd: "PRIVMSG #lovingt3s",
      pms: "!dilly",
    },
  ],
  [
    TEST_MESSAGES[4],
    {
      tgs: "",
      src: "foo!foo@foo.tmi.twitch.tv",
      cmd: "PART #bar",
      pms: "",
    },
  ],
  [
    TEST_MESSAGES[5],
    {
      tgs: "",
      src: "foo!foo@foo.tmi.twitch.tv",
      cmd: "JOIN #bar",
      pms: "",
    },
  ],
  [
    TEST_MESSAGES[6],
    {
      tgs: "",
      src: "foo.tmi.twitch.tv",
      cmd: "353 foo = #bar",
      pms: "foo",
    },
  ],
  [
    TEST_MESSAGES[7],
    {
      tgs: "",
      src: "foo.tmi.twitch.tv",
      cmd: "366 foo #bar",
      pms: "End of /NAMES list",
    },
  ],
];

const MESSAGE_RAW_PARTS = PARSE_RAW_PARTS_CASES.map(([, p]) => p);

const PARSE_SOURCE_FROM_RAW_PART_CASES: [string, TwitchIRCSource | null][] = [
  [MESSAGE_RAW_PARTS[0].src, null],
  [MESSAGE_RAW_PARTS[1].src, null],
  [
    MESSAGE_RAW_PARTS[2].src,
    { nick: "petsgomoo", host: "petsgomoo@petsgomoo.tmi.twitch.tv" },
  ],
  [
    MESSAGE_RAW_PARTS[3].src,
    { nick: "lovingt3s", host: "lovingt3s@lovingt3s.tmi.twitch.tv" },
  ],
  [MESSAGE_RAW_PARTS[4].src, { nick: "foo", host: "foo@foo.tmi.twitch.tv" }],
  [MESSAGE_RAW_PARTS[5].src, { nick: "foo", host: "foo@foo.tmi.twitch.tv" }],
  [MESSAGE_RAW_PARTS[6].src, { nick: null, host: "foo.tmi.twitch.tv" }],
  [MESSAGE_RAW_PARTS[7].src, { nick: null, host: "foo.tmi.twitch.tv" }],
];

const PARSE_COMMAND_FROM_RAW_PART_CASES: [string, TwitchIRCCommand][] = [
  [MESSAGE_RAW_PARTS[0].cmd, { ident: "", unsupported: true }],
  [MESSAGE_RAW_PARTS[1].cmd, { ident: "PING" }],
  [MESSAGE_RAW_PARTS[2].cmd, { ident: "PRIVMSG", channel: "#petsgomoo" }],
  [MESSAGE_RAW_PARTS[3].cmd, { ident: "PRIVMSG", channel: "#lovingt3s" }],
  [MESSAGE_RAW_PARTS[4].cmd, { ident: "PART", channel: "#bar" }],
  [MESSAGE_RAW_PARTS[5].cmd, { ident: "JOIN", channel: "#bar" }],
  [MESSAGE_RAW_PARTS[6].cmd, { ident: "353" }], // for numeric commands, the other command props are ignored
  [MESSAGE_RAW_PARTS[7].cmd, { ident: "366" }],
];

export {
  PARSE_RAW_PARTS_CASES,
  PARSE_SOURCE_FROM_RAW_PART_CASES,
  PARSE_COMMAND_FROM_RAW_PART_CASES,
};
