import fs from "fs";
import { NODE_MODULES_LOCALES_PATH } from "../constants/constants";
import log from "./log";

export function copyLocales(): void {
  const sources = [NODE_MODULES_LOCALES_PATH, `../${NODE_MODULES_LOCALES_PATH}`];
  const targets = ["../locales", "./locales"];

  const copied = sources.some(src =>
      targets.some(target => {
        try {
          fs.cpSync(src, target, { recursive: true });
          log(`Locales copied from ${src} to ${target}`);
          return true;
        } catch (_) {
          return false;
        }
      })
  );

  if (!copied) {
    log("Unable to copy locales from any source to any target");
  }
}