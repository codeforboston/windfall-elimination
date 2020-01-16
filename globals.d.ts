declare namespace NodeJS {
  // By default, Typescript does not have sessionStorage on the Global type. We add it here.
  interface Global {
    sessionStorage: {
      getItem: (key: string) => string
      setItem: (key: string, value: string) => void
    }
  }
}
