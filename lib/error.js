export class NotFound extends Error {
  constructor() {
    super()
    this.name = 'NotFound'
  }
}

export class NotValid extends Error {
  constructor() {
    super()
    this.name = 'NotValid'
  }
}

export class NotYours extends Error {
  constructor() {
    super()
    this.name = 'NotYours'
  }
}

export class EmailNotUnique extends Error {
  constructor () {
    super()
    this.name = 'EmailNotUnique'
  }
}

export class NoPassword extends Error {
  constructor () {
    super()
    this.name = 'NoPassword'
  }
}