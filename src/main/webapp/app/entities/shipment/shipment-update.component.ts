import { Component, Vue, Inject } from 'vue-property-decorator';

import CustomerService from '@/entities/customer/customer.service';
import { ICustomer } from '@/shared/model/customer.model';

import { IShipment, Shipment } from '@/shared/model/shipment.model';
import ShipmentService from './shipment.service';

const validations: any = {
  shipment: {
    address: {},
    street: {},
    city: {},
    zipCode: {},
  },
};

@Component({
  validations,
})
export default class ShipmentUpdate extends Vue {
  @Inject('shipmentService') private shipmentService: () => ShipmentService;
  public shipment: IShipment = new Shipment();

  @Inject('customerService') private customerService: () => CustomerService;

  public customers: ICustomer[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.shipmentId) {
        vm.retrieveShipment(to.params.shipmentId);
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
    if (this.shipment.id) {
      this.shipmentService()
        .update(this.shipment)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Shipment is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.shipmentService()
        .create(this.shipment)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Shipment is created with identifier ' + param.id;
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

  public retrieveShipment(shipmentId): void {
    this.shipmentService()
      .find(shipmentId)
      .then(res => {
        this.shipment = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.customerService()
      .retrieve()
      .then(res => {
        this.customers = res.data;
      });
  }
}
