import { Component, Vue, Inject } from 'vue-property-decorator';

import { IPayment, Payment } from '@/shared/model/payment.model';
import PaymentService from './payment.service';

const validations: any = {
  payment: {
    description: {},
  },
};

@Component({
  validations,
})
export default class PaymentUpdate extends Vue {
  @Inject('paymentService') private paymentService: () => PaymentService;
  public payment: IPayment = new Payment();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.paymentId) {
        vm.retrievePayment(to.params.paymentId);
      }
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
    if (this.payment.id) {
      this.paymentService()
        .update(this.payment)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Payment is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.paymentService()
        .create(this.payment)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Payment is created with identifier ' + param.id;
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

  public retrievePayment(paymentId): void {
    this.paymentService()
      .find(paymentId)
      .then(res => {
        this.payment = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
