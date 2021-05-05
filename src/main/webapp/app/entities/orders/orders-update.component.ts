import { Component, Vue, Inject } from 'vue-property-decorator';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import PaymentService from '@/entities/payment/payment.service';
import { IPayment } from '@/shared/model/payment.model';

import StateService from '@/entities/state/state.service';
import { IState } from '@/shared/model/state.model';

import ShipmentService from '@/entities/shipment/shipment.service';
import { IShipment } from '@/shared/model/shipment.model';

import CustomerService from '@/entities/customer/customer.service';
import { ICustomer } from '@/shared/model/customer.model';

import ProductOrderService from '@/entities/product-order/product-order.service';
import { IProductOrder } from '@/shared/model/product-order.model';

import { IOrders, Orders } from '@/shared/model/orders.model';
import OrdersService from './orders.service';

const validations: any = {
  orders: {
    date: {},
  },
};

@Component({
  validations,
})
export default class OrdersUpdate extends Vue {
  @Inject('ordersService') private ordersService: () => OrdersService;
  public orders: IOrders = new Orders();

  @Inject('paymentService') private paymentService: () => PaymentService;

  public payments: IPayment[] = [];

  @Inject('stateService') private stateService: () => StateService;

  public states: IState[] = [];

  @Inject('shipmentService') private shipmentService: () => ShipmentService;

  public shipments: IShipment[] = [];

  @Inject('customerService') private customerService: () => CustomerService;

  public customers: ICustomer[] = [];

  @Inject('productOrderService') private productOrderService: () => ProductOrderService;

  public productOrders: IProductOrder[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.ordersId) {
        vm.retrieveOrders(to.params.ordersId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.orders.id) {
      this.ordersService()
        .update(this.orders)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Orders is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.ordersService()
        .create(this.orders)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Orders is created with identifier ' + param.id;
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    }
  }

  public convertDateTimeFromServer(date: Date): string {
    if (date && dayjs(date).isValid()) {
      return dayjs(date).format(DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.orders[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.orders[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.orders[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.orders[field] = null;
    }
  }

  public retrieveOrders(ordersId): void {
    this.ordersService()
      .find(ordersId)
      .then(res => {
        res.date = new Date(res.date);
        this.orders = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.paymentService()
      .retrieve()
      .then(res => {
        this.payments = res.data;
      });
    this.stateService()
      .retrieve()
      .then(res => {
        this.states = res.data;
      });
    this.shipmentService()
      .retrieve()
      .then(res => {
        this.shipments = res.data;
      });
    this.customerService()
      .retrieve()
      .then(res => {
        this.customers = res.data;
      });
    this.productOrderService()
      .retrieve()
      .then(res => {
        this.productOrders = res.data;
      });
  }
}
