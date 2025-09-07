import Layout from "../../components/Layout";
import { books } from "../../lib/data";
import { Card } from "../../components/ui/Card";

export default function LibraryPage() {
  return (
    <Layout>
      <h2 className="text-2xl font-serif font-semibold mb-8">Library</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {books.map(book => (
          <Card key={book.id} className="p-6 flex flex-col gap-2">
            <div className="font-serif text-lg font-bold">{book.title}</div>
            <div className="text-sm text-neutral-500">{book.author}</div>
            <a href={`/read/${book.id}`} className="mt-4 underline text-sm">Read</a>
          </Card>
        ))}
      </div>
    </Layout>
  );
}
