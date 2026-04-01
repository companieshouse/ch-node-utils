"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorisedAgent = isAuthorisedAgent;
const tslib_1 = require("tslib");
const SessionKey_1 = require("@companieshouse/node-session-handler/lib/session/keys/SessionKey");
const SignInInfoKeys_1 = require("@companieshouse/node-session-handler/lib/session/keys/SignInInfoKeys");
const constants = tslib_1.__importStar(require("../constants/constants"));
function isAuthorisedAgent(session) {
    const signInInfo = session?.data?.[SessionKey_1.SessionKey.SignInInfo];
    const acspNumber = signInInfo?.[SignInInfoKeys_1.SignInInfoKeys.AcspNumber];
    return !!acspNumber && constants.ACSP_NUMBER_REGEX.test(acspNumber);
}
;
//# sourceMappingURL=sessionUtils.js.map