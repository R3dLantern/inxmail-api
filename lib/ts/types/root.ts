export interface Link {
  readonly href: string;
}

export interface Cury extends Link {
  readonly name: string;
  readonly templated: boolean;
}

export interface LinksCollection {
  readonly _self: Link;
  readonly [key: string]: Link | Cury[];
  readonly curies: Cury[];
}

export interface BaseReponse {
  readonly _links: LinksCollection;
}