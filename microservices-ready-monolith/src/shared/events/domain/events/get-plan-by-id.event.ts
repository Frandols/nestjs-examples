export class GetPlanByIdEvent {
  constructor(public readonly planId: string) {}
}

export class GetPlanByIdRequest {
  constructor(
    public readonly payload: GetPlanByIdEvent,
    public readonly respondTo: string,
  ) {}
}

export class GetPlanByIdResponse {
  constructor(
    public readonly name: string,
    public readonly durationDays: number,
  ) {}
}
