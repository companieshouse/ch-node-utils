import { Session } from "@companieshouse/node-session-handler";
import { SessionKey } from "@companieshouse/node-session-handler/lib/session/keys/SessionKey";
import { SignInInfoKeys } from "@companieshouse/node-session-handler/lib/session/keys/SignInInfoKeys";
import * as constants from "../constants/constants";

export function isAuthorisedAgent (session: Session | undefined): boolean {
    const signInInfo = session?.data?.[SessionKey.SignInInfo];
    const acspNumber = signInInfo?.[SignInInfoKeys.AcspNumber] as string;
    const regex = new RegExp(constants.ACSP_NUMBER_REGEX_PATTERN);
    return !!acspNumber && regex.test(acspNumber);
};