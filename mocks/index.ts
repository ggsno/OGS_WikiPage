import { setupWorker } from "msw/browser";
import wikiHandlers from "./handlers/wiki";

export const worker = setupWorker(...wikiHandlers);
