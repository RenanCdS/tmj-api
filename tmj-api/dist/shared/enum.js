"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Genre = exports.ErrorMessages = exports.ErrorCodes = exports.UserStatus = exports.HashType = exports.ServiceRequestStatus = exports.Role = void 0;
var Role;
(function (Role) {
    Role[Role["CLIENT"] = 0] = "CLIENT";
    Role[Role["PROFESSIONAL"] = 1] = "PROFESSIONAL";
    Role[Role["ADMINISTRATOR"] = 2] = "ADMINISTRATOR";
})(Role = exports.Role || (exports.Role = {}));
var ServiceRequestStatus;
(function (ServiceRequestStatus) {
    ServiceRequestStatus[ServiceRequestStatus["ACTIVE"] = 0] = "ACTIVE";
    ServiceRequestStatus[ServiceRequestStatus["PENDING"] = 1] = "PENDING";
    ServiceRequestStatus[ServiceRequestStatus["DONE"] = 2] = "DONE";
    ServiceRequestStatus[ServiceRequestStatus["CANCELLED"] = 3] = "CANCELLED";
})(ServiceRequestStatus = exports.ServiceRequestStatus || (exports.ServiceRequestStatus = {}));
var HashType;
(function (HashType) {
    HashType[HashType["EMAIL_CONFIRMATION"] = 0] = "EMAIL_CONFIRMATION";
    HashType[HashType["PASSWORD_RESET"] = 1] = "PASSWORD_RESET";
})(HashType = exports.HashType || (exports.HashType = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus[UserStatus["PENDING_EMAIL"] = 0] = "PENDING_EMAIL";
    UserStatus[UserStatus["PENDING_ADDRESS"] = 1] = "PENDING_ADDRESS";
    UserStatus[UserStatus["ACTIVE"] = 2] = "ACTIVE";
    UserStatus[UserStatus["BLOCKED"] = 3] = "BLOCKED";
})(UserStatus = exports.UserStatus || (exports.UserStatus = {}));
var ErrorCodes;
(function (ErrorCodes) {
    ErrorCodes[ErrorCodes["USER_OR_PASSWORD_INVALID"] = 1000] = "USER_OR_PASSWORD_INVALID";
    ErrorCodes[ErrorCodes["PENDING_EMAIL"] = 1001] = "PENDING_EMAIL";
    ErrorCodes[ErrorCodes["PENDING_ADDRESS"] = 1004] = "PENDING_ADDRESS";
    ErrorCodes[ErrorCodes["BLOCKED_USER"] = 1002] = "BLOCKED_USER";
    ErrorCodes[ErrorCodes["USER_ALREADY_REGISTERED"] = 1003] = "USER_ALREADY_REGISTERED";
    ErrorCodes[ErrorCodes["EXPIRED_HASH"] = 2001] = "EXPIRED_HASH";
    ErrorCodes[ErrorCodes["MISSING_HASH"] = 2000] = "MISSING_HASH";
    ErrorCodes[ErrorCodes["INVALID_ROLE"] = 3000] = "INVALID_ROLE";
    ErrorCodes[ErrorCodes["INVALID_GENRE"] = 3001] = "INVALID_GENRE";
    ErrorCodes[ErrorCodes["SISTEMIC_ERROR"] = 5000] = "SISTEMIC_ERROR";
})(ErrorCodes = exports.ErrorCodes || (exports.ErrorCodes = {}));
var ErrorMessages;
(function (ErrorMessages) {
    ErrorMessages["USER_OR_PASSWORD_INVALID"] = "usu\u00E1rio ou senha inv\u00E1lidos";
    ErrorMessages["PENDING_EMAIL"] = "confirma\u00E7\u00E3o de e-mail pendente";
    ErrorMessages["PENDING_ADDRESS"] = "confirma\u00E7\u00E3o de endere\u00E7o pendente";
    ErrorMessages["BLOCKED_USER"] = "usu\u00E1rio est\u00E1 bloqueado";
    ErrorMessages["USER_ALREADY_REGISTERED"] = "usu\u00E1rio j\u00E1 est\u00E1 cadastrado";
    ErrorMessages["EXPIRED_HASH"] = "hash expirado";
    ErrorMessages["MISSING_HASH"] = "hash n\u00E3o encontrado";
    ErrorMessages["SISTEMIC_ERROR"] = "erro sist\u00EAmico";
    ErrorMessages["INVALID_ROLE"] = "tipo de usu\u00E1rio inv\u00E1lido";
    ErrorMessages["INVALID_GENRE"] = "g\u00EAnero de usu\u00E1rio inv\u00E1lido";
})(ErrorMessages = exports.ErrorMessages || (exports.ErrorMessages = {}));
var Genre;
(function (Genre) {
    Genre["MALE"] = "M";
    Genre["FEMALE"] = "F";
})(Genre = exports.Genre || (exports.Genre = {}));
//# sourceMappingURL=enum.js.map