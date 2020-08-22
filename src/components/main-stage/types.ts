export interface Card {
  id: string;
  title: string;
  description: string;
  cost: number;
  manaGain: number;
}

export interface Enemy {
  id: string;
  hp: number;
  name: string;
}

export interface Slot {
  id: string;
  enemies: Enemy[];
}

export interface Lane {
  id: string;
  fields: Slot[];
}

export interface State {
  cards: Card[];
  lanes: Lane[];
  mana: number;
  health: number;
  highlightedTargets: undefined | string[];
  hoveredTarget: undefined | string;
}
