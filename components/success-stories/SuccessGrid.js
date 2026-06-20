import SuccessCard from "./SuccessCard";
import Link from "next/link";
const students = [
  {
    id: 1,
    image: "/students/image.jpeg",
    name: "Sangeeta Singh",
    exam: "TGT Art",
    category: "TGT",
    year: 2022,
  },
  {
    id: 2,
    image: "/students/image22.jpeg",
    name: "Shivam Gupta",
    exam: "TGT Art",
    category: "TGT",
    year: 2022,
  },
  {
    id: 3,
    image: "/students/image3.jpeg",
    name: "Anil Kumar",
    exam: "TGT Art",
    category: "TGT",
    year: 2016,
  },
  {
    id: 4,
    image: "/students/image4.jpeg",
    name: "Lalit Kumar",
    exam: "TGT, NVS, KVS, GIC Art",
    category: "TGT",
    year: 2016,
  },
  {
    id: 5,
    image: "/students/image5.jpeg",
    name: "Subhash Kumar",
    exam: "TGT Art",
    category: "TGT",
    year: 2016,
  },

  {
    id: 6,
    image: "/students/image6a.jpeg",
    name: "Arvind Kumar",
    exam: "TGT, PES",
    category: "TGT",
    year: 2009,
  },
  {
    id: 7,
    image: "/students/image7.jpeg",
    name: "Sanjeev Gupta",
    exam: "TGT, PGT, GCI Art",
    category: "TGT",
    year: 2022,
  },
  {
    id: 8,
    image: "/students/image8.jpeg",
    name: "Babli",
    exam: "DSSSB-TGT ART",
    category: "TGT",
    year: 2016,
  },

  {
    id: 9,
    image: "/students/lalit1.jpeg",
    name: "Lalit mohan",
    exam: "PGT ART",
    category: "TGT",
    year: 2013,
  },
  {
    id: 10,
    image: "/students/image10.jpeg",
    name: "Avnita Sharma",
    exam: "DSSSB-PGT, KVS, NVS ART",
    category: "PGT",
    year: 2016,
  },
   {
    id: 11,
    image: "/students/image11.jpeg",
    name: "Sarmistha",
    exam: "TGT Art",
    category: "TGT",
    year: 2013,
  },
  {
    id: 12,
    image: "/students/image12.jpeg",
    name: "Rekha",
    exam: "TGT Art",
    category: "TGT",
    year: 2009,
  },
  {
    id: 13,
    image: "/students/image13.jpeg",
    name: "Kavita",
    exam: "TGT Art",
    category: "TGT",
    year: 2013,
  },
  {
    id: 14,
    image: "/students/image14.jpeg",
    name: "Phoolwati",
    exam: "TGT Art",
    category: "TGT",
    year: 2017,
  },
  {
    id: 15,
    image: "/students/image15.jpeg",
    name: "Sunder Pal",
    exam: "TGT Art",
    category: "TGT",
    year: 2016,
  },
  {
    id: 16,
    image: "/students/image16.jpeg",
    name: "Sunil Kumar",
    exam: "TGT Art",
    category: "TGT",
    year: 2021,
  },
];

export default function SuccessGrid({ limit }) {
  const displayStudents = limit
    ? students.slice(0, limit)
    : students;

  return (
    <section className="mx-auto max-w-7xl px-6 py-4">
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {displayStudents.map((student) => (
          <SuccessCard
            key={student.id}
            {...student}
          />
        ))}
      </div>

      {/* Only Home Page */}
      {limit && (
        <div className="flex justify-center mt-10">
          <Link
            href="/success-stories"
            className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            See More Success Stories →
          </Link>
        </div>
      )}
    </section>
  );
}
