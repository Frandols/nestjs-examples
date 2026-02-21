export class PaymentCompletedEvent {
  constructor(
    public readonly memberId: string,
    public readonly membershipId: string,
    public readonly amount: number,
  ) {}
}
