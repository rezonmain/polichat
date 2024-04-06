type TwitchIRCMessage = {
  /**
   * The raw message string
   */
  raw: string;

  /**
   * The tags of the message.
   * Tags are key-value pairs that provide additional context to the message
   * see tags reference: https://dev.twitch.tv/docs/irc/tags
   */
  tags: TwitchIRCMessageTags | null;

  /**
   * The source of the message
   */
  source: TwitchIRCSource | null;

  /**
   * The command of the message
   */
  command: TwitchIRCCommand;

  /**
   * The parameters of the command
   */
  params: string[];
};

type TwitchIRCRawParts = {
  tgs: string;
  src: string;
  cmd: string;
  pms: string;
};

type TwitchIRCMessageTags = {
  [key: string]: any;
};

type TwitchIRCSource = {
  nick: string | null;
  host: string;
};

type TwitchIRCCommand = {
  command: string;
  channel?: string;
  [key: string]: any;
};

export type {
  TwitchIRCRawParts,
  TwitchIRCMessage,
  TwitchIRCMessageTags,
  TwitchIRCSource,
  TwitchIRCCommand,
};
