export declare enum Role {
    CLIENT = 0,
    PROFESSIONAL = 1,
    ADMINISTRATOR = 2
}
export declare enum ServiceRequestStatus {
    ACTIVE = 0,
    PENDING = 1,
    DONE = 2,
    CANCELLED = 3
}
export declare enum HashType {
    EMAIL_CONFIRMATION = 0,
    PASSWORD_RESET = 1
}
export declare enum UserStatus {
    PENDING_EMAIL = 0,
    PENDING_ADDRESS = 1,
    ACTIVE = 2,
    BLOCKED = 3
}
export declare enum ErrorCodes {
    USER_OR_PASSWORD_INVALID = 1000,
    PENDING_EMAIL = 1001,
    PENDING_ADDRESS = 1004,
    BLOCKED_USER = 1002,
    USER_ALREADY_REGISTERED = 1003,
    EXPIRED_HASH = 2001,
    MISSING_HASH = 2000,
    INVALID_ROLE = 3000,
    INVALID_GENRE = 3001,
    SISTEMIC_ERROR = 5000
}
export declare enum ErrorMessages {
    USER_OR_PASSWORD_INVALID = "usu\u00E1rio ou senha inv\u00E1lidos",
    PENDING_EMAIL = "confirma\u00E7\u00E3o de e-mail pendente",
    PENDING_ADDRESS = "confirma\u00E7\u00E3o de endere\u00E7o pendente",
    BLOCKED_USER = "usu\u00E1rio est\u00E1 bloqueado",
    USER_ALREADY_REGISTERED = "usu\u00E1rio j\u00E1 est\u00E1 cadastrado",
    EXPIRED_HASH = "hash expirado",
    MISSING_HASH = "hash n\u00E3o encontrado",
    SISTEMIC_ERROR = "erro sist\u00EAmico",
    INVALID_ROLE = "tipo de usu\u00E1rio inv\u00E1lido",
    INVALID_GENRE = "g\u00EAnero de usu\u00E1rio inv\u00E1lido"
}
export declare enum Genre {
    MALE = "M",
    FEMALE = "F"
}
