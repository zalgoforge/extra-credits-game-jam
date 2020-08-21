import { v4 as uuidv4 } from 'uuid';

export class Card {
  cost: number = 0;
  uuid = uuidv4();
  title = "Dummy text";
  description = "Lorem ipsum";

  constructor() {}
}
