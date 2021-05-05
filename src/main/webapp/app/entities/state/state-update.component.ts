import { Component, Vue, Inject } from 'vue-property-decorator';

import { IState, State } from '@/shared/model/state.model';
import StateService from './state.service';

const validations: any = {
  state: {
    name: {},
    taxRate: {},
  },
};

@Component({
  validations,
})
export default class StateUpdate extends Vue {
  @Inject('stateService') private stateService: () => StateService;
  public state: IState = new State();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.stateId) {
        vm.retrieveState(to.params.stateId);
      }
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
    if (this.state.id) {
      this.stateService()
        .update(this.state)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A State is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.stateService()
        .create(this.state)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A State is created with identifier ' + param.id;
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

  public retrieveState(stateId): void {
    this.stateService()
      .find(stateId)
      .then(res => {
        this.state = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
