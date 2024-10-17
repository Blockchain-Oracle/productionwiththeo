"use client";
import { UploadDropzone } from "~/styles/utils/uploadthing";
import TopBar from "../_component/topBar";

function NomockImage() {
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

export default NomockImage;
