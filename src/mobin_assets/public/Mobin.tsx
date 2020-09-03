import * as React from "react";
import { HTMLFormElement } from "./forms";
import mobin from "ic:canisters/mobin";
import { AnyFunction, noop, voidFn } from "./functions";
import ReactState from "./ReactState";
import { Document } from "./document";
import MobinController from "./MobinController";

// Mobin is a react-renderable function
export default ({
  debug = console.debug,
  documentInputName = "document",
  fetchAndSetDocument = async () => {
    debug("fetchAndSetDocument");
    state.latestEntryLoading.set(true);
    const [doc] = await mobin.getDocument();
    state.latestEntryLoading.set(false);
    debug("fetchAndSetDocument called getDocument, returning", doc);
    if (doc) {
      debug("about to call state.latestEntry.set(doc)");
      state.latestEntry.set(doc);
    }
  },
  state = {
    latestEntry: ReactState<undefined | Document>(),
    latestEntryLoading: ReactState(false),
    saving: ReactState(false),
  },
  onDocumentStored = (d: Document) => {
    debug("onDocumentStored", d);
    state.latestEntry.set(d);
    fetchAndSetDocument();
  },
  onFirstMount = (cb: AnyFunction) => React.useEffect(voidFn(cb), []),
  controller = MobinController({ onDocumentStored, state }),
  components = {
    Welcome: () => (
      <>
        <h1>Welcome to Mobin</h1>
        <p>Create an entry in the mobin decentralized wiki.</p>
      </>
    ),
    DocumentForm: () => (
      <>
        <form onSubmit={controller.onDocumentFormSubmit}>
          <textarea name={documentInputName}></textarea>
          <input type="submit" />
          <span>{state.saving.value ? "Saving..." : ""}</span>
        </form>
      </>
    ),
    LatestEntry: () => {
      return (
        <>
          <h2>Your Latest Entry</h2>
          {(state.latestEntryLoading.value && <>Loading&hellip;</>) || ""}
          &nbsp;
          {state.latestEntry.value}
        </>
      );
    },
    State: () => (
      <>
        <h2>State</h2>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </>
    ),
  },
}) => {
  onFirstMount(async () => {
    debug("booting Mobin", { state });
    await fetchAndSetDocument();
  });
  return (
    <>
      <components.State />
      <components.Welcome />
      <components.DocumentForm />
      <components.LatestEntry />
    </>
  );
};
