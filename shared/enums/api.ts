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
export enum Sorts {
  NEWEST = 'Най-нови',
  OLDEST = 'Най-стари',
  ALPHABETIC = 'Азбучен ред',
  MOST_FUNDED = 'Най-финансирани',
  LEAST_FUNDED = 'Най-нефинансирани'
}
