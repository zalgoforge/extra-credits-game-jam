import { SignalizingVariable } from "./util/SignalizingVariable";
import { v4 as uuidv4 } from 'uuid';

export class Entity {
  uuid = uuidv4();

  HP = new SignalizingVariable(10);
  Attack = new SignalizingVariable(1);
}
