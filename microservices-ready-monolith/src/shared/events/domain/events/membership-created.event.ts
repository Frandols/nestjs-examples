export class MembershipCreatedEvent {
  constructor(
    public readonly planName: string,
    public readonly durationDays: number,
    public readonly memberId: string,
  ) {}
}
