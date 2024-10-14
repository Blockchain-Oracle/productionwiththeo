import Image from "next/image";
export default function HomePage() {
  const mockImage = [
    "https://utfs.io/f/GO8ALacRrgIivKBGwJgASz1OPWey5aUKCwBu6ciR0rtbDILp",
    "https://utfs.io/f/GO8ALacRrgIiGOOMCWCRrgIikqY72oBTK6PLDbcGxMHfhWAE",
    "https://utfs.io/f/GO8ALacRrgIi3eovELGtPIue0QrVjX8nUSBvA7WoNqsCGlbg",
  ];

  const mock = mockImage.map((image, index) => ({
    id: index + 1,
    image,
  }));
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex flex-col gap-x-4 gap-y-8 space-y-3 sm:flex-row">
        {mock.map((item) => (
          <>
            <div
              key={item.id}
              className="relative h-72 w-72 bg-gray-200 bg-opacity-50 sm:h-96 sm:w-96"
            >
              <Image
                src={item.image}
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
