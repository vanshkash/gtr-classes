import dbConnect from "@/lib/dbConnect";
import Note from "@/models/Note";
import ClientPreview from "./ClientPreview";

export default async function PreviewPage({ params }) {
  await dbConnect();

  const { id } = await params;

  const note = await Note.findById(id).lean();

  if (!note) {
    return <div>Note not found</div>;
  }

  return (
    <ClientPreview
  title={note.title}
  pdfUrl={note.pdfUrl}
  price={note.price}
  course={note.course?.title}
/>
  );
}