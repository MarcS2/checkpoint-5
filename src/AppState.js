import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account{} | null} */
  account: null,
  previousPage: null,
  nextPage: null,
  /** @type {import('./models/Post.js').Post } */
  posts: [],
  /** @type {import('./models/Ad.js').Ad } */
  ads: [],

  /** @type {import('./models/Profile.js').Profile | null } */
  profile: null,


})

