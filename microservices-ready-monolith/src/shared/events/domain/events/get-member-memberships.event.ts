export class GetMemberMembershipsEvent {
  constructor(public readonly memberId: string) {}
}

export class GetMemberMembershipsRequest {
  constructor(
    public readonly payload: GetMemberMembershipsEvent,
    public readonly respondTo: string,
  ) {}
}

export class GetMemberMembershipsResponse {
  constructor(
    public readonly memberships: {
      planId: string;
      startDate: Date;
      endDate: Date;
    }[],
  ) {}
}
