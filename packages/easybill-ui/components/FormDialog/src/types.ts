import { Fields, FormSchema } from "../../CurdForm"

export interface FormDialogOptions {
  title?: string
  width?: string | number
  fields?: Fields
  stepSchema?: { name: string; description?: string; formSchema: FormSchema }[]
  formSchema?: FormSchema
  handleOk?: (modelRef: Fields) => Promise<void>
  setForm?: (form: Fields) => void
}
