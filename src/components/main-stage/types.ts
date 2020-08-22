export interface Card {
  id: string;
  title: string;
  description: string;
  cost: number;
}

export interface Slot {
  id: string;
}

export interface Lane {
  id: string;
  fields: Slot[];
}

export interface State {
  cards: Card[];
  lanes: Lane[];
  mana: number;
  highlightedTargets: undefined | string[];
}
