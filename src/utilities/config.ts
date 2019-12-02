import { Storage } from '@google-cloud/storage'

const downloadFile = (
  bucketName: string,
  srcFilename: string,
  destFilename: string
): void => {
  const storage = new Storage()

  const options = {
    destination: destFilename,
  }

  storage
    .bucket(bucketName)
    .file(srcFilename)
    .download(options)
}

downloadFile(process.env.BUCKET_NAME, '.env.prod', '.env.prod')
