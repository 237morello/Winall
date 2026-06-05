"use client";

import Image from "next/image";
import { motion } from "motion/react";

const partnerLogos = [
  "/images/pngwing.com (1).png",
  "/images/pngwing.com (2).png",
  "/images/pngwing.com.png",
  
];

const duplicatedLogos = [...partnerLogos, ...partnerLogos]; // Duplicate for seamless loop

export function PartnersScroll() {
  return (
    <section className="w-full overflow-hidden py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
          Nos Partenaires Technologiques
        </h2>
      </div>
      <div className="relative flex overflow-hidden py-4">
        <motion.div
          className="flex flex-row flex-nowrap"
          animate={{
            x: ["0%", "-100%"],
            transition: {
              x: {
                repeat: Infinity,
                duration: 25, // Adjust duration for scroll speed
                ease: "linear",
              },
            },
          }}
        >
          {duplicatedLogos.map((src, index) => (
            <div key={index} className="flex-shrink-0 w-48 mx-4">
              <Image
                src={src}
                alt={`Partner logo ${index}`}
                width={192} // Equivalent to w-48 (192px)
                height={48} // Example height
                className="h-12 object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
