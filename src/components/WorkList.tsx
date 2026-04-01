"use client";

import { useState } from "react";
import { works, categories, type Category } from "@/data/works";
import TabFilter from "./TabFilter";
import WorkCard from "./WorkCard";

export default function WorkList() {
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All" ? works : works.filter((w) => w.category === active);

  return (
    <div>
      <div className="mb-8">
        <TabFilter
          categories={categories}
          active={active}
          onChange={setActive}
        />
      </div>
      <div className="flex flex-col gap-4">
        {filtered.map((work) => (
          <WorkCard key={work.slug} work={work} />
        ))}
      </div>
    </div>
  );
}
