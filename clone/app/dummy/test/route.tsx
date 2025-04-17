import { NextRequest } from "next/server";
import { Test } from "../mysql/test/index.model";
import { sequelize } from "../mysql";
// import { Sequelize } from "sequelize";

export async function GET(request: NextRequest) {
  await sequelize.sync({ force: true });
  const target = await Test.create({ name: "test" });

  return Response.json({ react: target }, { status: 200 });
}
