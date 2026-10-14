import { notFound } from "next/navigation";

// Qualsiasi URL non previsto dentro una lingua mostra la 404 tradotta.
export default function CatchAllPage() {
  notFound();
}
