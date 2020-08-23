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
  isSoaked: boolean;
}

export interface GameObject {
  id: string;
  nameId: string;
}

export interface Slot {
  id: string;
  enemies: Enemy[];
  objects: GameObject[];
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
  isGameOver: boolean;
  turnCount: number;
  highlightedTargets: undefined | string[];
  hoveredTarget: undefined | string;
}
