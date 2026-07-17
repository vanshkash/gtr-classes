import dbConnect from "@/lib/dbConnect";
import Note from "@/models/Note";
import ClientPreview from "./ClientPreview";
import Animate from "@/components/animations/Animate";

export default async function PreviewPage({ params }) {
  await dbConnect();

  const { id } = await params;

  const note = await Note.findById(id).lean();

  if (!note) {
    return <div>Note not found</div>;
  }

  return (
    <Animate>
    <ClientPreview
  noteId={note._id.toString()}
  title={note.title}
  pdfUrl={note.pdfUrl}
  price={note.price}
  course={note.course?.title}
  type={note.type}
/>
</Animate>
  );
}