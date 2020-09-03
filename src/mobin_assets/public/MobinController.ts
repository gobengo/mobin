import { noop } from "./functions";
import ReactState from "./ReactState";
import { HTMLFormElement } from "./forms";
import { Document } from "./document";
import DocumentStorage from "./DocumentStorage";

// MobinController
export default ({
  documentInputName = "document",
  debug = console.debug,
  storeDocument = DocumentStorage().storeDocument,
  onDocumentStored = noop,
  onDocumentFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    state.saving.set(true);
    state.latestEntry.set;
    await IamFormSubmitHandler({
      documentInputName,
      onDocumentStored(d) {
        debug("setting latestEntry state optimistically", { d });
        onDocumentStored(d);
      },
      async storeDocument(d) {
        const prevLatestEntry = state.latestEntry.value;
        // optimistically set local setate
        // but on error, reset state to what it was before optimism
        state.latestEntry.set(d);
        try {
          await storeDocument(d);
        } catch (error) {
          console.warn(
            "storeDocument(newDoc) failed. Setting local state back to prevLatestEntry from before optimistic update",
            { prevLatestEntry, newLatestEntry: d }
          );
          state.latestEntry.set(prevLatestEntry);
          throw error;
        }
      },
    })(event);
    state.saving.set(false);
  },
  state = {
    latestEntry: ReactState<undefined | Document>(),
    saving: ReactState(false),
  },
} = {}) => ({
  onDocumentFormSubmit,
  storeDocument,
});

function IamFormSubmitHandler({
  documentInputName = "document",
  debug = console.debug,
  onDocumentStored = noop,
  storeDocument = DocumentStorage().storeDocument,
}) {
  return async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    debug("IamFormSubmitHandler");
    const document = event?.currentTarget?.elements?.namedItem(
      documentInputName
    )?.value;
    debug({ document });
    if (document) {
      await storeDocument(document);
      onDocumentStored(document);
    }
  };
}
