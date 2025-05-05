import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import mysql2 from "mysql2";
import { ItemImg } from "./itemImg/index.model";
import { Article } from "./Article/index.model";

export const sequelize = new Sequelize({
  username: process.env.MYSQL_USER,
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DB,
  dialect: process.env.MYSQL_DIALECT as Dialect,
  password: process.env.MYSQL_PASSWORD,
  dialectModule: mysql2,
  storage: "test",
  //   models: [__dirname + "/**/*.model.ts"],
});

sequelize.addModels([ItemImg, Article]);

export const initSQL = async () => {
  await sequelize.sync({ force: true });
  const img1 = await ItemImg.create({
    href: "/",
    src: "/article1_lilstItem1.png",
  });
  const img2 = await ItemImg.create({
    href: "/",
    src: "/article1_lilstItem2.webp",
  });
  const img3 = await ItemImg.create({
    href: "/",
    src: "/article1_lilstItem3.png",
  });
  for (let i = 0; i < 50; i++) {
    await Article.create({
      img: "article1img.webp",
      icon: "article1.png",
      title: "widelab",
      sub: "Team",
      like: 111,
      looks: 203000,
      href: "/",
      href_main: "/",
      href_sub: "/",
      subscribtion: "Malang, Indonesia",
      img_list: [img1, img2, img3],
    });
  }
};
