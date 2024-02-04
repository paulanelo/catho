export interface HttpResponse {
  code: number
  data?: any
  error?: {
    message: string
    data?: any
  }
}

export interface HttpRequest {
  body?: any
}
