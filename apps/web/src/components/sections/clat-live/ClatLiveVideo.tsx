"use client";

import { useState } from "react";
import { clatLiveVideoSlot } from "@/content/clat-live";

const candidates = clatLiveVideoSlot.extensions.map(
  (extension) =>
    `/${clatLiveVideoSlot.directory}/${clatLiveVideoSlot.fileName}.${extension}`,
);

export function ClatLiveVideo() {
  const [index, setIndex] = useState(0);
  const src = candidates[index] ?? null;

  if (!src) {
    return <VideoPlaceholder />;
  }

  return (
    <video
      key={src}
      className="aspect-video w-full bg-brand object-cover"
      controls
      playsInline
      preload="metadata"
      aria-label="CLAT live session introduction"
      onError={() => setIndex((current) => current + 1)}
    >
      <source src={src} />
    </video>
  );
}

function VideoPlaceholder() {
  return (
    <div className="flex aspect-video items-center justify-center bg-[linear-gradient(145deg,#1e3a2b_0%,#2f5340_55%,#1e3a2b_100%)] px-8 text-center">
      <p className="max-w-sm font-display text-2xl leading-snug text-background/90 sm:text-3xl">
        30-second intro
        <span className="mt-3 block font-sans text-sm tracking-wide text-background/65">
          Add `public/videos/clat-live/promo.mp4` to publish the clip.
        </span>
      </p>
    </div>
  );
}
