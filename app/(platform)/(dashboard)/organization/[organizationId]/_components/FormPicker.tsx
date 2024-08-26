"use client";

import { useEffect, useState } from "react";
import { unsplash } from "@/lib/unsplash";
import { Check, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { defaultImages } from "@/constant/images";
import Link from "next/link";

interface FormPickerProps {
  id: string;
  errors?: string
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus();
  const [images, setImages] =
    useState<Array<Record<string, any>>>(defaultImages);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       const result = await unsplash.photos.getRandom({
  //         collectionIds: ["317099"],
  //         count: 9,
  //       });

  //       if (result && result.response) {
  //         const imagesResult = result.response as Array<Record<string, any>>;
  //         setImages(imagesResult);
  //       } else {
  //         console.error("failed to get images from unsplash");
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       setImages(defaultImages);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchImages();
  // }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
              pending && "opacity-50 hover:opacity-50 cursor-auto",
            )}
            onClick={() => {
              setSelectedImageId(image.id);
            }}
          >
            {selectedImageId === image.id && (
              <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center z-50">
                <Check className={"h-4 w-4 text-white"} />
              </div>
            )}

            <input
              type={"radio"}
              id={id}
              name={id}
              className={"hidden"}
              checked={selectedImageId === image.id}
              disabled={pending}
              value={`${image.id} | ${image.urls.thumb} | ${image.urls.full} | ${image.links.html} | ${image.user.name}`}
            />

            <Image
              alt="Unsplash image"
              className="object-cover rounded-sm"
              src={image.urls.thumb}
              fill
            />

            <Link
              href={image.links.html}
              target="_blank"
              className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/10"
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>

      {/* {errors && <p className="text-red-500">{errors}</p>} */}
    </div>
  );
};
