/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import * as config from '@/shared/config/config';
import OrdersUpdateComponent from '@/entities/orders/orders-update.vue';
import OrdersClass from '@/entities/orders/orders-update.component';
import OrdersService from '@/entities/orders/orders.service';

import PaymentService from '@/entities/payment/payment.service';

import StateService from '@/entities/state/state.service';

import ShipmentService from '@/entities/shipment/shipment.service';

import CustomerService from '@/entities/customer/customer.service';

import ProductOrderService from '@/entities/product-order/product-order.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});
localVue.component('b-input-group', {});
localVue.component('b-input-group-prepend', {});
localVue.component('b-form-datepicker', {});
localVue.component('b-form-input', {});

describe('Component Tests', () => {
  describe('Orders Management Update Component', () => {
    let wrapper: Wrapper<OrdersClass>;
    let comp: OrdersClass;
    let ordersServiceStub: SinonStubbedInstance<OrdersService>;

    beforeEach(() => {
      ordersServiceStub = sinon.createStubInstance<OrdersService>(OrdersService);

      wrapper = shallowMount<OrdersClass>(OrdersUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          ordersService: () => ordersServiceStub,

          paymentService: () => new PaymentService(),

          stateService: () => new StateService(),

          shipmentService: () => new ShipmentService(),

          customerService: () => new CustomerService(),

          productOrderService: () => new ProductOrderService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('load', () => {
      it('Should convert date from string', () => {
        // GIVEN
        const date = new Date('2019-10-15T11:42:02Z');

        // WHEN
        const convertedDate = comp.convertDateTimeFromServer(date);

        // THEN
        expect(convertedDate).toEqual(dayjs(date).format(DATE_TIME_LONG_FORMAT));
      });

      it('Should not convert date if date is not present', () => {
        expect(comp.convertDateTimeFromServer(null)).toBeNull();
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.orders = entity;
        ordersServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(ordersServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.orders = entity;
        ordersServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(ordersServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundOrders = { id: 123 };
        ordersServiceStub.find.resolves(foundOrders);
        ordersServiceStub.retrieve.resolves([foundOrders]);

        // WHEN
        comp.beforeRouteEnter({ params: { ordersId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.orders).toBe(foundOrders);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});
