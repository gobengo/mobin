import mobin from "ic:canisters/mobin";
import { Document } from "./document";

export default function DocumentStorage<D = Document>({
  debug = console.debug,
} = {}) {
  return {
    storeDocument,
  };
  async function storeDocument(document: D) {
    debug("storeDocument", { document });
    const storeDocumentReturned = await mobin.store(document);
    debug({ storeDocumentReturned });
  }
}
