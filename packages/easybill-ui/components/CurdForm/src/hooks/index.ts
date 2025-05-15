import { inject } from "vue"
import type { FormContext } from "../types"
export function useForm() {
  const formContext = inject<FormContext>("curdFormContext", {} as FormContext)
  return { formContext }
}
