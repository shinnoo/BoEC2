<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="boEcApp.orders.home.createOrEditLabel" data-cy="OrdersCreateUpdateHeading">Create or edit a Orders</h2>
        <div>
          <div class="form-group" v-if="orders.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="orders.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="orders-date">Date</label>
            <div class="d-flex">
              <input
                id="orders-date"
                data-cy="date"
                type="datetime-local"
                class="form-control"
                name="date"
                :class="{ valid: !$v.orders.date.$invalid, invalid: $v.orders.date.$invalid }"
                :value="convertDateTimeFromServer($v.orders.date.$model)"
                @change="updateInstantField('date', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="orders-payment">Payment</label>
            <select class="form-control" id="orders-payment" data-cy="payment" name="payment" v-model="orders.payment">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="orders.payment && paymentOption.id === orders.payment.id ? orders.payment : paymentOption"
                v-for="paymentOption in payments"
                :key="paymentOption.id"
              >
                {{ paymentOption.description }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="orders-state">State</label>
            <select class="form-control" id="orders-state" data-cy="state" name="state" v-model="orders.state">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="orders.state && stateOption.id === orders.state.id ? orders.state : stateOption"
                v-for="stateOption in states"
                :key="stateOption.id"
              >
                {{ stateOption.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="orders-shipment">Shipment</label>
            <select class="form-control" id="orders-shipment" data-cy="shipment" name="shipment" v-model="orders.shipment">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="orders.shipment && shipmentOption.id === orders.shipment.id ? orders.shipment : shipmentOption"
                v-for="shipmentOption in shipments"
                :key="shipmentOption.id"
              >
                {{ shipmentOption.address }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="orders-customer">Customer</label>
            <select class="form-control" id="orders-customer" data-cy="customer" name="customer" v-model="orders.customer">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="orders.customer && customerOption.id === orders.customer.id ? orders.customer : customerOption"
                v-for="customerOption in customers"
                :key="customerOption.id"
              >
                {{ customerOption.lastName }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.orders.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./orders-update.component.ts"></script>
