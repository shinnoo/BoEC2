<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="orders">
        <h2 class="jh-entity-heading" data-cy="ordersDetailsHeading"><span>Orders</span> {{ orders.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Date</span>
          </dt>
          <dd>
            <span>{{ orders.date | formatDate }}</span>
          </dd>
          <dt>
            <span>Payment</span>
          </dt>
          <dd>
            <div v-if="orders.payment">
              <router-link :to="{ name: 'PaymentView', params: { paymentId: orders.payment.id } }">{{
                orders.payment.description
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span>State</span>
          </dt>
          <dd>
            <div v-if="orders.state">
              <router-link :to="{ name: 'StateView', params: { stateId: orders.state.id } }">{{ orders.state.name }}</router-link>
            </div>
          </dd>
          <dt>
            <span>Shipment</span>
          </dt>
          <dd>
            <div v-if="orders.shipment">
              <router-link :to="{ name: 'ShipmentView', params: { shipmentId: orders.shipment.id } }">{{
                orders.shipment.address
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span>Customer</span>
          </dt>
          <dd>
            <div v-if="orders.customer">
              <router-link :to="{ name: 'CustomerView', params: { customerId: orders.customer.id } }">{{
                orders.customer.lastName
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="orders.id" :to="{ name: 'OrdersEdit', params: { ordersId: orders.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./orders-details.component.ts"></script>
