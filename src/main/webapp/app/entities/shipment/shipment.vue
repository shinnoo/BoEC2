<template>
  <div>
    <h2 id="page-heading" data-cy="ShipmentHeading">
      <span id="shipment-heading">Shipments</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'ShipmentCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-shipment"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Shipment </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && shipments && shipments.length === 0">
      <span>No shipments found</span>
    </div>
    <div class="table-responsive" v-if="shipments && shipments.length > 0">
      <table class="table table-striped" aria-describedby="shipments">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span>ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('address')">
              <span>Address</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'address'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('street')">
              <span>Street</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'street'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('city')">
              <span>City</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'city'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('zipCode')">
              <span>Zip Code</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'zipCode'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('customer.lastName')">
              <span>Customer</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'customer.lastName'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="shipment in shipments" :key="shipment.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ShipmentView', params: { shipmentId: shipment.id } }">{{ shipment.id }}</router-link>
            </td>
            <td>{{ shipment.address }}</td>
            <td>{{ shipment.street }}</td>
            <td>{{ shipment.city }}</td>
            <td>{{ shipment.zipCode }}</td>
            <td>
              <div v-if="shipment.customer">
                <router-link :to="{ name: 'CustomerView', params: { customerId: shipment.customer.id } }">{{
                  shipment.customer.lastName
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ShipmentView', params: { shipmentId: shipment.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'ShipmentEdit', params: { shipmentId: shipment.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(shipment)"
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
        ><span id="boEcApp.shipment.delete.question" data-cy="shipmentDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-shipment-heading">Are you sure you want to delete this Shipment?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-shipment"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeShipment()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="shipments && shipments.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./shipment.component.ts"></script>
