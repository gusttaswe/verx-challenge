export type API = {
  auth: string
}

export type EnvVariables = {
  API: API
}

export default () => ({
  API: {
    auth: process.env.API_AUTH
  }
})
