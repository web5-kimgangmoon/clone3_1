import { initSQL } from "../mysql";

export async function GET() {
  await initSQL();
  return Response.json("preparation complete!", { status: 200 });
}
