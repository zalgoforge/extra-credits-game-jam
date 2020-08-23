import { Stat } from './util/Stat';

export class Status {
  soak = Stat.CreateEmptyWithMax(1000);
  stun = Stat.CreateEmptyWithMax(1);
  poison = Stat.CreateEmptyWithMax(1000);
}
