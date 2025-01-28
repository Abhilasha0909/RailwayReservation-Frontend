import Link from 'next/link';
import SearchForm from '@/components/booking/SearchForm';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section h-[600px] relative flex items-center">
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-6">
              Discover Japan by Rail
            </h1>
            <p className="text-xl mb-8">
              Experience the beauty and efficiency of Japanese railways.
              Book your journey through Japan's most scenic routes.
            </p>
            <Link
              href="/search"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg inline-block text-lg font-semibold transition-colors duration-200"
            >
              Start Your Journey
            </Link>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Search Your Train
            </h2>
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Routes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularRoutes.map((route) => (
              <div
                key={route.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={route.image}
                  alt={route.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{route.title}</h3>
                  <p className="text-gray-600 mb-4">{route.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-semibold">
                      From ¥{route.price.toLocaleString()}
                    </span>
                    <Link
                      href={`/search?from=${route.from}&to=${route.to}`}
                      className="text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      Book Now →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose JR Pass
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const popularRoutes = [
  {
    id: 1,
    title: 'Tokyo to Kyoto',
    description: 'Experience the famous Shinkansen bullet train on this popular route.',
    image: '/images/tokyo-kyoto.jpg',
    price: 13320,
    from: 'Tokyo',
    to: 'Kyoto',
  },
  {
    id: 2,
    title: 'Osaka to Hiroshima',
    description: 'Visit the historic city of Hiroshima from vibrant Osaka.',
    image: '/images/osaka-hiroshima.jpg',
    price: 10010,
    from: 'Osaka',
    to: 'Hiroshima',
  },
  {
    id: 3,
    title: 'Tokyo to Sapporo',
    description: 'Journey to Hokkaido through scenic landscapes.',
    image: '/images/tokyo-sapporo.jpg',
    price: 27240,
    from: 'Tokyo',
    to: 'Sapporo',
  },
];

const features = [
  {
    title: 'Fast & Reliable',
    description: 'Punctual service with high-speed trains.',
    icon: <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>,
  },
  {
    title: 'Easy Booking',
    description: 'Simple and secure online booking process.',
    icon: <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>,
  },
  {
    title: 'Wide Coverage',
    description: 'Extensive network covering all major cities.',
    icon: <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
    </svg>,
  },
  {
    title: '24/7 Support',
    description: 'Round-the-clock customer assistance.',
    icon: <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>,
  },
];