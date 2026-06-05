"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Typography } from "@/components/ui/typography"; // Assuming a Typography component exists
import { useIsMobile } from "@/hooks/use-mobile"; // Assuming a useIsMobile hook exists

interface Testimonial {
  id: number;
  name: string;
  profession: string;
  image: string;
  review: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alice Dupont",
    profession: "CEO, Tech Solutions",
    image: "/images/testimonials/avatar-1.jpg", // Placeholder image path
    review: "Winall Tech has revolutionized our network infrastructure. Their expertise in cybersecurity and seamless integration of new systems was unparalleled. Highly recommended!",
  },
  {
    id: 2,
    name: "Bob Martin",
    profession: "Project Manager, BuildCo",
    image: "/images/testimonials/avatar-2.jpg", // Placeholder image path
    review: "The video surveillance system installed by Winall Tech is robust and incredibly reliable. We feel much safer and their team was professional throughout the entire process.",
  },
  {
    id: 3,
    name: "Carole Lefevre",
    profession: "CTO, Innovate Corp",
    image: "/images/testimonials/avatar-3.jpg", // Placeholder image path
    review: "Their electrical engineering solutions were top-notch, ensuring our new facility met all compliance standards. A truly dependable partner for any major project.",
  },
  {
    id: 4,
    name: "David Giraud",
    profession: "Operations Director, LogiFreight",
    image: "/images/testimonials/avatar-4.jpg", // Placeholder image path
    review: "We entrusted Winall Tech with a complex network deployment, and they delivered beyond expectations. The system is incredibly efficient, supporting our high-volume operations without a hitch.",
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
        <Image
          src={testimonial.image}
          alt={testimonial.name}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-full"
        />
      </div>
      <Typography variant="h4" className="text-lg font-semibold mb-1">
        {testimonial.name}
      </Typography>
      <Typography variant="p" className="text-sm text-gray-600 mb-4">
        {testimonial.profession}
      </Typography>
      <Typography variant="p" className="text-gray-700 italic text-base flex-grow">
        &quot;{testimonial.review}&quot;
      </Typography>
    </motion.div>
  );
};

export function TestimonialsSection() {
  const isMobile = useIsMobile();

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-12">
          Ce Que Nos Clients Disent
        </h2>

        {isMobile ? (
          // Simple mobile carousel (can be enhanced later)
          <div className="overflow-hidden relative">
            <motion.div
              className="flex"
              drag="x"
              dragConstraints={{ left: - (testimonials.length - 1) * 300, right: 0 }} // Adjust width as needed
              whileDrag={{ cursor: "grabbing" }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex-shrink-0 w-80 mx-4">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </motion.div>
          </div>
        ) : (
          // Desktop grid layout
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
