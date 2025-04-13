export type CreateUserDto = {
  email: string;
  password: string;
  nickname: string;
}

export type VerificationOtpDto = {
  email: string
  otp: string
}

export type SignInDto = {
  username: string
  password: string
}

export type SignInResponseDto = {
  accessToken: string
  refreshToken: string
}
