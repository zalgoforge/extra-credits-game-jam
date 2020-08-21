import { SignalizingVariable } from "./util/SignalizingVariable";

export class Entity {
  HP = new SignalizingVariable(10);
  Attack = new SignalizingVariable(1);
}
