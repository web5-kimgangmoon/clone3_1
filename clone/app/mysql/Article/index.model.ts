import { ArticleItemTy } from "@/app/request/useGetBodyItem";
import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { ItemImg } from "../itemImg/index.model";

@Table({ timestamps: true, paranoid: true })
export class Article extends Model<ArticleItemTy> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number;

  @Column
  img!: string;

  @Column
  icon!: string;

  @Column
  title!: string;

  @Column
  sub!: string;

  @Column
  like!: number;

  @Column
  looks!: number;

  @Column
  href!: string;

  @Column
  href_main!: string;

  @Column
  href_sub!: string;

  @Column
  subscribtion!: string;

  @HasMany(() => ItemImg)
  img_list!: ItemImg[];
}
