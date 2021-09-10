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
