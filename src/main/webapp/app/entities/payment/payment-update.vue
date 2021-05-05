<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="boEcApp.payment.home.createOrEditLabel" data-cy="PaymentCreateUpdateHeading">Create or edit a Payment</h2>
        <div>
          <div class="form-group" v-if="payment.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="payment.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="payment-description">Description</label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="payment-description"
              data-cy="description"
              :class="{ valid: !$v.payment.description.$invalid, invalid: $v.payment.description.$invalid }"
              v-model="$v.payment.description.$model"
            />
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
            :disabled="$v.payment.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./payment-update.component.ts"></script>
