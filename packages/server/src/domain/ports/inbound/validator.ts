export interface ValidatorPort {
  validate: (input: unknown) => Error | undefined
}
