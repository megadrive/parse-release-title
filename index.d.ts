declare namespace ParseReleaseTitle {
  interface ParserOptions {
    skipIfAlreadyFound?: boolean;
    type?: string;
    value?: string;
  }

  interface DefaultParserResult {
    title: string;
    year?: number;
    resolution?: string;
    extended?: boolean;
    unrated?: boolean;
    proper?: boolean;
    repack?: boolean;
    convert?: boolean;
    hardcoded?: boolean;
    retail?: boolean;
    remastered?: boolean;
    region?: string;
    container?: string;
    source?: string;
    codec?: string;
    audio?: string;
    group?: string;
    season?: number;
    episode?: number;
    language?: string;
  }

  interface Handler<ParserResult = DefaultParserResult> {
    (input: { title: string; result: ParserResult }): void;
    (input: { title: string }): void;
    (input: { result: ParserResult }): void;
  }

  interface ParseFunction<ParserResult = DefaultParserResult> {
    (title: string): ParserResult;
  }

  interface AddHandlerFunction<ParserResult = DefaultParserResult> {
    (handlerName: string, handler: RegExp, options?: ParserOptions): void;
    (handlerName: string, handler: Handler<ParserResult>): void;
    (handler: Handler<ParserResult>): void;
  }

  interface AddDefaultsFunction {
    (parser: Parser): void;
  }

  class Parser<ParserResult = DefaultParserResult> {
    constructor();

    addHandler: AddHandlerFunction<ParserResult>;
    parse: ParseFunction<ParserResult>;
  }
}

declare module "parse-release-title" {
  export interface DefaultParserResult
    extends ParseReleaseTitle.DefaultParserResult {}
  export class Parser<
    ParserResult = DefaultParserResult
  > extends ParseReleaseTitle.Parser<ParserResult> {}
  export const parse: ParseReleaseTitle.ParseFunction;
  export const addHandler: ParseReleaseTitle.AddHandlerFunction;
  export const addDefaults: ParseReleaseTitle.AddDefaultsFunction;
}
