export type UserInfo = {
  userId: number,
  nickname: string,
  email: string,
  currentJob: string | null,
  desiredJob: string | null,
  postCount: number,
  commentCount: number,
  matchingCommentCount: number,
  matchingCount: number,
  mentorProfile: Profile,
  menteeProfile: Profile
}

export type Profile = {
  rate: number,
  profileType: string,
  introduction: string | null,
  experience: string | null,
}

export type UpdateUserInfoDto = {
  name: string,
  email: string,
  password: string
};

export type UpdateUserInfoResponseDto = {
  name: string,
  email: string,
}

export type UpdateMentorProfileDto = {
  currentJob : string | null,
  introduction: string | null,
  experience: string | null
}

export type UpdateMenteeProfileDto = {
  desiredJob: string | null,
  introduction: string | null,
  experience: string | null
}
