// ============================================================
// ZAMZAM TOURS & TRAVELS — Prisma Seed Script
// DEMO DATA — clearly marked, all editable from Admin panel
// ============================================================

import { PrismaClient, HajjCategory, UmrahType, HotelCity, GalleryCategory, FAQCategory, EnquiryStatus, ServiceType } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // ============================================================
  // 1. ADMIN USER
  // ============================================================
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || 'Admin@123456',
    12
  )

  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@zamzamtours.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@zamzamtours.com',
      name: 'ZAM ZAM Admin',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  })
  console.log('✅ Admin user created')

  // ============================================================
  // 2. WEBSITE SETTINGS — DEMO DATA (edit from Admin > Settings)
  // ============================================================
  const settings = [
    // Contact
    { key: 'phone', value: '+91 97120 57888 / +91 97124 57888', label: 'Phone Number', group: 'contact' },
    { key: 'phone_display', value: '+91 97120 57888 / +91 97124 57888', label: 'Phone (Display)', group: 'contact' },
    { key: 'whatsapp', value: '919712457888', label: 'WhatsApp Number (with country code, no +)', group: 'contact' },
    { key: 'email', value: 'Zamzamtours@gmail.com', label: 'Email Address', group: 'contact' },
    { key: 'email_secondary', value: 'Zamzamtours@gmail.com', label: 'Secondary Email', group: 'contact' },
    { key: 'address', value: '08 Ground Floor, Daskroi Chambers, Opp. Petrol Pump, Khamasa, Ahmedabad - 380001, Gujarat', label: 'Office Address', group: 'contact' },
    { key: 'city', value: 'Ahmedabad', label: 'City', group: 'contact' },
    { key: 'state', value: 'Gujarat', label: 'State', group: 'contact' },
    // Social
    { key: 'facebook', value: 'https://facebook.com/zamzamtours', label: 'Facebook URL', group: 'social' },
    { key: 'instagram', value: 'https://instagram.com/zamzamtours', label: 'Instagram URL', group: 'social' },
    { key: 'youtube', value: 'https://youtube.com/@zamzamtours', label: 'YouTube URL', group: 'social' },
    { key: 'twitter', value: '', label: 'Twitter/X URL', group: 'social' },
    // Hero
    { key: 'hero_title', value: 'Your Journey to the Holy Land Begins Here', label: 'Hero Title', group: 'hero' },
    { key: 'hero_subtitle', value: 'Trusted Hajj & Umrah Services Since 1996', label: 'Hero Subtitle', group: 'hero' },
    { key: 'hero_badge', value: 'Since 1996 · Trusted · Experienced', label: 'Hero Badge Text', group: 'hero' },
    // Footer
    { key: 'footer_tagline', value: 'Your trusted partner for Hajj & Umrah since 1996. Serving pilgrims with devotion and excellence.', label: 'Footer Tagline', group: 'footer' },
    { key: 'footer_copyright', value: '© 2024 ZAM ZAM Tours & Travels. All rights reserved.', label: 'Footer Copyright', group: 'footer' },
    // Policies (editable rich text)
    {
      key: 'privacy_policy',
      value: `<h2>Privacy Policy</h2>
<p>ZAM ZAM Tours & Travels is committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data.</p>
<h3>Information We Collect</h3>
<p>We collect information you provide directly to us, such as when you make an enquiry, including your name, mobile number, WhatsApp number, email address, and travel preferences.</p>
<h3>How We Use Your Information</h3>
<p>We use the information to process your enquiries, communicate about packages and services, and provide customer support.</p>
<h3>Contact Us</h3>
<p>For privacy-related questions, please contact us at Zamzamtours@gmail.com.</p>
<p><em>[PLACEHOLDER — Update this policy with your actual privacy policy]</em></p>`,
      label: 'Privacy Policy Content',
      group: 'policy',
    },
    {
      key: 'terms_conditions',
      value: `<h2>Terms & Conditions</h2>
<p>By using the services of ZAM ZAM Tours & Travels, you agree to the following terms and conditions.</p>
<h3>Booking & Payment</h3>
<p>All bookings are subject to availability. A deposit is required to confirm your booking. Full payment must be made as per the schedule communicated at time of booking.</p>
<h3>Visa</h3>
<p>While we assist with visa applications, we do not guarantee visa approval as this is at the sole discretion of Saudi Arabian authorities.</p>
<h3>General</h3>
<p>ZAM ZAM Tours & Travels reserves the right to modify packages, dates, or prices due to unforeseen circumstances.</p>
<p><em>[PLACEHOLDER — Update with your actual terms and conditions]</em></p>`,
      label: 'Terms & Conditions Content',
      group: 'policy',
    },
    {
      key: 'cancellation_policy',
      value: `<h2>Cancellation Policy</h2>
<p>We understand that plans may change. Please read our cancellation policy carefully before booking.</p>
<h3>Cancellation by Customer</h3>
<ul>
<li>60+ days before departure: [PLACEHOLDER]% of total amount refundable</li>
<li>30–59 days before departure: [PLACEHOLDER]% of total amount refundable</li>
<li>15–29 days before departure: [PLACEHOLDER]% of total amount refundable</li>
<li>Less than 15 days: No refund</li>
</ul>
<h3>Cancellation by ZAM ZAM Tours & Travels</h3>
<p>In the rare event that we need to cancel a package, a full refund will be provided or an alternative package offered.</p>
<p><em>[PLACEHOLDER — Update with your actual cancellation policy]</em></p>`,
      label: 'Cancellation Policy Content',
      group: 'policy',
    },
  ]

  for (const setting of settings) {
    await prisma.websiteSettings.upsert({
      where: { key: setting.key },
      update: { value: setting.value, label: setting.label, group: setting.group },
      create: setting,
    })
  }
  console.log('✅ Website settings seeded')

  // ============================================================
  // 3. HAJJ PACKAGES — DEMO DATA
  // ============================================================
  const hajjPackages = [
    {
      name: 'Economy Hajj Package 2025',
      slug: 'economy-hajj-2025',
      category: HajjCategory.ECONOMY,
      price: 285000,
      currency: 'INR',
      duration: 40,
      departureDate: new Date('2025-05-20'),
      returnDate: new Date('2025-06-28'),
      departureCity: 'Mumbai',
      airline: 'Air India / Saudi Airlines',
      makkahHotel: '[DEMO] Al Masa Hotel, Makkah',
      makkahHotelDistance: '800m from Masjid al-Haram',
      makkahNights: 25,
      madinahHotel: '[DEMO] Al Ansar Hotel, Madinah',
      madinahHotelDistance: '500m from Masjid an-Nabawi',
      madinahNights: 8,
      description: 'Our Economy Hajj Package 2025 is designed for pilgrims seeking a spiritually fulfilling Hajj experience at an affordable price. All essential services are included to ensure a comfortable and hassle-free pilgrimage. [DEMO — Update this description from the Admin panel]',
      inclusions: [
        'Return airfare from Mumbai',
        'Saudi Arabia Hajj visa assistance',
        'Hotel accommodation in Makkah (25 nights)',
        'Hotel accommodation in Madinah (8 nights)',
        'Mina tent accommodation during Hajj days',
        'Air-conditioned transport in Saudi Arabia',
        'Experienced group leader & guide',
        'Travel kit (ihram, bag, etc.)',
        'Ziyarat in Makkah & Madinah',
      ],
      exclusions: [
        'Personal expenses',
        'Meals (unless specified)',
        'Laundry services',
        'Additional ziyarat',
        'Travel insurance',
        'Currency exchange charges',
      ],
      mealsIncluded: false,
      visaIncluded: true,
      transportIncluded: true,
      ziyaratIncluded: true,
      laundryIncluded: false,
      travelKitIncluded: true,
      groupLeaderIncluded: true,
      cancellationPolicy: 'Standard cancellation policy applies. Please refer to our Cancellation Policy page.',
      terms: 'All bookings subject to availability. Visa not guaranteed.',
      images: [],
      featured: true,
      published: true,
    },
    {
      name: 'Premium Hajj Package 2025',
      slug: 'premium-hajj-2025',
      category: HajjCategory.PREMIUM,
      price: 450000,
      currency: 'INR',
      duration: 42,
      departureDate: new Date('2025-05-18'),
      returnDate: new Date('2025-06-28'),
      departureCity: 'Mumbai',
      airline: 'Saudi Airlines',
      makkahHotel: '[DEMO] Swissôtel Makkah or similar 5-star',
      makkahHotelDistance: '200m from Masjid al-Haram',
      makkahNights: 27,
      madinahHotel: '[DEMO] Anwar Al Madinah Mövenpick or similar 5-star',
      madinahHotelDistance: '100m from Masjid an-Nabawi',
      madinahNights: 8,
      description: 'Our Premium Hajj Package 2025 offers an elevated pilgrimage experience with 5-star accommodations in close proximity to the holy mosques. Ideal for those who seek comfort and convenience during this sacred journey. [DEMO — Update from Admin panel]',
      inclusions: [
        'Return airfare from Mumbai (Business class available on request)',
        'Saudi Arabia Hajj visa assistance',
        '5-Star hotel accommodation in Makkah (27 nights)',
        '5-Star hotel accommodation in Madinah (8 nights)',
        'Premium Mina tent accommodation',
        'Private air-conditioned transport',
        'Dedicated experienced group leader & religious guide',
        'Premium travel kit',
        'Comprehensive Ziyarat in Makkah & Madinah',
        'Daily breakfast & dinner',
        'Laundry service',
      ],
      exclusions: [
        'Personal expenses',
        'Lunch',
        'Travel insurance',
        'Currency exchange charges',
        'Additional optional tours',
      ],
      mealsIncluded: true,
      visaIncluded: true,
      transportIncluded: true,
      ziyaratIncluded: true,
      laundryIncluded: true,
      travelKitIncluded: true,
      groupLeaderIncluded: true,
      cancellationPolicy: 'Standard cancellation policy applies. Please refer to our Cancellation Policy page.',
      terms: 'All bookings subject to availability. Visa not guaranteed.',
      images: [],
      featured: true,
      published: true,
    },
  ]

  for (const pkg of hajjPackages) {
    await prisma.hajjPackage.upsert({
      where: { slug: pkg.slug },
      update: pkg,
      create: pkg,
    })
  }
  console.log('✅ Hajj packages seeded')

  // ============================================================
  // 4. UMRAH PACKAGES — DEMO DATA
  // ============================================================
  const umrahPackages = [
    {
      name: 'Economy Umrah Package — 14 Nights',
      slug: 'economy-umrah-14-nights',
      umrahType: UmrahType.ECONOMY,
      isRamzan: false,
      isFamilyPackage: false,
      price: 85000,
      currency: 'INR',
      duration: 14,
      departureCity: 'Mumbai',
      airline: 'Air India / Saudi Airlines',
      makkahHotel: '[DEMO] Ajyad Makkah Hotel or similar',
      makkahHotelDistance: '700m from Masjid al-Haram',
      makkahNights: 7,
      madinahHotel: '[DEMO] Al Haram Hotel, Madinah',
      madinahHotelDistance: '600m from Masjid an-Nabawi',
      madinahNights: 4,
      description: 'Our 14-night Economy Umrah Package is perfect for pilgrims seeking an affordable yet complete Umrah experience. All essential services included. [DEMO — Update from Admin panel]',
      inclusions: [
        'Return airfare',
        'Saudi Umrah visa assistance',
        'Hotel in Makkah (7 nights)',
        'Hotel in Madinah (4 nights)',
        'Air-conditioned transport',
        'Group leader',
        'Travel kit',
        'Ziyarat in Makkah & Madinah',
      ],
      exclusions: [
        'Meals',
        'Personal expenses',
        'Laundry',
        'Travel insurance',
      ],
      mealsIncluded: false,
      visaIncluded: true,
      transportIncluded: true,
      ziyaratIncluded: true,
      laundryIncluded: false,
      travelKitIncluded: true,
      groupLeaderIncluded: true,
      cancellationPolicy: 'Standard cancellation policy applies.',
      terms: 'All bookings subject to availability. Visa not guaranteed.',
      images: [],
      featured: true,
      published: true,
    },
    {
      name: 'Premium Umrah Package — 21 Nights',
      slug: 'premium-umrah-21-nights',
      umrahType: UmrahType.PREMIUM,
      isRamzan: false,
      isFamilyPackage: false,
      price: 145000,
      currency: 'INR',
      duration: 21,
      departureCity: 'Mumbai',
      airline: 'Saudi Airlines',
      makkahHotel: '[DEMO] Hilton Suites Makkah or similar 5-star',
      makkahHotelDistance: '300m from Masjid al-Haram',
      makkahNights: 12,
      madinahHotel: '[DEMO] Pullman Zamzam Madinah or similar 5-star',
      madinahHotelDistance: '200m from Masjid an-Nabawi',
      madinahNights: 6,
      description: 'Our Premium 21-night Umrah package offers a luxurious pilgrimage experience with premium hotels close to the Haramain. [DEMO — Update from Admin panel]',
      inclusions: [
        'Return airfare',
        'Saudi Umrah visa assistance',
        '5-Star hotel in Makkah (12 nights)',
        '5-Star hotel in Madinah (6 nights)',
        'Private air-conditioned transport',
        'Dedicated group leader & guide',
        'Premium travel kit',
        'Comprehensive Ziyarat',
        'Daily breakfast',
        'Laundry service',
      ],
      exclusions: [
        'Lunch & dinner (except breakfast)',
        'Personal expenses',
        'Travel insurance',
      ],
      mealsIncluded: true,
      visaIncluded: true,
      transportIncluded: true,
      ziyaratIncluded: true,
      laundryIncluded: true,
      travelKitIncluded: true,
      groupLeaderIncluded: true,
      cancellationPolicy: 'Standard cancellation policy applies.',
      terms: 'All bookings subject to availability. Visa not guaranteed.',
      images: [],
      featured: true,
      published: true,
    },
    {
      name: 'Ramzan Umrah Special Package',
      slug: 'ramzan-umrah-special',
      umrahType: UmrahType.RAMZAN_SPECIAL,
      isRamzan: true,
      isFamilyPackage: false,
      price: 165000,
      currency: 'INR',
      duration: 15,
      departureCity: 'Mumbai',
      airline: 'Saudi Airlines',
      makkahHotel: '[DEMO] Grand Hyatt Makkah or similar 5-star',
      makkahHotelDistance: '400m from Masjid al-Haram',
      makkahNights: 10,
      madinahHotel: '[DEMO] Oberoi Madinah or similar 5-star',
      madinahHotelDistance: '300m from Masjid an-Nabawi',
      madinahNights: 3,
      description: 'Perform Umrah in the blessed month of Ramzan. This special package is designed to maximize your spiritual experience during the holiest month of the year. [DEMO — Update from Admin panel]',
      inclusions: [
        'Return airfare',
        'Saudi Umrah visa assistance',
        '5-Star hotel in Makkah (10 nights)',
        '5-Star hotel in Madinah (3 nights)',
        'Air-conditioned transport',
        'Group leader & religious guide',
        'Premium travel kit',
        'Ziyarat in Makkah & Madinah',
        'Suhoor & Iftar arrangements',
      ],
      exclusions: [
        'Lunch',
        'Personal expenses',
        'Travel insurance',
        'Currency exchange',
      ],
      mealsIncluded: true,
      visaIncluded: true,
      transportIncluded: true,
      ziyaratIncluded: true,
      laundryIncluded: false,
      travelKitIncluded: true,
      groupLeaderIncluded: true,
      cancellationPolicy: 'Ramzan packages have stricter cancellation terms. Please contact us.',
      terms: 'All bookings subject to availability. Visa not guaranteed.',
      images: [],
      featured: true,
      published: true,
    },
    {
      name: 'Family Umrah Package',
      slug: 'family-umrah-package',
      umrahType: UmrahType.FAMILY,
      isRamzan: false,
      isFamilyPackage: true,
      price: 320000,
      currency: 'INR',
      duration: 14,
      departureCity: 'Mumbai',
      airline: 'Air India / Saudi Airlines',
      makkahHotel: '[DEMO] Swissôtel Makkah or similar (family rooms)',
      makkahHotelDistance: '200m from Masjid al-Haram',
      makkahNights: 7,
      madinahHotel: '[DEMO] Anwar Al Madinah Mövenpick or similar',
      madinahHotelDistance: '150m from Masjid an-Nabawi',
      madinahNights: 4,
      description: 'Our Family Umrah Package is specially designed for families, offering comfortable family suites and child-friendly arrangements. Price is for a family of 4. [DEMO — Update from Admin panel]',
      inclusions: [
        'Return airfare for family of 4',
        'Saudi Umrah visa for all family members',
        'Family suite/rooms in Makkah (7 nights)',
        'Family suite/rooms in Madinah (4 nights)',
        'Air-conditioned transport',
        'Dedicated group leader',
        'Travel kits for all family members',
        'Ziyarat',
      ],
      exclusions: [
        'Meals',
        'Personal expenses',
        'Laundry',
        'Travel insurance',
        'Extra children (above 4 family members)',
      ],
      mealsIncluded: false,
      visaIncluded: true,
      transportIncluded: true,
      ziyaratIncluded: true,
      laundryIncluded: false,
      travelKitIncluded: true,
      groupLeaderIncluded: true,
      cancellationPolicy: 'Standard cancellation policy applies.',
      terms: 'Price is for family of 4 (2 adults + 2 children under 12). Contact us for custom family sizes.',
      images: [],
      featured: false,
      published: true,
    },
  ]

  for (const pkg of umrahPackages) {
    await prisma.umrahPackage.upsert({
      where: { slug: pkg.slug },
      update: pkg,
      create: pkg,
    })
  }
  console.log('✅ Umrah packages seeded')

  // ============================================================
  // 5. HOTELS — DEMO DATA
  // ============================================================
  const hotels = [
    {
      name: '[DEMO] Swissôtel Makkah',
      slug: 'swissotel-makkah',
      city: HotelCity.MAKKAH,
      category: 5,
      description: 'One of the most prestigious hotels in Makkah, located within the Abraj Al-Bait complex with direct views of the Masjid al-Haram. [DEMO — Update from Admin panel]',
      distance: '50m from Masjid al-Haram',
      address: 'Abraj Al-Bait, Makkah, Saudi Arabia',
      amenities: ['WiFi', 'Restaurant', 'Room Service', 'Concierge', 'Prayer Room', 'Laundry'],
      images: [],
      featured: true,
      published: true,
      sortOrder: 1,
    },
    {
      name: '[DEMO] Hilton Suites Makkah',
      slug: 'hilton-suites-makkah',
      city: HotelCity.MAKKAH,
      category: 5,
      description: 'Luxurious suites with stunning views of the Grand Mosque. Perfect for pilgrims seeking comfort and proximity to Masjid al-Haram. [DEMO]',
      distance: '300m from Masjid al-Haram',
      address: 'Ibrahim Al-Khalil Street, Makkah, Saudi Arabia',
      amenities: ['WiFi', 'Restaurant', 'Buffet Breakfast', 'Room Service', 'Concierge', 'Gym'],
      images: [],
      featured: true,
      published: true,
      sortOrder: 2,
    },
    {
      name: '[DEMO] Pullman Zamzam Madinah',
      slug: 'pullman-zamzam-madinah',
      city: HotelCity.MADINAH,
      category: 5,
      description: 'A landmark hotel in Madinah offering magnificent views of Masjid an-Nabawi. World-class amenities and exceptional service. [DEMO]',
      distance: '200m from Masjid an-Nabawi',
      address: 'King Abdullah Road, Madinah, Saudi Arabia',
      amenities: ['WiFi', 'Restaurant', 'Room Service', 'Concierge', 'Prayer Room', 'Buffet'],
      images: [],
      featured: true,
      published: true,
      sortOrder: 1,
    },
    {
      name: '[DEMO] Anwar Al Madinah Mövenpick',
      slug: 'anwar-al-madinah-movenpick',
      city: HotelCity.MADINAH,
      category: 5,
      description: 'Premium hotel directly adjacent to Masjid an-Nabawi, offering unparalleled access to the Prophet\'s mosque. [DEMO]',
      distance: '100m from Masjid an-Nabawi',
      address: 'Madinah, Saudi Arabia',
      amenities: ['WiFi', 'Multiple Restaurants', 'Room Service', 'Concierge', 'Laundry', 'Business Center'],
      images: [],
      featured: false,
      published: true,
      sortOrder: 2,
    },
  ]

  for (const hotel of hotels) {
    await prisma.hotel.upsert({
      where: { slug: hotel.slug },
      update: hotel,
      create: hotel,
    })
  }
  console.log('✅ Hotels seeded')

  // ============================================================
  // 6. TESTIMONIALS — DEMO DATA
  // ============================================================
  const testimonials = [
    {
      name: 'Mohammed Raza Khan',
      designation: 'Hajj Pilgrim 2023',
      city: 'Mumbai',
      content: 'Alhamdulillah, our Hajj experience with ZAM ZAM Tours was exceptional. The team was extremely professional and caring throughout our journey. From the moment we left Mumbai to our return, everything was well-organized. Highly recommend them to anyone planning their Hajj. [DEMO — Replace with real testimonial]',
      rating: 5,
      published: true,
      sortOrder: 1,
    },
    {
      name: 'Fatima Begum',
      designation: 'Umrah Pilgrim 2024',
      city: 'Pune',
      content: 'We performed Umrah with ZAM ZAM Tours and the experience was wonderful. The hotels were excellent and close to Haram. Our group leader was knowledgeable and patient. The visa process was smooth. JazakAllah khair! [DEMO — Replace with real testimonial]',
      rating: 5,
      published: true,
      sortOrder: 2,
    },
    {
      name: 'Abdul Karim Shaikh',
      designation: 'Umrah Pilgrim 2023',
      city: 'Nashik',
      content: 'This was our second time using ZAM ZAM Tours for Umrah, and they continue to deliver excellent service. The team is responsive, the arrangements are top-notch, and the prices are reasonable. Will continue to use their services. [DEMO — Replace with real testimonial]',
      rating: 5,
      published: true,
      sortOrder: 3,
    },
    {
      name: 'Salma Patel',
      designation: 'Ramzan Umrah 2024',
      city: 'Mumbai',
      content: 'We did the Ramzan Umrah package and SubhanAllah, it was a life-changing experience. ZAM ZAM Tours made every arrangement perfectly. The Suhoor and Iftar arrangements were excellent. May Allah accept our Umrah. [DEMO]',
      rating: 5,
      published: true,
      sortOrder: 4,
    },
  ]

  for (let i = 0; i < testimonials.length; i++) {
    const t = testimonials[i]
    await prisma.testimonial.create({ data: t }).catch(() => {})
  }
  console.log('✅ Testimonials seeded')

  // ============================================================
  // 7. FAQS — DEMO DATA
  // ============================================================
  const faqs = [
    {
      question: 'How do I book a Hajj or Umrah package?',
      answer: 'You can book by filling out the Enquiry Form on our website, calling us directly, or visiting our office. Our team will guide you through the entire booking process and answer all your questions.',
      category: FAQCategory.GENERAL,
      sortOrder: 1,
      published: true,
    },
    {
      question: 'What documents are required for Umrah visa?',
      answer: 'Generally required documents include: Valid passport (minimum 6 months validity), recent passport-sized photographs, completed visa application form, vaccination certificates (meningitis, COVID-19), and for women under 45 — proof of mahram or group arrangement. Requirements may change, please contact us for the latest requirements.',
      category: FAQCategory.VISA,
      sortOrder: 2,
      published: true,
    },
    {
      question: 'Is the Hajj/Umrah visa guaranteed?',
      answer: 'No. While we assist fully with the visa application process and ensure all documents are correctly submitted, visa issuance is at the sole discretion of Saudi Arabian authorities. We strongly advise not making any other travel arrangements until the visa is confirmed.',
      category: FAQCategory.VISA,
      sortOrder: 3,
      published: true,
    },
    {
      question: 'What is the best time to perform Umrah?',
      answer: 'Umrah can be performed at any time of the year. However, the most spiritually rewarding time is during Ramzan. If you prefer less crowds, mid-year months (excluding Hajj season) are ideal. Each season has its own blessings.',
      category: FAQCategory.UMRAH,
      sortOrder: 4,
      published: true,
    },
    {
      question: 'What does the travel kit include?',
      answer: 'Our standard travel kit typically includes: Ihram set (for men), a travel bag, essential duas & guide booklet, ZAM ZAM ID lanyard, and basic travel essentials. Premium packages include upgraded kits with additional items.',
      category: FAQCategory.GENERAL,
      sortOrder: 5,
      published: true,
    },
    {
      question: 'Can women travel without a Mahram?',
      answer: 'Saudi regulations for women travelling without a Mahram have been updated. Women of certain age groups may be able to travel in groups. Please contact us for the latest regulations and how we can assist with the necessary documentation.',
      category: FAQCategory.GENERAL,
      sortOrder: 6,
      published: true,
    },
    {
      question: 'What is the difference between Hajj and Umrah?',
      answer: 'Hajj is the major pilgrimage that is an obligatory duty (fard) for every Muslim who is physically and financially able, performed during specific days in the Islamic month of Dhul-Hijja. Umrah is a voluntary (nafl) pilgrimage that can be performed at any time of the year.',
      category: FAQCategory.GENERAL,
      sortOrder: 7,
      published: true,
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept bank transfers (NEFT/RTGS/IMPS), cheque payments, and online payments. Please contact us for payment details. We recommend making payments through official bank channels for your security.',
      category: FAQCategory.PAYMENT,
      sortOrder: 8,
      published: true,
    },
  ]

  for (const faq of faqs) {
    await prisma.fAQ.create({ data: faq }).catch(() => {})
  }
  console.log('✅ FAQs seeded')

  // ============================================================
  // 8. DEMO ENQUIRY (for admin UI testing)
  // ============================================================
  await prisma.enquiry.create({
    data: {
      name: 'Demo Enquiry (Test)',
      mobile: '+91-9999999999',
      whatsapp: '+919999999999',
      email: 'demo@test.com',
      serviceType: ServiceType.UMRAH,
      packageName: 'Economy Umrah Package — 14 Nights',
      persons: 2,
      departureCity: 'Mumbai',
      travelDate: 'March 2025',
      message: 'This is a demo enquiry for testing the admin panel. Please delete or update this.',
      status: EnquiryStatus.NEW,
    },
  }).catch(() => {})
  console.log('✅ Demo enquiry seeded')

  console.log('\n🎉 Database seeded successfully!')
  console.log('📝 Note: All data marked [DEMO] should be updated from the Admin panel.')
  console.log('🔐 Admin login: admin@zamzamtours.com / Admin@123456')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
