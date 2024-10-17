import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";
import { ratelimit } from "~/server/ratelimit";
const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = auth();
      console.log(user);
      // If you throw, the user will not be able to upload
      if (!user.userId) throw new UploadThingError("Unauthorized");
      // Use a constant string to limit all requests with a single ratelimit
      // Or use a userID, apiKey or ip address for individual limits.
      const identifier = user.userId;
      const { success } = await ratelimit.limit(identifier);

      if (!success) {
        throw new Error("Rate limit exceeded");
      }

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      await db.insert(posts).values({
        name: file.name,
        userId: metadata.userId,
        imageUrl: file.url,
      });
      console.log("file url", file.url); // URL to the uploaded file

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
