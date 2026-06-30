function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between">

        <div className="md:w-1/2">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
            Smart AI Powered <span className="text-blue-600">Learning Platform</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            Manage students, teachers, courses, assignments, quizzes and AI learning tools in one powerful platform.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg font-semibold transition">
              Get Started
            </button>

            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl text-lg font-semibold hover:bg-blue-50 transition">
              Explore Courses
            </button>
          </div>
        </div>

        <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            alt="Education"
            className="w-[400px]"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-20">

        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <h2 className="text-4xl font-bold text-blue-600">5000+</h2>
          <p className="mt-3 text-gray-600">Active Students</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <h2 className="text-4xl font-bold text-blue-600">120+</h2>
          <p className="mt-3 text-gray-600">Professional Teachers</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <h2 className="text-4xl font-bold text-blue-600">350+</h2>
          <p className="mt-3 text-gray-600">Courses Available</p>
        </div>

      </section>
            {/* Features Section */}

      <section className="bg-white py-20 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <h2 className="text-5xl font-bold text-gray-800">
              Powerful Platform Features
            </h2>

            <p className="mt-4 text-gray-600 text-lg">
              Everything you need to manage your institute smarter with AI.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Card 1 */}
            <div className="bg-blue-50 rounded-3xl p-8 shadow-lg hover:scale-105 transition">

              <div className="text-5xl mb-5">🤖</div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                AI Study Assistant
              </h3>

              <p className="text-gray-600 leading-7">
                Students can ask questions and get instant AI-powered learning support.
              </p>

            </div>

            {/* Card 2 */}
            <div className="bg-indigo-50 rounded-3xl p-8 shadow-lg hover:scale-105 transition">

              <div className="text-5xl mb-5">📊</div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Smart Analytics
              </h3>

              <p className="text-gray-600 leading-7">
                Track student performance, attendance, assignments and progress.
              </p>

            </div>

            {/* Card 3 */}
            <div className="bg-purple-50 rounded-3xl p-8 shadow-lg hover:scale-105 transition">

              <div className="text-5xl mb-5">🔒</div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Secure Authentication
              </h3>

              <p className="text-gray-600 leading-7">
                JWT-based authentication with protected dashboards and user security.
              </p>

            </div>

          </div>

        </div>

      </section>
            {/* Testimonials Section */}

      <section className="py-20 px-6 bg-gradient-to-r from-indigo-50 to-blue-50">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <h2 className="text-5xl font-bold text-gray-800">
              What Students Say
            </h2>

            <p className="mt-4 text-gray-600 text-lg">
              Trusted by thousands of learners and teachers.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Review 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">

              <p className="text-gray-600 leading-7">
                “This platform completely transformed our institute management system.”
              </p>

              <div className="mt-6">
                <h3 className="font-bold text-lg text-gray-800">
                  Rahul Sharma
                </h3>

                <p className="text-gray-500">
                  Student
                </p>
              </div>

            </div>

            {/* Review 2 */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">

              <p className="text-gray-600 leading-7">
                “AI quiz generation and analytics features are amazing and time-saving.”
              </p>

              <div className="mt-6">
                <h3 className="font-bold text-lg text-gray-800">
                  Priya Verma
                </h3>

                <p className="text-gray-500">
                  Teacher
                </p>
              </div>

            </div>

            {/* Review 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">

              <p className="text-gray-600 leading-7">
                “Very modern, responsive and easy to use platform for learning.”
              </p>

              <div className="mt-6">
                <h3 className="font-bold text-lg text-gray-800">
                  Aman Patel
                </h3>

                <p className="text-gray-500">
                  Institute Admin
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>
    </div>
  );
}

export default Home;