import { v4 as uuidv4 } from 'uuid';

export class UniqueObject {
  uuid = uuidv4();


  //TODO leak
  private static ids: { [uuid: string]: UniqueObject; } = {};

  constructor()
  {
    UniqueObject.ids[this.uuid] = this;
  }
}
