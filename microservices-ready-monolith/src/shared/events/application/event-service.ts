import { type EventBus } from '@events/domain/event-bus';
import { EVENT_NAMES } from '@events/domain/event-names';
import { EVENT_ROUTER, EventRouter } from '@events/domain/event-router';
import {
  GetMemberMembershipsEvent,
  GetMemberMembershipsRequest,
  GetMemberMembershipsResponse,
} from '@events/domain/events/get-member-memberships.event';
import {
  GetMemberPaymentsEvent,
  GetMemberPaymentsRequest,
  GetMemberPaymentsResponse,
} from '@events/domain/events/get-member-payments.event';
import {
  GetMembershipByIdEvent,
  GetMembershipByIdRequest,
  GetMembershipByIdResponse,
} from '@events/domain/events/get-membership-by-id.event';
import {
  GetPlanByIdEvent,
  GetPlanByIdRequest,
  GetPlanByIdResponse,
} from '@events/domain/events/get-plan-by-id.event';
import {
  MemberExistsByIdEvent,
  MemberExistsByIdRequest,
} from '@events/domain/events/member-exists.event';
import { MembershipCreatedEvent } from '@events/domain/events/membership-created.event';
import { PaymentCompletedEvent } from '@events/domain/events/payment-completed.event';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class EventService {
  constructor(
    @Inject(EVENT_ROUTER) private readonly eventRouter: EventRouter,
  ) {}

  async memberExistsById(event: MemberExistsByIdEvent): Promise<boolean> {
    return this.eventRouter.request<boolean>(
      EVENT_NAMES.MEMBER_EXISTS_BY_ID,
      event,
    );
  }

  async onMemberExistsById(
    listener: (
      request: MemberExistsByIdRequest,
      respond: (response: boolean) => void,
    ) => Promise<void>,
  ) {
    this.eventRouter.on<MemberExistsByIdRequest>(
      EVENT_NAMES.MEMBER_EXISTS_BY_ID,
      (request) => {
        listener(request, (response) => {
          this.eventRouter.emit(request.respondTo, response);
        });
      },
    );
  }

  async getPlanById(event: GetPlanByIdEvent): Promise<GetPlanByIdResponse> {
    return this.eventRouter.request<GetPlanByIdResponse>(
      EVENT_NAMES.GET_PLAN_BY_ID,
      event,
    );
  }

  async onGetPlanById(
    listener: (
      request: GetPlanByIdRequest,
      respond: (response: GetPlanByIdResponse) => void,
    ) => Promise<void>,
  ) {
    this.eventRouter.on<GetPlanByIdRequest>(
      EVENT_NAMES.GET_PLAN_BY_ID,
      (request) => {
        listener(request, (response) => {
          this.eventRouter.emit(request.respondTo, response);
        });
      },
    );
  }

  async notifyMembershipCreated(event: MembershipCreatedEvent) {
    this.eventRouter.emit(EVENT_NAMES.MEMBERSHIP_CREATED, event);
  }

  async onMembershipCreated(
    listener: (event: MembershipCreatedEvent) => Promise<void>,
  ) {
    this.eventRouter.on<MembershipCreatedEvent>(
      EVENT_NAMES.MEMBERSHIP_CREATED,
      listener,
    );
  }

  async notifyPaymentCompleted(payload: PaymentCompletedEvent) {
    this.eventRouter.emit(EVENT_NAMES.PAYMENT_COMPLETED, payload);
  }

  async onPaymentCompleted(
    listener: (event: PaymentCompletedEvent) => Promise<void>,
  ) {
    this.eventRouter.on<PaymentCompletedEvent>(
      EVENT_NAMES.PAYMENT_COMPLETED,
      listener,
    );
  }

  async getMemberPayments(
    event: GetMemberPaymentsEvent,
  ): Promise<GetMemberPaymentsResponse> {
    return this.eventRouter.request<GetMemberPaymentsResponse>(
      EVENT_NAMES.GET_MEMBER_PAYMENTS,
      event,
    );
  }

  async onGetMemberPayments(
    listener: (
      request: GetMemberPaymentsRequest,
      respond: (response: GetMemberPaymentsResponse) => void,
    ) => Promise<void>,
  ) {
    this.eventRouter.on<GetMemberPaymentsRequest>(
      EVENT_NAMES.GET_MEMBER_PAYMENTS,
      (request) => {
        listener(request, (response) => {
          this.eventRouter.emit(request.respondTo, response);
        });
      },
    );
  }

  async getMembershipById(
    event: GetMembershipByIdEvent,
  ): Promise<GetMembershipByIdResponse | null> {
    return this.eventRouter.request<GetMembershipByIdResponse | null>(
      EVENT_NAMES.GET_MEMBERSHIP_BY_ID,
      event,
    );
  }

  async onGetMembershipById(
    listener: (
      request: GetMembershipByIdRequest,
      respond: (response: GetMembershipByIdResponse | null) => void,
    ) => Promise<void>,
  ) {
    this.eventRouter.on<GetMembershipByIdRequest>(
      EVENT_NAMES.GET_MEMBERSHIP_BY_ID,
      (request) => {
        listener(request, (response) => {
          this.eventRouter.emit(request.respondTo, response);
        });
      },
    );
  }

  async getMemberMemberships(
    event: GetMemberMembershipsEvent,
  ): Promise<GetMemberMembershipsResponse> {
    return this.eventRouter.request<GetMemberMembershipsResponse>(
      EVENT_NAMES.GET_MEMBER_MEMBERSHIPS,
      event,
    );
  }

  async onGetMemberMemberships(
    listener: (
      request: GetMemberMembershipsRequest,
      respond: (response: GetMemberMembershipsResponse) => void,
    ) => Promise<void>,
  ) {
    this.eventRouter.on<GetMemberMembershipsRequest>(
      EVENT_NAMES.GET_MEMBER_MEMBERSHIPS,
      (request) => {
        listener(request, (response) => {
          this.eventRouter.emit(request.respondTo, response);
        });
      },
    );
  }
}
