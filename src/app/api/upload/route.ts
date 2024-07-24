import { NextRequest, NextResponse } from 'next/server'
import { uploadToCloudinary } from '@/utils/upload'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File
  const folder = formData.get('user_id') as string

  const fileBuffer = await file.arrayBuffer()

  const mimeType = file.type
  const encoding = 'base64'
  const base64Data = Buffer.from(fileBuffer).toString('base64')

  // this will be used to upload the file
  const fileUri = 'data:' + mimeType + ';' + encoding + ',' + base64Data

  const res = await uploadToCloudinary(fileUri, file.name, folder)

  if (res.success && res.result) {
    return NextResponse.json({
      message: 'success',
      imgUrl: res.result.secure_url,
    })
  } else return NextResponse.json({ message: 'failure' })
}
