/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import ShipmentUpdateComponent from '@/entities/shipment/shipment-update.vue';
import ShipmentClass from '@/entities/shipment/shipment-update.component';
import ShipmentService from '@/entities/shipment/shipment.service';

import CustomerService from '@/entities/customer/customer.service';

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
  describe('Shipment Management Update Component', () => {
    let wrapper: Wrapper<ShipmentClass>;
    let comp: ShipmentClass;
    let shipmentServiceStub: SinonStubbedInstance<ShipmentService>;

    beforeEach(() => {
      shipmentServiceStub = sinon.createStubInstance<ShipmentService>(ShipmentService);

      wrapper = shallowMount<ShipmentClass>(ShipmentUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          shipmentService: () => shipmentServiceStub,

          customerService: () => new CustomerService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.shipment = entity;
        shipmentServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(shipmentServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.shipment = entity;
        shipmentServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(shipmentServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundShipment = { id: 123 };
        shipmentServiceStub.find.resolves(foundShipment);
        shipmentServiceStub.retrieve.resolves([foundShipment]);

        // WHEN
        comp.beforeRouteEnter({ params: { shipmentId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.shipment).toBe(foundShipment);
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
