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
  slots: Slot[];
}

export interface State {
  cards: Card[];
  lanes: Lane[];
}
