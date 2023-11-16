import { useState, useEffect } from 'react'
import FeedContainer from '../layouts/FeedContainer'
import Button from '../components/Form/Button'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'


import apiCall from '../services/apiCall'
import Feed from './Feed'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/useAuth'
import useUserData from '../hooks/useUserData'
import LoadingSpinner from '../components/ui/LoadingSpinner'


const Subscription = () => {

    const { user } = useAuth()
    const { userData, loading, error, updatedData, daysLeft }: any = useUserData(user.userId)

    const [clientSecret, setClientSecret] = useState<any>()
    const [stripePromise, setStripePromise] = useState<any>(null)
    const [amount, setAmount] = useState<any>('')



    // page 1
    const [navigate, setNavigate] = useState({
        currentPage: 1,
        amount: null,
        label: null
    })

    const onChange = (key: string, value: any) => {
        setNavigate(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const goBack = () => {
        onChange("currentPage", 1)
    }

    useEffect(() => {
        fetch('http://localhost:3000/payments/config').then(async (r) => {
            const { publishableKey } = await r.json()

            setStripePromise(loadStripe(publishableKey))
        }).catch(err => {
            console.log(err);
        });
    }, [])

    useEffect(() => {

        if (amount) {
            (async () => {
                const res = await apiCall({
                    url: '/payments/create-payment-intent',
                    method: 'POST',
                    data: { amount }
                })
                setClientSecret(res.clientSecret)
            })()

        }
    }, [amount])


    const handleSubscriptionAmount = (price: number, label: string) => {
        if (price) {
            setAmount(price)
            onChange("currentPage", 2)
            onChange('amount', price)
            onChange('label', label)
        }
    }




    return (
        <FeedContainer>

            <div className='w-full flex flex-col items-center'>

                <div className='w-full'>
                    <p className='text-[20px]  rounded-md text-[#855849] py-2 px-3 font-bold'>Activate Account</p>
                </div>

                {
                    navigate.currentPage == 2 ? (
                        <div className='bg-white/60 p-10 rounded-md border border-borderColor shadow-sm max-w-[500px] md:w-[500px]'>
                            {
                                stripePromise && clientSecret && (
                                    <Elements
                                        stripe={stripePromise}
                                        options={{ clientSecret }}
                                    >
                                        <CheckoutForm {...navigate} goBack={goBack} />
                                    </Elements>
                                )
                            }
                        </div>
                    ) : (
                        <div className='flex items-center justify-center py-10 gap-10 flex-wrap'>
                            {
                                loading ? <div className=" grid place-content-center h-full">
                                    <LoadingSpinner />
                                </div> : updatedData.map((c) => (
                                    <Card {...c} daysLeft={daysLeft} OnButtonClick={handleSubscriptionAmount} />
                                ))
                            }
                        </div>
                    )
                }

            </div>


        </FeedContainer >
    )
}

export default Subscription



export function Completion() {
    return (
        <FeedContainer>
            <div className='w-full h-[80vh] flex flex-col items-center'>
                <div className='w-full'>
                    <p className='text-[20px] rounded-md text-[#855849] py-2 px-3 font-bold'>Activate Account</p>
                </div>
                <div className='text-xl font-bold bg-white/80 p-10 border border-borderColor rounded-sm'>Thank you 🎉... Your Account Activated</div>
            </div>
        </FeedContainer>
    )
}


export function Card({ label, price, features, OnButtonClick, isActive, daysLeft }: any) {
    return (
        <div className={`flex flex-col justify-between text-primaryColor min-w-[300px] h-[300px] p-5 bg-white/50 border border-borderColor rounded-md`}>
            <h2 className='text-[25px] font-medium text-[#855849]  text-center py-2 capitalize'>{label}</h2>
            <h2 className='text-[25px] font-bold  text-center'><sup className='text-xs'>₹</sup> {price}</h2>
            <p className='text-xs py-2 leading-relaxed text-secondaryColor text-center'>


                {isActive && (
                    <h1 className='text-xs'><span className='font-bold text-xl text-red-600'>{daysLeft} Days left</span>  <br /> until due payment </h1>
                )}

                {
                    !isActive && <ul>
                        {
                            features.map((item: any) => (
                                <li>{item}</li>
                            ))
                        }
                    </ul>
                }
            </p>
            <Button type={'button'} onClick={!isActive && (() => OnButtonClick(price, label))} title={isActive ? 'Subscribed' : 'Subscribe'} />
        </div>
    )
}




export function CheckoutForm({ goBack, amount, label }: any) {

    const stripe = useStripe()
    const elements = useElements()

    const navigate = useNavigate()


    const [message, setMessage] = useState<string>('')
    const [isProcessing, setIsProcessing] = useState(false)


    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if (!stripe || !elements) return;

        setIsProcessing(true)

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // return_url: `${window.location.origin}/completion`
            },
            redirect: 'if_required'
        });


        if (error) {
            console.log(error);
            setMessage(error.message)
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            try {
                const res = await apiCall({
                    url: '/payments/store-payment-details',
                    method: 'POST',
                    data: { billingCycle: label, charge: { amount }, invoiceId: paymentIntent.id },
                });

                // Handle the API call response if needed
                if (res.invoiceId) {
                    navigate('/completion')
                }
            } catch (apiError) {
                // Handle API call error
                console.error(apiError);
            }
        } else {
            setMessage('Unexpected state');
        }

        setIsProcessing(false)


    }

    return (
        <form onSubmit={handleSubmit}>
            <h1 className='py-4 text-sm text-secondaryColor'>Subscribe to the plan <br /> <span className='font-bold text-xl text-[#9c8147]'>₹{amount}</span> <sup>per {label}</sup></h1>
            <PaymentElement />
            <div className=''>
                <Button title={isProcessing ? 'Processing...' : 'Pay now'} />
                <Button onClick={goBack} title={'Cancel'} outlineOnly />
            </div>

        </form>
    )
}






// const CheckoutForm: React.FC = () => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [paymentError, setPaymentError] = useState<string | null>(null);

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();

//         if (!stripe || !elements) {
//             return;
//         }

//         const cardElement = elements.getElement(CardElement);

//         if (!cardElement) {
//             return;
//         }

//         try {
//             // Call your backend API to create a payment intent
//             const response = await fetch('http://localhost:3000/payments/create-payment-intent', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     amount: 1000, // Replace with the actual amount you want to charge
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to create payment intent');
//             }

//             const { clientSecret } = await response.json();

//             // Confirm the payment on the client side
//             const result = await stripe.confirmCardPayment(clientSecret, {
//                 payment_method: {
//                     card: cardElement,
//                 },
//             });

//             if (result.error) {
//                 setPaymentError(result.error.message);
//             } else {
//                 // Payment succeeded, handle success scenario
//                 console.log('Payment succeeded:', result.paymentIntent);
//             }
//         } catch (error) {
//             console.error('Error processing payment:', error);
//             setPaymentError('Error processing payment. Please try again.');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <CardElement />
//             <button type="submit">Pay now</button>
//             {paymentError && <div style={{ color: 'red' }}>{paymentError}</div>}
//         </form>
//     );
// };

// export { CheckoutForm }