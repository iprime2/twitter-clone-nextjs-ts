import Image from 'next/image'
import { FC, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { readBuilderProgram } from 'typescript'

interface ImageUploadProps {
  value: string
  disabled: boolean
  onChange: (base64: string) => void
  label: string
}

const ImageUpload: FC<ImageUploadProps> = ({
  value,
  onChange,
  disabled,
  label,
}) => {
  const [base64, setBase64] = useState(value)

  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64)
    },
    [onChange]
  )

  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0]
      const reader = new FileReader()

      reader.onload = (e: any) => {
        setBase64(e.target.result)
        handleChange(e.target.result)
      }

      reader.readAsDataURL(file)
    },
    [handleChange]
  )

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  })

  return (
    <div
      {...getRootProps({
        className:
          'w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700',
      })}
    >
      <input {...getInputProps()} />
      {base64 ? (
        <div className='flex items-center justify-center'>
          <Image src={base64} height='100' width='100' alt='Uploaded Image' />
        </div>
      ) : (
        <div className='text-white'>{label}</div>
      )}
    </div>
  )
}

export default ImageUpload
