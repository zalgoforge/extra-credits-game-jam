import { v4 as uuidv4 } from 'uuid';

export class UniqueObject {
  uuid = uuidv4();

  //TODO leak
  private static ids: { [uuid: string]: UniqueObject } = {};

  static findId(uuid: string) {
    return UniqueObject.ids[uuid];
  }

  constructor() {
    UniqueObject.ids[this.uuid] = this;
  }

  destroy() {
    delete UniqueObject.ids[this.uuid];
  }
}
