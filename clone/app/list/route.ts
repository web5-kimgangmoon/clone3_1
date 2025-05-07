import { NextApiRequest, NextApiResponse } from "next";
import { ResponseData } from "../request/useGetBodyItem";
import { sequelize } from "../mysql";
import { ItemImg } from "../mysql/itemImg/index.model";
import { Article } from "../mysql/Article/index.model";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  await sequelize.sync({ force: false });
  const { searchParams } = new URL(req.url);

  const start = Number(searchParams.get("start"));
  const limit = Number(searchParams.get("limit"));

  const cnt = await Article.count();
  return Response.json(
    {
      list: await Article.findAll({
        offset: start ? Number(start) : 0,
        limit: limit ? Number(limit) : 0,
        include: ItemImg,
      }),
      nextPage: cnt > start + limit ? start / limit + 2 : false,
    },
    { status: 200 }
  );
}
