import { describe, it, expect } from "bun:test";
import {
  parseCommandFromRawPart,
  parseCompleteMessage,
  parseRawParts,
  parseSourceFromRawPart,
  parseTagsFromRawPart,
} from "@/helpers/twitch.helpers";
import {
  PARSE_COMMAND_FROM_RAW_PART_CASES,
  PARSE_COMPLETE_MESSAGE_CASES,
  PARSE_RAW_PARTS_CASES,
  PARSE_SOURCE_FROM_RAW_PART_CASES,
  PARSE_TAGS_FROM_RAW_PART_CASES,
} from "@/stubs/twitch.stub";

describe("Twitch Helpers", () => {
  describe("parseRawParts()", () => {
    it.each(PARSE_RAW_PARTS_CASES)(
      `should parse raw parts from "%s"`,
      (raw, expected) => {
        expect(parseRawParts(raw)).toEqual(expected);
      }
    );
  });

  describe("parseSourceFromRawPart()", () => {
    it.each(PARSE_SOURCE_FROM_RAW_PART_CASES)(
      `should parse source from "%s"`,
      (raw, expected) => {
        expect(parseSourceFromRawPart(raw)).toEqual(expected);
      }
    );
  });

  describe("parseCommandFromRawPart()", () => {
    it.each(PARSE_COMMAND_FROM_RAW_PART_CASES)(
      `should parse command from "%s"`,
      (raw, expected) => {
        expect(parseCommandFromRawPart(raw)).toEqual(expected);
      }
    );
  });

  // describe("parseParamsFromRawPart()", () => {});

  describe("parseTagsFromRawPart()", () => {
    it.each(PARSE_TAGS_FROM_RAW_PART_CASES)(
      "should parse tags from %s",
      (raw, expected) => {
        expect(parseTagsFromRawPart(raw)).toEqual(expected);
      }
    );
  });

  describe("parseCompleteMessage()", () => {
    it.each(PARSE_COMPLETE_MESSAGE_CASES)(
      "should parse complete message from %s",
      (raw, expected) => {
        expect(parseCompleteMessage(raw)).toEqual(expected);
      }
    );
  });
});
