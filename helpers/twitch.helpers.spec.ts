import { describe, it, expect } from "bun:test";
import { parseRawParts, parseSourceFromRawPart } from "./twitch.helpers";
import {
  PARSE_RAW_PARTS_CASES,
  PARSE_SOURCE_FROM_RAW_PART_CASES,
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

  describe.only("parseSourceFromRawPart()", () => {
    it.each(PARSE_SOURCE_FROM_RAW_PART_CASES)(
      `should parse source from "%s"`,
      (raw, expected) => {
        expect(parseSourceFromRawPart(raw)).toEqual(expected);
      }
    );
  });
});
