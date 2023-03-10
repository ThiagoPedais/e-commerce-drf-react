import { Key, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import CartItem from '../../components/cart/CartItem'
import Layout from '../../hocs/Layout'
import {
    remove_item,
    update_item,
    get_item,
    get_total,
    get_item_total
} from '../../redux/actions/cart'
import {    
    remove_wishlist_item
} from '../../redux/actions/wishlist'

import { CheckIcon, ClockIcon, QuestionMarkCircleIcon } from '@heroicons/react/20/solid'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { setALert } from '../../redux/actions/alert'
import WishlistItem from '../../components/cart/WishlistItem'



const products = [
    {
        id: 1,
        name: 'Basic Tee',
        href: '#',
        price: '$32.00',
        color: 'Sienna',
        inStock: true,
        size: 'Large',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in sienna.",
    },
    {
        id: 2,
        name: 'Basic Tee',
        href: '#',
        price: '$32.00',
        color: 'Black',
        inStock: false,
        leadTime: '3–4 weeks',
        size: 'Large',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
    },
    {
        id: 3,
        name: 'Nomad Tumbler',
        href: '#',
        price: '$35.00',
        color: 'White',
        inStock: true,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg',
        imageAlt: 'Insulated bottle with white base and black snap lid.',
    },
]


const Cart = ({
    get_item,
    get_total,
    get_item_total,
    isAuthenticated,
    items,
    amount,
    compare_amount,
    total_items,
    remove_item,
    update_item,
    wishlist_items,
    remove_wishlist_item
}: any) => {

    const [render, setRender] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
        get_item()
        get_total()
        get_item_total()
    }, [render])


    const showItems = () => {
        return (
            <div>
                {
                    items &&
                    items !== null &&
                    items !== undefined &&
                    items.length !== 0 &&
                    items.map((item: { count: any }, index: Key | null | undefined) => {
                        let count = item.count
                        return (
                            <div key={index}>
                                <CartItem
                                    item={item}
                                    count={count}
                                    update_item={update_item}
                                    remove_item={remove_item}
                                    render={render}
                                    setRender={setRender}
                                    setALert={setALert}
                                />
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    const showWishlistItems = () => {
        return (
            <div>
                {
                    wishlist_items &&
                    wishlist_items !== null &&
                    wishlist_items !== undefined &&
                    wishlist_items.length !== 0 &&
                    wishlist_items.map((item: { count: any }, index: Key | null | undefined) => {
                        let count = item.count
                        return (
                            <div key={index}>
                                <WishlistItem
                                    item={item}
                                    count={count}
                                    update_item={update_item}
                                    remove_wishlist_item={remove_wishlist_item}
                                    render={render}
                                    setRender={setRender}
                                    setALert={setALert}
                                />
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    const checkoutButton = () => {
        if (total_items < 1) {
            return (
                <>
                    <Link
                        to='/shop'

                    >
                        <button
                            className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                        >
                            Search items to buy
                        </button>
                    </Link>
                </>
            )
        } else if (!isAuthenticated) {
            return (<>
                <Link
                    to='/login'
                >
                    <button
                        className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                    >
                        Login
                    </button>
                </Link>
            </>)

        } else {
            return (
                <>
                    <Link
                        to='/checkout'>
                        <button
                            className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                        >
                            Checkout
                        </button>
                    </Link>
                </>
            )

        }
    }    

    return (
        <Layout>
            <div className="bg-white">
                <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart Items ({total_items}) </h1>
                    <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
                        <section aria-labelledby="cart-heading" className="lg:col-span-7">
                            <h2 id="cart-heading" className="sr-only">
                                Items in your shopping cart
                            </h2>

                            <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
                                {
                                    showItems()
                                }
                            </ul>
                        </section>

                        {/* Order summary */}
                        <section
                            aria-labelledby="summary-heading"
                            className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
                        >
                            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                                Order summary
                            </h2>

                            <dl className="mt-6 space-y-4">

                                <div className="flex items-center justify-between">
                                    <dt className="text-sm text-gray-600">Subtotal</dt>
                                    <dd className="text-sm font-medium text-gray-900">${compare_amount.toFixed(2)}</dd>
                                </div>


                                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                                    <dt className="flex items-center text-sm text-gray-600">
                                        <span>Shipping estimate</span>
                                        <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">Learn more about how shipping is calculated</span>
                                            <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                                        </a>
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                                </div>

                                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                                    <dt className="flex text-sm text-gray-600">
                                        <span>Tax estimate</span>
                                        <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">Learn more about how tax is calculated</span>
                                            <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                                        </a>
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900">$8.32</dd>
                                </div>

                                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                                    <dt className="text-base font-medium text-gray-900">Order total</dt>
                                    <dd className="text-base font-medium text-gray-900">${amount.toFixed(2)}</dd>
                                </div>
                            </dl>

                            <div className="mt-6">
                                {checkoutButton()}
                            </div>
                        </section>
                    </div>
                    {showWishlistItems()}
                </div>
            </div>
        </Layout>
    )
}

const mapStateToProps = (state: any) => ({
    isAuthenticated: state.Auth.isAuthenticated,
    items: state.Cart.items,
    wishlist_items: state.Wishlist.items,
    amount: state.Cart.amount,
    compare_amount: state.Cart.compare_amount,
    total_items: state.Cart.total_items,
})

export default connect(mapStateToProps, {
    get_item,
    get_total,
    get_item_total,
    remove_item,
    update_item,
    remove_wishlist_item
})(Cart)