import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { z } from 'zod'
import instance from '../../apis'
import { ProductContext } from '../../contexts/ProductContext'
import { Product } from '../../interfaces/Product'

const { VITE_CLOUD_NAME, VITE_UPLOAD_PRESET } = import.meta.env
const productSchema = z.object({
  title: z.string().min(6),
  price: z.number().min(100),
  description: z.string().optional(),
  thumbnail: z.any().optional()
})

const ProductForm = () => {
  const { id } = useParams()
  const { onSubmitProduct } = useContext(ProductContext)

  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)

  const [thumbnailOption, setThumbnailOption] = useState('keep')
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Product>({
    resolver: zodResolver(productSchema)
  })
  // if (id) {
  //   useEffect(() => {
  //     ;(async () => {
  //       await getDetail(id)
  //       reset(state.selectedProduct)
  //     })()
  //   }, [id])
  // }

  useEffect(() => {
    if (id) {
      ;(async () => {
        const { data } = await instance.get(`/products/${id}`)
        console.log(data)
        reset(data)
        setThumbnailUrl(data.thumbnail)
      })()
    }
  }, [id, reset])

  const uploadImage = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', VITE_UPLOAD_PRESET)

    const response = await fetch(`https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData
    })
    const data = await response.json()
    console.log(data)
    return data.secure_url
  }

  const onSubmit = async (product: any) => {
    try {
      let updatedProduct = { ...product }
      switch (thumbnailOption) {
        case 'upload':
          if (product.thumbnail && product.thumbnail[0]) {
            const thumbnailUrl = await uploadImage(product.thumbnail[0])
            updatedProduct = { ...updatedProduct, thumbnail: thumbnailUrl }
          }
          break
        default:
      }
      if (id) {
        updatedProduct = { ...updatedProduct, id }
      }

      onSubmitProduct(updatedProduct)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{id ? 'Edit product' : 'Add product'}</h1>
        <div className='mb-3'>
          <label htmlFor='title' className='form-label'>
            Title
          </label>
          <input className='form-control' type='text' {...register('title', { required: true })} />
          {errors.title && <span className='text-danger'>{errors.title.message}</span>}
        </div>
        <div className='mb-3'>
          <label htmlFor='price' className='form-label'>
            Price
          </label>
          <input
            className='form-control'
            type='number'
            {...register('price', { required: true, valueAsNumber: true })}
          />
          {errors.price && <span className='text-danger'>{errors.price.message}</span>}
        </div>
        <div className='mb-3'>
          <label htmlFor='description' className='form-label'>
            Description
          </label>
          <input className='form-control' type='text' {...register('description')} />
        </div>
        <div className='mb-3'>
          <label htmlFor='thumbnailOption' className='form-label'>
            Choose Thumbnail Option
          </label>
          <select
            className='form-control'
            id='thumbnailOption'
            value={thumbnailOption}
            onChange={(e) => setThumbnailOption(e.target.value)}
          >
            <option value='keep'>Keep Current Thumbnail</option>
            <option value='link'>Add Thumbnail from Link</option>
            <option value='upload'>Upload Thumbnail from Local</option>
          </select>
        </div>

        <div className='mb-3'>
          <label htmlFor='thumbnail' className='form-label'>
            Thumbnail
          </label>
          {thumbnailOption === 'link' && (
            <input type='text' className='form-control' id='thumbnail' {...register('thumbnail')} />
          )}
          {thumbnailOption === 'upload' && (
            <input type='file' className='form-control' id='thumbnail' {...register('thumbnail', { required: true })} />
          )}
          {errors.thumbnail?.message && <p className='text-danger'>{errors.thumbnail?.message}</p>}
          {thumbnailUrl && (
            <img src={thumbnailUrl} alt='Product Thumbnail' style={{ maxWidth: '200px', marginTop: '10px' }} />
          )}
        </div>

        <div className='mb-3'>
          <button className='btn btn-primary w-100'>{id ? 'Edit Product' : 'Add Product'}</button>
        </div>
      </form>
    </div>
  )
}
export default ProductForm
