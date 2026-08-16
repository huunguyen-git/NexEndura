'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import OrderReview from './OrderReview';
import { Check } from 'lucide-react';
import { useCartStore } from '@/stores/useCartStore';

export default function CheckoutStepper() {
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingDetails, setShippingDetails] = useState<any>({});
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const { items } = useCartStore();

  const steps = [
    { num: 1, title: 'Shipping' },
    { num: 2, title: 'Payment' },
    { num: 3, title: 'Review' }
  ];

  if (items.length === 0 && currentStep !== 4) { // 4 is completed state internally managed in OrderReview but we shouldn't show stepper if empty anyway
    return (
      <div className="bg-white rounded-3xl p-8 shadow-card border border-gray-50 text-center">
        <h2 className="text-2xl font-black text-gray-900 mb-2">Checkout Error</h2>
        <p className="text-gray-500">Your cart is empty. Please add items before checking out.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Stepper UI */}
      {currentStep < 4 && (
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 rounded-full z-0"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-primary rounded-full z-0 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>

          {steps.map((step) => {
            const isCompleted = currentStep > step.num;
            const isActive = currentStep === step.num;
            
            return (
              <div key={step.num} className="relative z-10 flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-brand-primary text-white scale-110' 
                      : isActive 
                        ? 'bg-brand-primary text-white ring-4 ring-blue-100 scale-110'
                        : 'bg-white border-2 border-gray-200 text-gray-400'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : step.num}
                </div>
                <span className={`absolute top-12 text-sm font-bold transition-colors ${
                  isActive || isCompleted ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Forms */}
      <div className="mt-16">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AddressForm onNext={(details: any) => { setShippingDetails(details); setCurrentStep(2); }} />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PaymentForm onNext={(method: string) => { setPaymentMethod(method); setCurrentStep(3); }} onBack={() => setCurrentStep(1)} />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <OrderReview 
                shippingDetails={shippingDetails}
                paymentMethod={paymentMethod}
                onBack={() => setCurrentStep(2)} 
                onComplete={() => setCurrentStep(4)} 
              />
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              {/* OrderReview handles its own success screen, but we pass currentStep=4 so Stepper doesn't error out */}
              <OrderReview shippingDetails={shippingDetails} paymentMethod={paymentMethod} onBack={() => {}} onComplete={() => {}} forceSuccess={true} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
