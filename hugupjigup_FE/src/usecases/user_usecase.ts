import apiClient  from "../data/api_client";
import type {CreateUserDto, SignInDto, SignInResponseDto, VerificationOtpDto} from "../domain/user";

export const isDuplicatedEmail = async (email: string): Promise<boolean> => {
  // if exist email return true, else return false
  const response = await apiClient.get(`/api/v1/auth/duplicate/email/${email}`);
  if (response.status !== 200) {
    throw new Error("Failed to check email duplication");
  }

  return response.data.result;
};

export const isDuplicatedNickname = async (nickname: string): Promise<boolean> => {
  // if exist nickname return true, else return false
  const response = await apiClient.get(`/api/v1/auth/duplicate/nickname/${nickname}`);
  if (response.status !== 200) {
    throw new Error("Failed to check nickname duplication");
  }

  return response.data.result;
}

export const otpRequest = async (email: string): Promise<boolean> => {
  const response = await apiClient.post('/api/v1/auth/otp/send', { email });
  if (response.status !== 201) {
    throw new Error("Failed to request otp");
  }

  return response.data.result;
};

export const verificationOtp = async (verificationOtpDto: VerificationOtpDto): Promise<boolean> => {
  const response = await apiClient.post('/api/v1/auth/otp/verification', verificationOtpDto);
  if (response.status !== 201) {
    throw new Error("Failed to verify otp");
  }

  return response.data.result;
}

export const signup = async (createUserDto: CreateUserDto): Promise<boolean> => {
  const response = await apiClient.post('/api/v1/auth/signup', createUserDto);
  if (response.status !== 201) {
    throw new Error("Failed to signup");
  }

  return response.data.result;
}

export const signIn = async (signInDto: SignInDto): Promise<boolean> => {
  const response = await apiClient.post('/api/v1/auth/login', signInDto);
  if (response.status !== 201) {
    throw new Error("Failed to signin");
  }
  const { accessToken, refreshToken } = response.data.data;
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  return response.data.result;
}

export const refreshToken = async (): Promise<boolean> => {
  // 실제 구동 환경에서 테스트 필요
  const response = await apiClient.post('/api/v1/auth/refresh',
    {},
    {
      headers: {Authorization: `Bearer ${localStorage.getItem('refreshToken')}`},
    });

  if (response.status >= 300) {
    throw new Error("Failed to refresh token");
  }

  const { accessToken, refreshToken } = response.data.data;
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  return response.data.result;
}

export const logout = async (): Promise<boolean> => {
  console.log(localStorage.getItem('accessToken'));
  // 실제 구동 환경에서 테스트 필요
  const response = await apiClient.post('/api/v1/auth/logout');

  if (response.status >= 300) {
    console.log(response);
    throw new Error('Failed to logout');
  }

  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');

  return response.data.result;
}

