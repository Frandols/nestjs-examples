export class GetMembershipByIdEvent {
  constructor(public readonly membershipId: string) {}
}

export class GetMembershipByIdRequest {
  constructor(
    public readonly payload: GetMembershipByIdEvent,
    public readonly respondTo: string,
  ) {}
}

export class GetMembershipByIdResponse {
  constructor(public readonly memberId: string) {}
}
