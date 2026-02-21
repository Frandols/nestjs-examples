export class GetMemberPaymentsEvent {
  constructor(public readonly memberId: string) {}
}

export class GetMemberPaymentsRequest {
  constructor(
    public readonly payload: GetMemberPaymentsEvent,
    public readonly respondTo: string,
  ) {}
}

export class GetMemberPaymentsResponse {
  constructor(
    public readonly payments: {
      membershipId: string;
      amount: number;
    }[],
  ) {}
}
