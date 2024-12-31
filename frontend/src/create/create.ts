import {Category, Country} from "../../../shared/enums/Categories";

export class CreateModel{
  category: Category | undefined;
  title: string | undefined;
  location: Country | undefined;
  money: number | undefined;

}
