export enum UserStatus{
  CREATED,
  EMAIL_TAKEN,
  PASSWORD_INVALID,
}
export enum UserRole{
  ADMIN = 'admin',
  USER = 'user'
}
export enum PaymentStatus {
  AWAITING,
  FAIL,
  SUCCESS
}
export const PaymentStatusColor: Record<PaymentStatus, string> = {
  0: 'yellow',
  1: 'red',
  2: 'green'
}
