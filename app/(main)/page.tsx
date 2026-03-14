import Image from "next/image";
import {generateSeo} from "@/components/seo/seo";
import {Button} from "@/components/ui/button"
import {Typography} from "@/components/ui/typography"

export const metadata = generateSeo(
  {title: "page home",
  description: "votre page acceuil",
  keywords: ["home","acceuil"]
  }
)

export default function Home() {
  return (
   <div className="font-noteSansJp flex  flex-col justify-center items-center gap-2">
   <Typography variant= "h1"> universal digital tech winall * </Typography>
   <Typography variant= "h2"> universal digital tech winall ** </Typography>
   <Typography variant= "h3"> universal digital tech winall </Typography>
   <Typography variant= "h4"> universal digital tech winall </Typography>
   <Typography variant= "h5"> universal digital tech winall </Typography>
   <Typography variant= "div"> universal digital tech winall </Typography>
   <Typography variant= "span"> universal digital tech winall </Typography>
   <Typography variant= "lead"> universal digital tech winall **</Typography>
   <Typography variant= "code"> universal digital tech winall </Typography>
   <Typography variant= "muted"> universal digital tech winall ***</Typography>
   <Typography variant= "small"> universal digital tech winall </Typography>
   <Typography > universal digital tech winall **</Typography>
   <Button>
    <Typography variant="h5" > universal </Typography>
   </Button>
   <Button>
    <Typography variant="h5" className=" rounded-[10px]  text-white"> universal </Typography>
   </Button>
   <Button variant="default">
    <Typography variant="h5" className=" rounded-[10px]  text-white"> universal </Typography>
   </Button>

   </div>
  );
}
