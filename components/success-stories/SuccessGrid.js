import SuccessCard from "./SuccessCard";

const students = [
  {
    id: 1,
    image: "/students/image.jpeg",
    name: "Lata Kaushik",
    exam: "DSSSB PGT",
    category: "PGT",
    year: 2025,
  },
  {
    id: 2,
    image: "/students/image22.jpeg",
    name: "Amit Singh",
    exam: "KVS TGT",
    category: "TGT",
    year: 2025,
  },
  {
    id: 3,
    image: "/students/image3.jpeg",
    name: "Vikas Yadav",
    exam: "NVS PGT",
    category: "NVS",
    year: 2025,
  },
  {
    id: 4,
    image: "/students/image4.jpeg",
    name: "Pooja Meena",
    exam: "DSSSB PGT",
    category: "DSSSB",
    year: 2025,
  },
  {
    id: 5,
    image: "/students/image5.jpeg",
    name: "Priya Sharma",
    exam: "PGT Maths",
    category: "PGT",
    year: 2025,
  },
  {
    id: 6,
    image: "/students/image6.jpeg",
    name: "Neha Patel",
    exam: "ART",
    category: "ART",
    year: 2025,
  },
  {
    id: 7,
    image: "/students/image7.jpeg",
    name: "Neha Patel",
    exam: "ART",
    category: "ART",
    year: 2025,
  },
  {
    id: 8,
    image: "/students/image8.jpeg",
    name: "Neha Patel",
    exam: "ART",
    category: "ART",
    year: 2025,
  },
  {
    id: 9,
    image: "/students/image9.jpeg",
    name: "Neha Patel",
    exam: "ART",
    category: "ART",
    year: 2025,
  },
  {
    id: 10,
    image: "/students/image10.jpeg",
    name: "Neha Patel",
    exam: "ART",
    category: "ART",
    year: 2025,
  },
];

export default function SuccessGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-4">

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

        {students.map((student) => (
          <SuccessCard
            key={student.id}
            {...student}
          />
        ))}
        <div className="col-span-full flex justify-center py-12">
  <div className="rounded-full border border-blue-100 bg-blue-50 px-8 py-4 shadow-sm">
    <p className="text-sm md:text-base font-semibold text-blue-700">
      And many more...
    </p>
  </div>
</div>

      </div>

    </section>
  );
}