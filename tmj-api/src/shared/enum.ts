export enum Role {
    CLIENT = 0,
    PROFESSIONAL = 1,
    ADMINISTRATOR = 2
}

export enum ServiceRequestStatus {
    ACTIVE = 0,
    PENDING = 1,
    DONE = 2,
    CANCELLED = 3
}

export enum HashType {
    EMAIL_CONFIRMATION = 0,
    PASSWORD_RESET = 1
}

export enum UserStatus {
    PENDING_EMAIL = 0,
    ACTIVE = 1,
    BLOCKED = 2
}

export enum ErrorCodes {
    USER_OR_PASSWORD_INVALID = 1000,
    PENDING_EMAIL = 1001,
    BLOCKED_USER = 1002,
    USER_ALREADY_REGISTERED = 1003,
    EXPIRED_HASH = 2001,
    MISSING_HASH = 2000,
    SISTEMIC_ERROR = 5000
}

export enum ErrorMessages {
    USER_OR_PASSWORD_INVALID = 'usuário ou senha inválidos',
    PENDING_EMAIL = 'confirmação de e-mail pendente',
    BLOCKED_USER = 'usuário está bloqueado',
    USER_ALREADY_REGISTERED = 'usuário já está cadastrado',
    EXPIRED_HASH = 'hash expirado',
    MISSING_HASH = 'hash não encontrado',
    SISTEMIC_ERROR = 'erro sistêmico'
}

