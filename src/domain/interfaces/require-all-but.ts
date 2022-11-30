export type RequiredAllBut<Type, Keys extends keyof Type> = Required<
  Omit<Type, Keys>
> &
  Pick<Type, Keys>;
