import {
  useFormContext,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

export function useRegisterWithErrorRevalidation<
  TFieldValues extends FieldValues,
>() {
  const { getFieldState, register, trigger } =
    useFormContext<TFieldValues>();

  return (
    name: FieldPath<TFieldValues>,
    dependentNames: FieldPath<TFieldValues>[] = [],
  ) =>
    register(name, {
      onChange: () => {
        const fieldsToRevalidate = [name, ...dependentNames].filter(
          (fieldName) => getFieldState(fieldName).error,
        );

        if (fieldsToRevalidate.length > 0) {
          void trigger(fieldsToRevalidate);
        }
      },
    });
}
