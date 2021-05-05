<template>
  <div>
    <h2 id="page-heading" data-cy="OrdersHeading">
      <span id="orders-heading">Orders</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'OrdersCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-orders"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Orders </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && orders && orders.length === 0">
      <span>No orders found</span>
    </div>
    <div class="table-responsive" v-if="orders && orders.length > 0">
      <table class="table table-striped" aria-describedby="orders">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span>ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('date')">
              <span>Date</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'date'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('payment.description')">
              <span>Payment</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'payment.description'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('state.name')">
              <span>State</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'state.name'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('shipment.address')">
              <span>Shipment</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'shipment.address'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('customer.lastName')">
              <span>Customer</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'customer.lastName'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="orders in orders" :key="orders.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'OrdersView', params: { ordersId: orders.id } }">{{ orders.id }}</router-link>
            </td>
            <td>{{ orders.date | formatDate }}</td>
            <td>
              <div v-if="orders.payment">
                <router-link :to="{ name: 'PaymentView', params: { paymentId: orders.payment.id } }">{{
                  orders.payment.description
                }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="orders.state">
                <router-link :to="{ name: 'StateView', params: { stateId: orders.state.id } }">{{ orders.state.name }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="orders.shipment">
                <router-link :to="{ name: 'ShipmentView', params: { shipmentId: orders.shipment.id } }">{{
                  orders.shipment.address
                }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="orders.customer">
                <router-link :to="{ name: 'CustomerView', params: { customerId: orders.customer.id } }">{{
                  orders.customer.lastName
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'OrdersView', params: { ordersId: orders.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'OrdersEdit', params: { ordersId: orders.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(orders)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="boEcApp.orders.delete.question" data-cy="ordersDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-orders-heading">Are you sure you want to delete this Orders?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-orders"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeOrders()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="orders && orders.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./orders.component.ts"></script>
