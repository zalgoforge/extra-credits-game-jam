export interface Card {
  id: string;
  nameId: string;
  title: string;
  description: string;
  cost: number;
  manaGain: number;
}

export interface Passive {
  id: string;
  description: string;
}

export interface Enemy {
  id: string;
  hp: number;
  name: string;
  isSoaked: boolean;
  isPoisoned: boolean;
}

export interface DyingEnemy {
  id: string;
  name: string;
  laneIndex: number;
  fieldIndex: number;
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
  passives: Passive[];
  lanes: Lane[];
  dyingEnemies: DyingEnemy[];
  mana: number;
  health: number;
  turnCount: number;
  highlightedTargets: undefined | string[];
  hoveredTarget: undefined | string;
}
