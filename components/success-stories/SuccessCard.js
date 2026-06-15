import Image from "next/image";
import { CalendarDays, Quote } from "lucide-react";

const badgeColors = {
  PGT: "bg-blue-600",
  TGT: "bg-green-600",
  KVS: "bg-indigo-600",
  NVS: "bg-violet-600",
  DSSSB: "bg-orange-500",
  ART: "bg-pink-600",
};

export default function SuccessCard({
  image,
  name,
  exam,
  category,
  year,
}) {
  return (
    <div className="group overflow-hidden rounded-sm border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Image */}

      <div className="relative aspect-square overflow-hidden">

        {/* Badge */}


        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}

      <div className="p-4">
<span
    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold text-white ${
      badgeColors[category] || "bg-blue-600"
    }`}
  >
    {category}
  </span>
        <div className="flex items-start justify-between">

          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
  {name}
</h3>

            <p className="mt-1 text-sm text-slate-600">
              Selected in {exam}
            </p>
          </div>

         
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">

          <CalendarDays size={15} />

          <span>{year}</span>

        </div>

      </div>
      

    </div>
    
  );
}