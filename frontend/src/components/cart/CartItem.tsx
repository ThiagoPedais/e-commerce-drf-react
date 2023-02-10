import { CheckIcon, ClockIcon, XMarkIcon, BugAntIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { setALert } from '../../redux/actions/alert'
import { login } from '../../redux/actions/auth'

const CartItem = ({
  item,
  count,
  update_item,
  remove_item,
  render,
  setRender,
}: any) => {


  const [formData, setFormData] = useState({
    item_count: 1
  })

  const { item_count } = formData

  useEffect(() => {
    if (count)
      setFormData({ ...formData, item_count: count })
  }, [])

  const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fetchData = async () => {
      try {
        if (item.product.quantity >= item_count) {
          await update_item(item, item_count)
        }
        else {
          setALert('Not enough in stock', 'danger')
        }
        setRender(!render)
      }
      catch (error) {
        console.log(error);

      }
    }

    fetchData()
  }


  const removeItemHandler = async () => {
    await remove_item(item)
    setRender(!render)
  }



  return (
    <li className="flex py-6 sm:py-10">
      <div className="flex-shrink-0">
        <img
          src={item.product.photo}
          alt=""
          className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
        />
      </div>

      <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm">
                <Link to={`/product/${item.product.id}`} className="font-medium text-gray-700 hover:text-gray-800">
                  {item.product.name}
                </Link>
              </h3>
            </div>
            <div className="mt-1 flex text-sm">
              <p className="text-gray-500">Color</p>
              {/* {product.size ? (
                <p className="ml-4 pl-4 border-l border-gray-200 text-gray-500">{product.size}</p>
              ) : null} */}
            </div>
            <p className="mt-1 text-sm font-medium text-gray-900">{item.product.price}</p>
          </div>

          <div className="mt-4 sm:mt-0 sm:pr-9">

            <form onSubmit={e => onSubmit(e)}>
              <label htmlFor='item_count' className="sr-only">
                Quantity, {item.product.name}
              </label>
              <select
                name='item_count'
                onChange={e => onChange(e)}
                value={item_count}
                className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
              </select>
              <button type="submit" className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500">
                <span className="mx-2">Update</span>                
              </button>
            </form>

            <div className="absolute top-0 right-0">

              <button
                onClick={removeItemHandler}
                className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500">
                <span className="sr-only">Remove</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>

            </div>
          </div>
        </div>

        <p className="mt-4 flex text-sm text-gray-700 space-x-2">
          {
            item.product &&
              item.product !== null &&
              item.product !== undefined &&
              item.product.quantity > 0
              ?
              (
                <>
                  <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                  <span>In stock</span>
                </>
              )
              :
              (
                <>
                  <ClockIcon className="flex-shrink-0 h-5 w-5 text-gray-300" aria-hidden="true" />
                  <span>Out of stock</span>
                </>

              )
          }
        </p>
      </div>
    </li>
  )
}


export default CartItem