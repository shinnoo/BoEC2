<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="state">
        <h2 class="jh-entity-heading" data-cy="stateDetailsHeading"><span>State</span> {{ state.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Name</span>
          </dt>
          <dd>
            <span>{{ state.name }}</span>
          </dd>
          <dt>
            <span>Tax Rate</span>
          </dt>
          <dd>
            <span>{{ state.taxRate }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="state.id" :to="{ name: 'StateEdit', params: { stateId: state.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./state-details.component.ts"></script>
