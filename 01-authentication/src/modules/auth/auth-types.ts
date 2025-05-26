// Auth utils

export interface FindUserParams {
  email?: string;
  id?: string;
}

export interface CheckUserExistsParams {
  email: string;
}

export interface CreateUserParams {
  fistName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ValidatePasswordParams {
  currentPassword: string;
  incomingPassword: string;
}
