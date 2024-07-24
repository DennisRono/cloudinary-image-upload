interface Form {
  images: Array<string>
}

interface FileUploadType {
  formData: Form
  setFormData: (value: any) => void
}
