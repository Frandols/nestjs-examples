export type RequestContractMap = {};

export type RequestName = keyof RequestContractMap;

export type RequestPayload<Name extends RequestName> = {
  respondTo: string;
} & (RequestContractMap[Name]['payload'] extends {}
  ? RequestContractMap[Name]['payload']
  : {});

export type EmitContractMap = {
  MEMBERSHIP_CREATED: {
    payload: {
      planName: string;
      durationDays: number;
      memberId: string;
    };
  };
  PAYMENT_COMPLETED: {
    payload: {
      membershipId: string;
      amount: number;
      memberId: string;
    };
  };
};

export type EmitName = keyof EmitContractMap;

export type EventContractMap = RequestContractMap & EmitContractMap;

export type EventName = keyof EventContractMap;

export type EventPayload<Name extends EventName> =
  EventContractMap[Name]['payload'];
