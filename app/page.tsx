import { Hero } from "@/components/home/hero";
import { ScrollStackGrid } from "@/components/home/scroll-stack-grid";
import { FloatingGateway } from "@/components/home/floating-gateway";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ScrollStackGrid />
      <FloatingGateway />
    </>
  );
}
