import React, { useState, useEffect } from 'react';

const Login = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    'https://via.placeholder.com/600x800?text=Slide+1',
    'https://via.placeholder.com/600x800?text=Slide+2',
    'https://via.placeholder.com/600x800?text=Slide+3',
    'https://via.placeholder.com/600x800?text=Slide+4',
  ];

  // Automatically slide every 3 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(slideInterval);
  }, [currentIndex, images.length]);

  // Manually switch slides
  const showSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg flex max-w-4xl mx-auto w-full">
        
        {/* Sliding Image Section */}
        <div className="w-1/2 bg-[#7b2b41] rounded-l-lg relative">
          <div className="h-full w-full">
            <div className="w-full h-full overflow-hidden relative">
              <div
                className="flex transition-all duration-500 ease-in-out w-full h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    className="w-full h-full object-cover"
                    alt={`Slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            {/* Pagination Dots */}
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 ${currentIndex === index ? 'bg-gray-800' : 'bg-white'} rounded-full cursor-pointer`}
                  onClick={() => showSlide(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Login Form Section */}
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-[#7b2b41] text-center mb-6">Welcome to TakeYourTicket</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username or Email
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7b2b41]"
                placeholder="David Brooks"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7b2b41]"
                placeholder="********"
              />
              <a
                href="#"
                className="text-sm text-[#7b2b41] mt-2 inline-block"
              >
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#7b2b41] text-white rounded-lg font-semibold text-lg hover:bg-[#641f34]"
            >
              Sign in
            </button>
          </form>
          <div className="flex items-center justify-center mt-4">
            <span className="border-t w-1/3 border-gray-300"></span>
            <span className="mx-4 text-gray-500">or</span>
            <span className="border-t w-1/3 border-gray-300"></span>
          </div>
          <button className="flex items-center justify-center w-full py-3 mt-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              alt="Google logo"
              className="w-5 h-5 mr-2"
            />
            Sign in with Google
          </button>
          <p className="text-sm text-center mt-6 text-gray-500">
            Don't have an account?{' '}
            <a href="#" className="text-[#7b2b41] font-semibold">
              Create Account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
