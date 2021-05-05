/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import OrdersDetailComponent from '@/entities/orders/orders-details.vue';
import OrdersClass from '@/entities/orders/orders-details.component';
import OrdersService from '@/entities/orders/orders.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Orders Management Detail Component', () => {
    let wrapper: Wrapper<OrdersClass>;
    let comp: OrdersClass;
    let ordersServiceStub: SinonStubbedInstance<OrdersService>;

    beforeEach(() => {
      ordersServiceStub = sinon.createStubInstance<OrdersService>(OrdersService);

      wrapper = shallowMount<OrdersClass>(OrdersDetailComponent, {
        store,
        localVue,
        router,
        provide: { ordersService: () => ordersServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundOrders = { id: 123 };
        ordersServiceStub.find.resolves(foundOrders);

        // WHEN
        comp.retrieveOrders(123);
        await comp.$nextTick();

        // THEN
        expect(comp.orders).toBe(foundOrders);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundOrders = { id: 123 };
        ordersServiceStub.find.resolves(foundOrders);

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
