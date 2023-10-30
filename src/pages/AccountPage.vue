<template>
  <section class="row about text-center ms-4">
    <div class="col-12">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
    </div>
    <div class="col-12">

      <form @submit.prevent="editAccount()">
        <section class="row justify-content-center">
          <div class="col-12">

            <div class="form-floating mb-3">
              <input v-model="editable.name" required maxlength="100" type="text" class="form-control" id="floatingInput"
                placeholder="name@example.com">
              <label for="floatingInput" class="text-dark ">Name</label>
            </div>
          </div>
          <div class="form-floating mb-3">
            <input v-model="editable.coverImg" type="url" class="form-control" id="floatingPassword"
              placeholder="Cover Image Url">
            <label class="text-dark ms-2" for="floatingPassword">Cover Image Url</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="editable.picture" maxlength="500" type="url" class="form-control" id="floatingPassword"
              placeholder="Password">
            <label class="text-dark ms-2" for="floatingPassword">Profile Picture Url</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="editable.github" maxlength="500" type="url" class="form-control" id="floatingPassword"
              placeholder="Password">
            <label class="text-dark ms-2" for="floatingPassword">Github</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="editable.linkedin" maxlength="500" type="url" class="form-control" id="floatingPassword"
              placeholder="Password">
            <label class="text-dark ms-2" for="floatingPassword">Linkedin</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="editable.resume" maxlength="500" type="url" class="form-control" id="floatingPassword"
              placeholder="Password">
            <label class="text-dark ms-2" for="floatingPassword">Resume</label>
          </div>
        </section>
        <section class="row " :class="editable.graduated ? '' : 'justify-content-center'">
          <div class="col-4 mt-3 d-flex ">

            <div class="form-check ">
              <input @change="updateCheckBox()" v-model="edit.graduated" :checked="editable.graduated"
                class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
              <label class="form-check-label " for="flexCheckDefault">
                Have you graduated BCW ?
              </label>
            </div>
          </div>
          <div v-if="editable.graduated" class="col-8">
            <div class="form-floating mb-3 ">
              <input v-model="editable.class" maxlength="500" type="url" class="form-control" id="floatingPassword"
                placeholder="Password">
              <label class="text-dark ms-2" for="floatingPassword">Class You Graduated</label>
            </div>
          </div>
          <div class="col-12 text-end">
            <button type="submit" class="btn btn-outline-light">Save</button>
          </div>

        </section>
      </form>
    </div>
  </section>
</template>

<script>
import { computed, onMounted, onUnmounted, ref, watchEffect } from 'vue';
import { AppState } from '../AppState';
import { accountService } from "../services/AccountService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
export default {
  setup() {
    const editable = ref({})
    const edit = editable.value
    onMounted(() => {
      editable.value = { ...AppState.account }
      logger.log('editable variable filled with data', editable)
    })
    // watchEffect(() => {
    //   if (AppState.account) {
    //     editable.value = { ...AppState.account }
    //     logger.log('editable variable filled with data', editable)
    //   }
    // })
    return {
      edit,
      editable,
      account: computed(() => AppState.account),

      updateCheckBox() {
        if (editable.value.graduated == true) {
          editable.value.graduated = false
          logger.log('[AccountPage] updateCheckBox(), flipping boolean to false', editable.value.graduated)
        } else if (editable.value.graduated == false) {
          editable.value.graduated = true
          logger.log('[AccountPage] updateCheckBox(), flipping boolean to true', editable.value.graduated)
        }
      },


      async editAccount() {
        try {
          const formData = editable.value
          const res = await accountService.editAccount(formData)
          editable.value = res
          Pop.success('Your Changes Have Been Saved')
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
