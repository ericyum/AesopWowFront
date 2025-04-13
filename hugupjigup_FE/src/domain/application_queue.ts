export type ApplicationDto = {
  userId: number
  content: string
}

export type ApplicationQueueResponseDto = {
  applicationQueueId: number
  matchingId: number
  userId: number
  content: string
  status: string
}

export type UpdateApplicationDto = {
  content: string
  applicationQueueStatus: ApplicationQueueStatus
}

export type ApplicationQueueStatus = "WAIT" | "INPROGRESS" | "COMPLETED" | "FAILED";

