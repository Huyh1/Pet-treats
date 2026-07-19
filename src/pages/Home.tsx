import Hero from '@/sections/Hero';
import SeriesNav from '@/sections/SeriesNav';
import BestSellers from '@/sections/BestSellers';
import BestSellersChart from '@/sections/BestSellersChart';
import BrandStory from '@/sections/BrandStory';
import Traceability from '@/sections/Traceability';
import Reviews from '@/sections/Reviews';
import Subscribe from '@/sections/Subscribe';

export default function Home() {
  return (
    <>
      <Hero />
      <SeriesNav />
      <BestSellers />
      <BestSellersChart />
      <BrandStory />
      <Traceability />
      <Reviews />
      <Subscribe />
    </>
  );
}
