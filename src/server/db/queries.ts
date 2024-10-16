import { auth } from "@clerk/nextjs/server";
import { db } from ".";

export async function getImage() {
  const user = auth();
  if (!user.userId) {
    throw new Error("User not found");
  }
  const image = await db.query.posts.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });

  return image;
}
