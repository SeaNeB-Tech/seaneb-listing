import { toFileName } from '../../utils'
import {
  DeleteObjectCommand,
  DeleteObjectCommandOutput,
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandOutput,
  S3Client
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export const awsUpload = async (fileName: string, file: File): Promise<{ status: boolean; Key: string } | null> => {
  // Create an S3 client instance with necessary credentials
  const s3Client = new S3Client({
    endpoint: process.env.NEXT_PUBLIC_ENDPOINT,
    region: process.env.NEXT_PUBLIC_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY as string,
      secretAccessKey: process.env.NEXT_PUBLIC_SECRET_KEY as string
    }
  })

  // Clean the file name to ensure it does not end with a '/'
  const updatedFileName = !fileName?.endsWith('/') ? fileName : fileName.slice(0, fileName.lastIndexOf('/'))
  const extension = file?.name?.slice(file?.name?.lastIndexOf('.')) ?? '.png'
  const Key = toFileName(`${updatedFileName}${extension}`)

  if (fileName && file) {
    try {
      const command = new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_BUCKET_ID,
        Key,
        Body: file,
        ContentType: file.type,
        ACL: 'private'
      })

      const results: PutObjectCommandOutput = await s3Client.send(command)

      // Check if the response status code indicates success
      if (results?.$metadata?.httpStatusCode === 200) {
        return { status: true, Key }
      } else {
        return null
      }
    } catch (err) {
      console.info('error => ', err)

      return null
    }
  } else {
    return null
  }
}

// Define the types for the function parameters
export const awsDownload = async (filename: string | undefined): Promise<string | null> => {
  // Create S3 client
  const s3Client = new S3Client({
    endpoint: process.env.NEXT_PUBLIC_ENDPOINT,
    region: process.env.NEXT_PUBLIC_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY!,
      secretAccessKey: process.env.NEXT_PUBLIC_SECRET_KEY!
    }
  })

  if (filename) {
    // Create GetObjectCommand
    const command = new GetObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_BUCKET_ID!,
      Key: filename
    })

    // Get the signed URL
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 })

    return url
  } else {
    return null
  }
}

export const awsDelete = async (fileName: string | undefined): Promise<string | null> => {
  // Initialize the S3 client
  const s3Client = new S3Client({
    endpoint: process.env.NEXT_PUBLIC_ENDPOINT,
    region: process.env.NEXT_PUBLIC_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY!,
      secretAccessKey: process.env.NEXT_PUBLIC_SECRET_KEY!
    }
  })

  // Ensure fileName is provided
  if (fileName) {
    const command = new DeleteObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_BUCKET_ID,
      Key: fileName
    })

    try {
      // Send the delete command
      const results: DeleteObjectCommandOutput = await s3Client.send(command)

      // Check if the deletion was successful
      if (results.$metadata.httpStatusCode === 204) {
        return `File ${fileName} deleted successfully.` // Return a success message
      } else {
        return `Failed to delete file ${fileName}.` // In case deletion didn't succeed
      }
    } catch (err) {
      console.error('Error deleting file:', err)

      return null // Return null if there was an error
    }
  } else {
    return null // Return null if no file name is provided
  }
}
