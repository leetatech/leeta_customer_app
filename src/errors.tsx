export enum applicationErrorCode {
  DatabaseError = 1001,
  DatabaseNoRecordError = 1002,
  UnmarshalError = 1003,
  MarshalError = 1004,
  PasswordValidationError = 1005,
  EncryptionError = 1006,
  DecryptionError = 1007,
  DuplicateUserError = 1008,
  UserNotFoundError = 1009,
  IdentityNotFoundError = 1010,
  UserLockedError = 1011,
  CredentialsValidationError = 1012,
  TokenGenerationError = 1013,
  TokenValidationError = 1014,
  UserCategoryError = 1015,
  EmailSendingError = 1016,
  BusinessCategoryError = 1017,
  StatusesError = 1018,
  ErrorUnauthorized = 1019,
  EmailFormatError = 1020,
  ValidEmailHostError = 1021,
  ValidLeetaDomainError = 1022,
  FormParseError = 1023,
  OrderStatusesError = 1024,
  ProductCategoryError = 1025,
  ProductSubCategoryError = 1026,
  ProductStatusError = 1027,
  InternalError = 1028,
  MissingUserNames = 1029,
  InvalidUserRoleError = 1030,
  InvalidIdentityError = 1031,
  NoUserIdentity = 1039,
}
