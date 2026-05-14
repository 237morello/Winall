import { Metadata } from "next"

type SeoProps = {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
}
export function generateSeo({
  title,description,keywords = [],image 
}:SeoProps) : Metadata {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : [],
    },
    authors: [{name: "Morel"}]
  }
}
