import { Table, Column, Model } from "sequelize-typescript";

@Table({ timestamps: true, paranoid: true })
export class Test extends Model {
  @Column
  name!: string;
}
