export interface Card {
  id: string;
  title: string;
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
