interface Form {
  full_name: string
  email: string
  address: string
  city: string
  country_region: string
  state_province: string
  zip_code: string
  images: Array<string>
}

interface FileUploadType {
  formData: Form
  setFormData: (value: any) => void
}
