<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="boEcApp.shipment.home.createOrEditLabel" data-cy="ShipmentCreateUpdateHeading">Create or edit a Shipment</h2>
        <div>
          <div class="form-group" v-if="shipment.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="shipment.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="shipment-address">Address</label>
            <input
              type="text"
              class="form-control"
              name="address"
              id="shipment-address"
              data-cy="address"
              :class="{ valid: !$v.shipment.address.$invalid, invalid: $v.shipment.address.$invalid }"
              v-model="$v.shipment.address.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="shipment-street">Street</label>
            <input
              type="text"
              class="form-control"
              name="street"
              id="shipment-street"
              data-cy="street"
              :class="{ valid: !$v.shipment.street.$invalid, invalid: $v.shipment.street.$invalid }"
              v-model="$v.shipment.street.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="shipment-city">City</label>
            <input
              type="text"
              class="form-control"
              name="city"
              id="shipment-city"
              data-cy="city"
              :class="{ valid: !$v.shipment.city.$invalid, invalid: $v.shipment.city.$invalid }"
              v-model="$v.shipment.city.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="shipment-zipCode">Zip Code</label>
            <input
              type="text"
              class="form-control"
              name="zipCode"
              id="shipment-zipCode"
              data-cy="zipCode"
              :class="{ valid: !$v.shipment.zipCode.$invalid, invalid: $v.shipment.zipCode.$invalid }"
              v-model="$v.shipment.zipCode.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="shipment-customer">Customer</label>
            <select class="form-control" id="shipment-customer" data-cy="customer" name="customer" v-model="shipment.customer">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="shipment.customer && customerOption.id === shipment.customer.id ? shipment.customer : customerOption"
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
            :disabled="$v.shipment.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./shipment-update.component.ts"></script>
