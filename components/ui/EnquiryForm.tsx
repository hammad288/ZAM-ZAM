'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { enquirySchema, EnquiryInput } from '@/lib/validations'
import { createEnquiry } from '@/actions/enquiry'
import { generateEnquiryWhatsAppMessage, generateWhatsAppUrl } from '@/lib/utils'
import { Send, MessageCircle, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

const DEPARTURE_CITIES = [
  'Mumbai', 'Delhi', 'Hyderabad', 'Bangalore', 'Chennai', 'Kolkata',
  'Ahmedabad', 'Pune', 'Lucknow', 'Bhopal', 'Nagpur', 'Jaipur',
  'Aurangabad', 'Kozhikode', 'Kochi', 'Other',
]

interface EnquiryFormProps {
  whatsappNumber?: string
  defaultPackage?: string
  defaultService?: 'HAJJ' | 'UMRAH' | 'VISA' | 'HOTEL' | 'OTHER'
  compact?: boolean
}

export function EnquiryForm({
  whatsappNumber = '',
  defaultPackage = '',
  defaultService = 'UMRAH',
  compact = false,
}: EnquiryFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [whatsappUrl, setWhatsappUrl] = useState<string>('')

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema) as any,
    defaultValues: {
      serviceType: defaultService,
      packageName: defaultPackage,
      persons: 1,
    },
  })

  const formValues = watch()

  const onSubmit = async (data: any) => {
    setStatus('loading')
    try {
      const result = await createEnquiry(data)
      if (result.success) {
        setStatus('success')
        // Generate WhatsApp URL
        if (whatsappNumber) {
          const msg = generateEnquiryWhatsAppMessage({
            name: data.name,
            mobile: data.mobile,
            serviceType: data.serviceType,
            packageName: data.packageName,
            persons: data.persons,
            departureCity: data.departureCity,
            travelDate: data.travelDate,
            message: data.message,
          })
          setWhatsappUrl(generateWhatsAppUrl(whatsappNumber, msg))
        }
        reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-10 px-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-9 h-9 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-bold text-emerald-900 mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
          JazakAllah Khair!
        </h3>
        <p className="text-gray-600 mb-6">
          Your enquiry has been received. Our team will contact you shortly, InshaAllah.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Also WhatsApp Us
            </a>
          )}
          <button
            onClick={() => setStatus('idle')}
            className="btn-outline-green"
          >
            Submit Another Enquiry
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {status === 'error' && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-700 text-sm">Something went wrong. Please try again or contact us directly.</p>
        </div>
      )}

      <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
        {/* Name */}
        <div>
          <label className="form-label" htmlFor="enquiry-name">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="enquiry-name"
            type="text"
            className="form-input"
            placeholder="Your full name"
            {...register('name')}
          />
          {errors.name && <p className="form-error">{errors.name.message}</p>}
        </div>

        {/* Mobile */}
        <div>
          <label className="form-label" htmlFor="enquiry-mobile">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            id="enquiry-mobile"
            type="tel"
            className="form-input"
            placeholder="+91 XXXXX XXXXX"
            {...register('mobile')}
          />
          {errors.mobile && <p className="form-error">{errors.mobile.message}</p>}
        </div>

        {/* WhatsApp */}
        <div>
          <label className="form-label" htmlFor="enquiry-whatsapp">
            WhatsApp Number
          </label>
          <input
            id="enquiry-whatsapp"
            type="tel"
            className="form-input"
            placeholder="Same as mobile or different"
            {...register('whatsapp')}
          />
          {errors.whatsapp && <p className="form-error">{errors.whatsapp.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="form-label" htmlFor="enquiry-email">
            Email Address
          </label>
          <input
            id="enquiry-email"
            type="email"
            className="form-input"
            placeholder="your@email.com"
            {...register('email')}
          />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>

        {/* Service Type */}
        <div>
          <label className="form-label" htmlFor="enquiry-service">
            Service <span className="text-red-500">*</span>
          </label>
          <select id="enquiry-service" className="form-input" {...register('serviceType')}>
            <option value="UMRAH">Umrah Package</option>
            <option value="HAJJ">Hajj Package</option>
            <option value="VISA">Visa Assistance</option>
            <option value="HOTEL">Hotel Booking</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* Package */}
        <div>
          <label className="form-label" htmlFor="enquiry-package">
            Package Name
          </label>
          <input
            id="enquiry-package"
            type="text"
            className="form-input"
            placeholder="Package you're interested in"
            {...register('packageName')}
          />
        </div>

        {/* Persons */}
        <div>
          <label className="form-label" htmlFor="enquiry-persons">
            Number of Persons <span className="text-red-500">*</span>
          </label>
          <input
            id="enquiry-persons"
            type="number"
            min={1}
            max={50}
            className="form-input"
            {...register('persons', { valueAsNumber: true })}
          />
          {errors.persons && <p className="form-error">{errors.persons.message}</p>}
        </div>

        {/* Departure City */}
        <div>
          <label className="form-label" htmlFor="enquiry-city">
            Departure City
          </label>
          <select id="enquiry-city" className="form-input" {...register('departureCity')}>
            <option value="">Select city</option>
            {DEPARTURE_CITIES.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Travel Date - full width */}
        <div className="sm:col-span-2">
          <label className="form-label" htmlFor="enquiry-date">
            Preferred Travel Date / Month
          </label>
          <input
            id="enquiry-date"
            type="text"
            className="form-input"
            placeholder="e.g. March 2025, Ramzan 2025, Flexible"
            {...register('travelDate')}
          />
        </div>

        {/* Message - full width */}
        <div className="sm:col-span-2">
          <label className="form-label" htmlFor="enquiry-message">
            Message / Special Requirements
          </label>
          <textarea
            id="enquiry-message"
            rows={4}
            className="form-input resize-none"
            placeholder="Any special requirements, questions, or additional information..."
            {...register('message')}
          />
          {errors.message && <p className="form-error">{errors.message.message}</p>}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-gray-500 leading-relaxed">
        * By submitting this form, you agree to be contacted by our team regarding your Hajj/Umrah enquiry.
        We do not guarantee visa approval as this is at the discretion of Saudi Arabian authorities.
      </p>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary flex-1 justify-center py-3 text-base"
          style={{ background: 'linear-gradient(135deg, #022c22 0%, #065f46 100%)' }}
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Submit Enquiry
            </>
          )}
        </button>

        {whatsappNumber && (
          <a
            href={generateWhatsAppUrl(
              whatsappNumber,
              generateEnquiryWhatsAppMessage({
                name: formValues.name || 'Potential Customer',
                mobile: formValues.mobile || 'Not provided',
                serviceType: formValues.serviceType || 'UMRAH',
                packageName: formValues.packageName,
                persons: formValues.persons || 1,
                departureCity: formValues.departureCity,
                travelDate: formValues.travelDate,
                message: formValues.message,
              })
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp justify-center py-3 text-base"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp Instead
          </a>
        )}
      </div>
    </form>
  )
}
