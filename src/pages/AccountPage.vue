<template>
  <section class="row about text-center ms-4">
    <div class="col-12">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
    </div>
    <div class="col-12">

      <form>
        <section class="row justify-content-center">
          <div class="col-12">

            <div class="form-floating mb-3">
              <input required maxlength="100" type="text" class="form-control" id="floatingInput"
                placeholder="name@example.com">
              <label for="floatingInput" class="text-dark">Name</label>
            </div>
          </div>
          <div class="form-floating mb-3">
            <input type="url" class="form-control" id="floatingPassword" placeholder="Cover Image Url">
            <label class="text-dark" for="floatingPassword">Cover Image Url</label>
          </div>
          <div class="form-floating mb-3">
            <input maxlength="500" type="url" class="form-control" id="floatingPassword" placeholder="Password">
            <label class="text-dark" for="floatingPassword">Profile Picture Url</label>
          </div>
          <div class="form-floating mb-3">
            <input maxlength="500" type="url" class="form-control" id="floatingPassword" placeholder="Password">
            <label class="text-dark" for="floatingPassword">Github</label>
          </div>
          <div class="form-floating mb-3">
            <input maxlength="500" type="url" class="form-control" id="floatingPassword" placeholder="Password">
            <label class="text-dark" for="floatingPassword">Linkedin</label>
          </div>
          <div class="form-floating mb-3">
            <input maxlength="500" type="url" class="form-control" id="floatingPassword" placeholder="Password">
            <label class="text-dark" for="floatingPassword">Resume</label>
          </div>
        </section>
        <section class="row ">
          <div class="col-4 mt-2">

            <div class="form-check ">
              <input :checked="acount" class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
              <label class="form-check-label " for="flexCheckDefault">
                Have you graduated BCW ?
              </label>
            </div>
          </div>
          <div class="col-8">

          </div>
        </section>
      </form>
    </div>
  </section>
</template>

<script>
import { computed, onUnmounted, ref } from 'vue';
import { AppState } from '../AppState';
import { accountService } from "../services/AccountService";
export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
