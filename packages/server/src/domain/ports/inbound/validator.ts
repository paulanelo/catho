export interface ValidatorPort {
  validate: (input: Record<string, unknown>) => Error | undefined
}
