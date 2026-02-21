export class MemberExistsByIdEvent {
  constructor(public readonly memberId: string) {}
}

export class MemberExistsByIdRequest {
  constructor(
    public readonly payload: MemberExistsByIdEvent,
    public readonly respondTo: string,
  ) {}
}
