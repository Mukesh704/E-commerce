import Slider from 'react-slick';
import ProductCard from '../products/ProductCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 600,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  arrows: true,
  responsive: [
    {
      breakpoint: 1280,
      settings: { slidesToShow: 3 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: 1 },
    },
  ],
};

const WishlistSliderSection = ({ wishlistProducts, navigate }) => {
  return (
    <div className="py-14 bg-white">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800 relative inline-block pl-2">
            <span className="relative z-10">Wishlist</span>
            <span className="absolute bottom-0 left-2 w-2/5 h-1 bg-red-600 rounded z-0"></span>
          </h2>

          {wishlistProducts.length > 0 && (
            <button
              onClick={() => navigate('/wishlist')}
              className="text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-gray-300 hover:text-black transition"
            >
              See All
            </button>
          )}
        </div>

        {wishlistProducts.length === 0 ? (
          <p className="text-gray-500 text-center">You have no items in your wishlist.</p>
        ) : (
          <div className="pl-8">
            <Slider {...sliderSettings}>
              {wishlistProducts.map((product) => (
                <div key={product._id} className="px-2">
                  <div className="max-w-[260px] mx-auto">
                    <ProductCard product={product} />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistSliderSection;