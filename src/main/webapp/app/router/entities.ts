import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore

// prettier-ignore
const Customer = () => import('@/entities/customer/customer.vue');
// prettier-ignore
const CustomerUpdate = () => import('@/entities/customer/customer-update.vue');
// prettier-ignore
const CustomerDetails = () => import('@/entities/customer/customer-details.vue');
// prettier-ignore
const Shipment = () => import('@/entities/shipment/shipment.vue');
// prettier-ignore
const ShipmentUpdate = () => import('@/entities/shipment/shipment-update.vue');
// prettier-ignore
const ShipmentDetails = () => import('@/entities/shipment/shipment-details.vue');
// prettier-ignore
const Orders = () => import('@/entities/orders/orders.vue');
// prettier-ignore
const OrdersUpdate = () => import('@/entities/orders/orders-update.vue');
// prettier-ignore
const OrdersDetails = () => import('@/entities/orders/orders-details.vue');
// prettier-ignore
const State = () => import('@/entities/state/state.vue');
// prettier-ignore
const StateUpdate = () => import('@/entities/state/state-update.vue');
// prettier-ignore
const StateDetails = () => import('@/entities/state/state-details.vue');
// prettier-ignore
const Payment = () => import('@/entities/payment/payment.vue');
// prettier-ignore
const PaymentUpdate = () => import('@/entities/payment/payment-update.vue');
// prettier-ignore
const PaymentDetails = () => import('@/entities/payment/payment-details.vue');
// prettier-ignore
const Product = () => import('@/entities/product/product.vue');
// prettier-ignore
const ProductUpdate = () => import('@/entities/product/product-update.vue');
// prettier-ignore
const ProductDetails = () => import('@/entities/product/product-details.vue');
// prettier-ignore
const ProductOrder = () => import('@/entities/product-order/product-order.vue');
// prettier-ignore
const ProductOrderUpdate = () => import('@/entities/product-order/product-order-update.vue');
// prettier-ignore
const ProductOrderDetails = () => import('@/entities/product-order/product-order-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default [
  {
    path: '/customer',
    name: 'Customer',
    component: Customer,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/customer/new',
    name: 'CustomerCreate',
    component: CustomerUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/customer/:customerId/edit',
    name: 'CustomerEdit',
    component: CustomerUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/customer/:customerId/view',
    name: 'CustomerView',
    component: CustomerDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/shipment',
    name: 'Shipment',
    component: Shipment,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/shipment/new',
    name: 'ShipmentCreate',
    component: ShipmentUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/shipment/:shipmentId/edit',
    name: 'ShipmentEdit',
    component: ShipmentUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/shipment/:shipmentId/view',
    name: 'ShipmentView',
    component: ShipmentDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/orders/new',
    name: 'OrdersCreate',
    component: OrdersUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/orders/:ordersId/edit',
    name: 'OrdersEdit',
    component: OrdersUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/orders/:ordersId/view',
    name: 'OrdersView',
    component: OrdersDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/state',
    name: 'State',
    component: State,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/state/new',
    name: 'StateCreate',
    component: StateUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/state/:stateId/edit',
    name: 'StateEdit',
    component: StateUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/state/:stateId/view',
    name: 'StateView',
    component: StateDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/payment',
    name: 'Payment',
    component: Payment,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/payment/new',
    name: 'PaymentCreate',
    component: PaymentUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/payment/:paymentId/edit',
    name: 'PaymentEdit',
    component: PaymentUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/payment/:paymentId/view',
    name: 'PaymentView',
    component: PaymentDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product',
    name: 'Product',
    component: Product,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product/new',
    name: 'ProductCreate',
    component: ProductUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product/:productId/edit',
    name: 'ProductEdit',
    component: ProductUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product/:productId/view',
    name: 'ProductView',
    component: ProductDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-order',
    name: 'ProductOrder',
    component: ProductOrder,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-order/new',
    name: 'ProductOrderCreate',
    component: ProductOrderUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-order/:productOrderId/edit',
    name: 'ProductOrderEdit',
    component: ProductOrderUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-order/:productOrderId/view',
    name: 'ProductOrderView',
    component: ProductOrderDetails,
    meta: { authorities: [Authority.USER] },
  },
  // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
];
