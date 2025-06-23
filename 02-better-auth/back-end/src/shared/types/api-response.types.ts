export class ApiResponse {
  constructor(
    public statusCode: number,
    // eslint-disable-next-line
    public data: any,
    public message: string = 'Success'
  ) {}
}
