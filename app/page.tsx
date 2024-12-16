import Explore from "@/components/home/explore";
import Hero from "@/components/home/hero";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <div className="container mx-auto">
        <div className="my-10">
          <Explore />
        </div>
      </div>
    </div>
  );
}
