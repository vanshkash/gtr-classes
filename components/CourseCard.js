import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export default function CourseCard({ course }) {
  return (
    <Link href={`/courses/${course.slug}`} className="group block">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

        {/* Thumbnail */}
        <div className="relative overflow-hidden bg-gray-100">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-48 lg:h-44 w-full object-cover object-center transition duration-500 group-hover:scale-105"
          />

          {/* Gradient */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-4">

          {/* Label */}
          <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
            <BookOpen size={15} />
            Premium Course
          </div>

          {/* Title */}
          <h3 className="mt-2 text-xl font-bold leading-7 text-gray-900 line-clamp-2">
            {course.title}
          </h3>

          {/* Info */}
          <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
            <BookOpen size={15} />
            Video Lectures • Notes • Test Series
          </div>

          {/* Divider */}
          <div className="my-4 border-t border-gray-100" />

          {/* Footer */}
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">
                Access
              </p>

              <div className="mt-1 flex items-center gap-2">
                <span className="text-sm text-gray-400 line-through">
                  ₹{course.price}
                </span>

                <span className="text-xl font-bold text-green-600">
                  FREE
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
              Explore

              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </div>

          </div>

        </div>

      </div>
    </Link>
  );
}