import Image from "next/image";
import { db } from "~/server/db";
import { UploadButton, UploadDropzone } from "~/styles/utils/uploadthing";
import TopBar from "./_component/topBar";
import { getImage } from "~/server/db/queries";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export default async function HomePage() {
  const user = auth();
  if (!user.userId) {
    redirect("/sign-in");
  }
  const mockImage = await getImage();
  if (mockImage && mockImage?.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div>
          <TopBar />
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-2xl font-bold">No Image Found</h1>
          <UploadDropzone endpoint="imageUploader" />
        </div>
      </main>
    );
  }
  const mock = mockImage?.map((image, index) => ({
    id: index + 1,
    image,
  }));
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div>
        <TopBar />
      </div>
      <div className="flex flex-col gap-x-4 gap-y-8 space-y-3 sm:flex-row">
        {[...mock, ...mock, ...mock].map((item) => (
          <>
            <div
              key={item.id}
              className="relative h-72 w-72 bg-gray-200 bg-opacity-50 sm:h-96 sm:w-96"
            >
              <Image
                src={item.image.imageUrl!}
                fill
                style={{ objectFit: "cover" }}
                alt={`Image ${item.id}`}
              />
            </div>{" "}
          </>
        ))}
      </div>
    </main>
  );
}
