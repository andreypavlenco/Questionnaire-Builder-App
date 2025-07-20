import  { questionnairesHandlers } from "./handlers/questionnaires";
import { setupWorker } from "msw/browser";

export const worker = setupWorker(...questionnairesHandlers)