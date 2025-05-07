import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Article } from "../Article/index.model";

@Table({ timestamps: true, paranoid: true })
export class ItemImg extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number;

  @Column
  src!: string;

  @Column
  href!: string;

  @Column
  @ForeignKey(() => Article)
  articleId!: number;

  // @Column
  @BelongsTo(() => Article)
  article!: Article;
}
