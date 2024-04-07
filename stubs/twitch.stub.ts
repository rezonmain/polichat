import {
  TwitchIRCCommand,
  TwitchIRCMessage,
  TwitchIRCMessageTags,
  TwitchIRCParams,
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
  ["NOTSUPPORTEDLOL", { ident: "NOTSUPPORTEDLOL", unsupported: true }],
  [MESSAGE_RAW_PARTS[0].cmd, { ident: "", unsupported: true }],
  [MESSAGE_RAW_PARTS[1].cmd, { ident: "PING" }],
  [MESSAGE_RAW_PARTS[2].cmd, { ident: "PRIVMSG", channel: "#petsgomoo" }],
  [MESSAGE_RAW_PARTS[3].cmd, { ident: "PRIVMSG", channel: "#lovingt3s" }],
  [MESSAGE_RAW_PARTS[4].cmd, { ident: "PART", channel: "#bar" }],
  [MESSAGE_RAW_PARTS[5].cmd, { ident: "JOIN", channel: "#bar" }],
  [MESSAGE_RAW_PARTS[6].cmd, { ident: "353" }], // for numeric commands, the other command props are ignored
  [MESSAGE_RAW_PARTS[7].cmd, { ident: "366" }],
];

const PARSE_PARAMS_FROM_RAW_PART_CASES: [string, TwitchIRCParams][] = [
  ["", { params: "" }],
  ["tmi.twitch.tv", { params: "tmi.twitch.tv" }],
  ["DansGame", { params: "DansGame" }],
  ["!dilly", { params: "!dilly", botCommand: "dilly" }],
  ["", { params: "" }],
  ["", { params: "" }],
  ["foo", { params: "foo" }],
  ["End of /NAMES list", { params: "End of /NAMES list" }],
];

const PARSE_TAGS_FROM_RAW_PART_CASES: [string, TwitchIRCMessageTags | null][] =
  [
    [
      "badges=moderator/1,subscriber/0;color=#0000FF;display-name=Petso;emotes=;flags=;id=1a2b3c4d-1a2b-1a2b-1a2b-1a2b3c4d5e6f;mod=1;room-id=123456;subscriber=0;tmi-sent-ts=1234567890;turbo=0;user-id=123456;user-type=mod",
      {
        badges: {
          moderator: "1",
          subscriber: "0",
        },
        color: "#0000FF",
        "display-name": "Petso",
        id: "1a2b3c4d-1a2b-1a2b-1a2b-1a2b3c4d5e6f",
        mod: "1",
        "room-id": "123456",
        subscriber: "0",
        "tmi-sent-ts": "1234567890",
        turbo: "0",
        "user-id": "123456",
        "user-type": "mod",
      },
    ],
    [MESSAGE_RAW_PARTS[0].tgs, null],
    [
      MESSAGE_RAW_PARTS[2].tgs,
      {
        badges: {
          staff: "1",
          broadcaster: "1",
          turbo: "1",
        },
        color: "#FF0000",
        "display-name": "PetsgomOO",
        "emote-only": "1",
        emotes: {
          "33": [
            {
              start: "0",
              end: "7",
            },
          ],
        },
        id: "c285c9ed-8b1b-4702-ae1c-c64d76cc74ef",
        mod: "0",
        "room-id": "81046256",
        subscriber: "0",
        turbo: "0",
        "tmi-sent-ts": "1550868292494",
        "user-id": "81046256",
        "user-type": "staff",
      },
    ],
    [
      "emotes=25:0-4,12-16/1902:6-10",
      {
        emotes: {
          "25": [
            { start: "0", end: "4" },
            { start: "12", end: "16" },
          ],
          "1902": [{ start: "6", end: "10" }],
        },
      },
    ],
    ["emote-sets=0,33,50,237", { "emote-sets": ["0", "33", "50", "237"] }],
  ];

const PARSE_COMPLETE_MESSAGE_CASES: [string, TwitchIRCMessage][] = [
  [
    TEST_MESSAGES[0],
    {
      raw: TEST_MESSAGES[0],
      tags: null,
      source: null,
      command: { ident: "", unsupported: true },
      parameters: { params: "" },
    },
  ],
  [
    TEST_MESSAGES[1],
    {
      raw: TEST_MESSAGES[1],
      tags: null,
      source: null,
      command: { ident: "PING" },
      parameters: { params: "tmi.twitch.tv" },
    },
  ],
  [
    TEST_MESSAGES[2],
    {
      raw: TEST_MESSAGES[2],
      tags: {
        badges: {
          staff: "1",
          broadcaster: "1",
          turbo: "1",
        },
        color: "#FF0000",
        "display-name": "PetsgomOO",
        "emote-only": "1",
        emotes: {
          "33": [
            {
              start: "0",
              end: "7",
            },
          ],
        },
        id: "c285c9ed-8b1b-4702-ae1c-c64d76cc74ef",
        mod: "0",
        "room-id": "81046256",
        subscriber: "0",
        turbo: "0",
        "tmi-sent-ts": "1550868292494",
        "user-id": "81046256",
        "user-type": "staff",
      },
      source: {
        nick: "petsgomoo",
        host: "petsgomoo@petsgomoo.tmi.twitch.tv",
      },
      command: { ident: "PRIVMSG", channel: "#petsgomoo" },
      parameters: { params: "DansGame" },
    },
  ],
  [
    TEST_MESSAGES[3],
    {
      raw: TEST_MESSAGES[3],
      tags: null,
      source: {
        nick: "lovingt3s",
        host: "lovingt3s@lovingt3s.tmi.twitch.tv",
      },
      command: { ident: "PRIVMSG", channel: "#lovingt3s" },
      parameters: { params: "!dilly", botCommand: "dilly" },
    },
  ],
  [
    TEST_MESSAGES[4],
    {
      raw: TEST_MESSAGES[4],
      tags: null,
      source: {
        nick: "foo",
        host: "foo@foo.tmi.twitch.tv",
      },
      command: { ident: "PART", channel: "#bar" },
      parameters: { params: "" },
    },
  ],
  [
    TEST_MESSAGES[5],
    {
      raw: TEST_MESSAGES[5],
      tags: null,
      source: {
        nick: "foo",
        host: "foo@foo.tmi.twitch.tv",
      },
      command: { ident: "JOIN", channel: "#bar" },
      parameters: { params: "" },
    },
  ],
  [
    TEST_MESSAGES[6],
    {
      raw: TEST_MESSAGES[6],
      tags: null,
      source: {
        nick: null,
        host: "foo.tmi.twitch.tv",
      },
      command: { ident: "353" },
      parameters: { params: "foo" },
    },
  ],
  [
    TEST_MESSAGES[7],
    {
      raw: TEST_MESSAGES[7],
      tags: null,
      source: {
        nick: null,
        host: "foo.tmi.twitch.tv",
      },
      command: { ident: "366" },
      parameters: { params: "End of /NAMES list" },
    },
  ],
];

export {
  PARSE_RAW_PARTS_CASES,
  PARSE_SOURCE_FROM_RAW_PART_CASES,
  PARSE_COMMAND_FROM_RAW_PART_CASES,
  PARSE_PARAMS_FROM_RAW_PART_CASES,
  PARSE_TAGS_FROM_RAW_PART_CASES,
  PARSE_COMPLETE_MESSAGE_CASES,
};
