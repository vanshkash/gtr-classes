// import dbConnect from "@/lib/dbConnect";
// import Note from "@/models/Note";
// import { notFound } from "next/navigation";

// export default async function NoteDetailsPage({ params }) {
//   await dbConnect();

//   const { slug } = await params;

// const note = await Note.findOne({
//   slug,
//   isPublished: true,
// })
//   .populate("course", "title")
//   .lean();

//   if (!note) {
//     return notFound();
//   }

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10">
//       <div className="bg-white border rounded-xl p-8 shadow-sm">
//         {/* Title */}
//         <h1 className="text-4xl font-bold mb-4">
//           {note.title}
//         </h1>

//         {/* Course */}
//         <p className="text-gray-500 mb-6">
//           {note.course?.title}
//         </p>

//         {/* Description */}
//         <div className="mb-8">
//           <h2 className="font-semibold text-lg mb-2">
//             Description
//           </h2>

//           <p className="text-gray-700 leading-7">
//             {note.description}
//           </p>
//         </div>

//         {/* Price */}
//         <div className="mb-8">
//           <span className="text-3xl font-bold">
//             {note.price === 0
//               ? "FREE"
//               : `₹${note.price}`}
//           </span>
//         </div>

//         {/* Button */}

//         {note.price === 0 ? (
//           <a
//             href={note.pdfUrl}
//             target="_blank"
//             className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg"
//           >
//             Download Notes
//           </a>
//         ) : (
//           <button className="bg-black text-white px-6 py-3 rounded-lg">
//             Buy Now
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }