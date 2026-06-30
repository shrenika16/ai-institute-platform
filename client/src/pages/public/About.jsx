function About() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold animate-pulse">
            About Our Platform
          </h1>

          <p className="mt-6 text-xl text-blue-100">
            AI-powered education platform for modern learning & management
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

        <div className="bg-white p-6 rounded-2xl shadow hover:scale-105 transition">
          <h2 className="text-3xl font-bold text-blue-600">10K+</h2>
          <p className="text-gray-600">Students</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:scale-105 transition">
          <h2 className="text-3xl font-bold text-blue-600">500+</h2>
          <p className="text-gray-600">Courses</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:scale-105 transition">
          <h2 className="text-3xl font-bold text-blue-600">100+</h2>
          <p className="text-gray-600">Teachers</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:scale-105 transition">
          <h2 className="text-3xl font-bold text-blue-600">24/7</h2>
          <p className="text-gray-600">Support</p>
        </div>

      </section>

      {/* ABOUT TEXT */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14 items-center">

        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Smart Education Management System
          </h2>

          <p className="text-gray-600 leading-8 mb-4">
            We build AI-powered systems to manage education, automate tasks, and improve learning experience.
          </p>

          <p className="text-gray-600 leading-8">
            Our mission is to make education smarter, faster, and more accessible using modern web technologies.
          </p>
        </div>

        <div className="flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
            className="w-[380px] hover:scale-105 transition"
          />
        </div>

      </section>

      {/* TIMELINE */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Our Journey
        </h2>

        <div className="space-y-6 border-l-4 border-blue-600 pl-6">

          <div>
            <h3 className="font-bold text-lg">2024 - Idea Started</h3>
            <p className="text-gray-600">Platform concept was designed for students & institutes.</p>
          </div>

          <div>
            <h3 className="font-bold text-lg">2025 - Development Phase</h3>
            <p className="text-gray-600">Built using React, Django & AI tools.</p>
          </div>

          <div>
            <h3 className="font-bold text-lg">2026 - Launch Stage</h3>
            <p className="text-gray-600">Platform ready for real users and institutes.</p>
          </div>

        </div>
      </section>

      {/* TEAM */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-12">
            Meet Our Team
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="text-center p-6 shadow rounded-2xl hover:scale-105 transition">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                className="w-24 mx-auto mb-4"
              />
              <h3 className="font-bold">Developer</h3>
              <p className="text-gray-600">Frontend & Backend</p>
            </div>

            <div className="text-center p-6 shadow rounded-2xl hover:scale-105 transition">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png"
                className="w-24 mx-auto mb-4"
              />
              <h3 className="font-bold">AI Engineer</h3>
              <p className="text-gray-600">Machine Learning & AI</p>
            </div>

            <div className="text-center p-6 shadow rounded-2xl hover:scale-105 transition">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135823.png"
                className="w-24 mx-auto mb-4"
              />
              <h3 className="font-bold">UI Designer</h3>
              <p className="text-gray-600">Design & UX</p>
            </div>

          </div>

        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">

        <h2 className="text-3xl font-bold mb-10">Achievements</h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-blue-50 p-6 rounded-2xl">
            <h3 className="text-2xl font-bold text-blue-600">🏆 Awarded Project</h3>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl">
            <h3 className="text-2xl font-bold text-blue-600">⭐ Top Internship Project</h3>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl">
            <h3 className="text-2xl font-bold text-blue-600">🚀 Real World Ready</h3>
          </div>

        </div>

      </section>

    </div>
  );
}

export default About;