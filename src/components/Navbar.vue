<template>
  <nav class="navbar navbar-expand-lg nav-color px-3 ">
    <router-link class="navbar-brand " :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <i class="mdi mdi-lan fs-2 text-light"> The Network</i>

      </div>
    </router-link>


    <router-link :to="{ name: 'Search' }">
      <div class="text-center mt-2">
        <i class="mdi mdi-magnify fs-2 ms-3 text-light"></i>

      </div>
      <!-- <p>SEARCH</p> -->
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>

        </li>
      </ul>
      <button v-if="account" type="button" class="btn btn-outline-dark text-light me-4" data-bs-toggle="modal"
        data-bs-target="#form-modal">
        <p class="d-inline fs-4">Post</p>
        <i class="mdi mdi-plus"></i>

      </button>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
  <FormModal />
</template>

<script>
import { computed } from "vue";
import Login from './Login.vue';
import { AppState } from "../AppState";
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}


.nav-color {
  background-color: rgb(65, 4, 4);
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
