import { Component, Vue, Inject } from 'vue-property-decorator';

import OrdersService from '@/entities/orders/orders.service';
import { IOrders } from '@/shared/model/orders.model';

import ProductService from '@/entities/product/product.service';
import { IProduct } from '@/shared/model/product.model';

import { IProductOrder, ProductOrder } from '@/shared/model/product-order.model';
import ProductOrderService from './product-order.service';

const validations: any = {
  productOrder: {
    quantity: {},
  },
};

@Component({
  validations,
})
export default class ProductOrderUpdate extends Vue {
  @Inject('productOrderService') private productOrderService: () => ProductOrderService;
  public productOrder: IProductOrder = new ProductOrder();

  @Inject('ordersService') private ordersService: () => OrdersService;

  public orders: IOrders[] = [];

  @Inject('productService') private productService: () => ProductService;

  public products: IProduct[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productOrderId) {
        vm.retrieveProductOrder(to.params.productOrderId);
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
    if (this.productOrder.id) {
      this.productOrderService()
        .update(this.productOrder)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A ProductOrder is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.productOrderService()
        .create(this.productOrder)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A ProductOrder is created with identifier ' + param.id;
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

  public retrieveProductOrder(productOrderId): void {
    this.productOrderService()
      .find(productOrderId)
      .then(res => {
        this.productOrder = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.ordersService()
      .retrieve()
      .then(res => {
        this.orders = res.data;
      });
    this.productService()
      .retrieve()
      .then(res => {
        this.products = res.data;
      });
  }
}
