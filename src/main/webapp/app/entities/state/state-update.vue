<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="boEcApp.state.home.createOrEditLabel" data-cy="StateCreateUpdateHeading">Create or edit a State</h2>
        <div>
          <div class="form-group" v-if="state.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="state.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="state-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="state-name"
              data-cy="name"
              :class="{ valid: !$v.state.name.$invalid, invalid: $v.state.name.$invalid }"
              v-model="$v.state.name.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="state-taxRate">Tax Rate</label>
            <input
              type="number"
              class="form-control"
              name="taxRate"
              id="state-taxRate"
              data-cy="taxRate"
              :class="{ valid: !$v.state.taxRate.$invalid, invalid: $v.state.taxRate.$invalid }"
              v-model.number="$v.state.taxRate.$model"
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
            :disabled="$v.state.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./state-update.component.ts"></script>
