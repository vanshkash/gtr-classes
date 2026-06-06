import Link from "next/link";

export default function CourseCard({ course }) {
  return (
    <Link href={`/courses/${course.slug}`}>
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-48 w-full object-cover"
        />

        <div className="p-4">
          <h3 className="text-lg font-bold">
            {course.title}
          </h3>

          <p className="mt-2 text-sm text-gray-500">
  Premium Course
</p>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
  <span className="text-sm text-gray-400 line-through">
    ₹{course.price}
  </span>

  <span className="font-bold text-green-600">
    FREE
  </span>
</div>

            <span className="text-sm font-medium text-blue-600">
              Explore →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}