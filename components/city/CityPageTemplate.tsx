"use client";

import type { CityData } from "@/data/cities";
import CityLandingPage from "@/components/city/CityLandingPage";

type Props = {
  city: CityData;
};

/** Shared city landing layout (same design as Groningen). */
export default function CityPageTemplate({ city }: Props) {
  return <CityLandingPage city={city} />;
}
