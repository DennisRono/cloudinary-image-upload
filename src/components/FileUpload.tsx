'use client'
import ImageUpload from '@/utils/ImageUpload'
import { useCallback, Key, useState } from 'react'
import { useDropzone, Accept, FileRejection } from 'react-dropzone'
import { toast } from 'react-toastify'

const FileRejectionToast = ({ file, errors }: any) => (
  <div>
    <div>{`${file.name} - ${(file.size / 1e6).toFixed(2)} Mb`}</div>
    <ul>
      {errors.map((e: any) => (
        <li key={e.code}>{e.message}</li>
      ))}
    </ul>
  </div>
)

const FileUpload = ({ formData, setFormData }: FileUploadType) => {
  const user_id = 'Your User ID Here' // when a user is logged the user_id is passed to here

  const onDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const uploadFiles = async (): Promise<void> => {
        const paths: string[] | null = []
        for (const file of acceptedFiles) {
          try {
            const url = await ImageUpload(file, user_id)
            if (url) {
              paths.push(url)
            }
          } catch (error: any) {
            toast.error(`Error uploading ${file.name}: ${error.message}`)
          }
        }
        setFormData({ ...formData, images: [...formData.images, ...paths] })
      }

      await uploadFiles()

      fileRejections.forEach(({ file, errors }) => {
        toast.error(<FileRejectionToast file={file} errors={errors} />)
      })
    },
    [formData, setFormData]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
    } as Accept,
    multiple: true,
    maxFiles: 20,
    maxSize: 1e8,
    minSize: 100,
  })

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
      <div
        {...getRootProps()}
        className={`w-full p-4 text-center cursor-pointer ${
          isDragActive ? 'bg-gray-200' : 'bg-gray-100'
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-500">
          {isDragActive
            ? 'Drop the files here ...'
            : 'Drag & drop files here, or click to select files'}
        </p>
      </div>
      {Array.isArray(formData.images) && formData.images.length > 0 && (
        <ul className="mt-4 w-full flex items-center justify-start flex-wrap gap-2">
          {formData.images.map((file: string, i: Key | null | undefined) => (
            <li
              key={i}
              className={`w-min cursor-pointer text-center p-2 bg-white rounded shadow-sm mb-2`}
            >
              <div className="">
                <div className="max-h-[100px] w-[100px]">
                  {/*eslint-disable-next-line @next/next/no-img-element*/}
                  <img src={file} alt="" className="object-cover" />
                </div>
              </div>
              <button
                className="ml-2 text-red-500 hover:text-red-700"
                onClick={() => {
                  setFormData({
                    ...formData,
                    images: formData.images.filter(
                      (_: any, imgIndex: any) => imgIndex !== i
                    ),
                  })
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default FileUpload
