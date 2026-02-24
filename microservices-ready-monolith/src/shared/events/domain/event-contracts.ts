export type RequestContractMap = {
  GET_MEMBER_EXISTS_BY_ID: {
    payload: {
      memberId: string;
    };
    response: boolean;
  };
  GET_MEMBER_MEMBERSHIPS: {
    payload: {
      memberId: string;
    };
    response: {
      planId: string;
      startDate: Date;
      endDate: Date;
    }[];
  };
  GET_MEMBER_PAYMENTS: {
    payload: {
      memberId: string;
    };
    response: {
      membershipId: string;
      amount: number;
    }[];
  };
  GET_MEMBERSHIP_BY_ID: {
    payload: {
      membershipId: string;
    };
    response: {
      memberId: string;
    };
  };
  GET_PLAN_BY_ID: {
    payload: {
      planId: string;
    };
    response: {
      name: string;
      durationDays: number;
    };
  };
};

export type RequestName = keyof RequestContractMap;

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
