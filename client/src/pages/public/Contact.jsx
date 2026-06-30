function Contact() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24 px-6 text-center">
        <h1 className="text-5xl font-bold">Contact Us</h1>
        <p className="mt-6 text-xl text-blue-100">
          We would love to hear from you
        </p>
      </section>

      {/* MAIN */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14">

        {/* LEFT */}
        <div>

          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Get In Touch
          </h2>

          <p className="text-gray-600 mb-8 leading-7">
            Contact us for courses, support or partnership opportunities.
          </p>

          {/* CONTACT INFO */}
          <div className="space-y-5">

            <div className="bg-white p-5 rounded-2xl shadow hover:scale-105 transition">
              📧 support@aiplatform.com
            </div>

            <div className="bg-white p-5 rounded-2xl shadow hover:scale-105 transition">
              📞 +91 9876543210
            </div>

            <div className="bg-white p-5 rounded-2xl shadow hover:scale-105 transition">
              📍 India
            </div>

          </div>

          {/* SOCIAL ICONS */}
          <div className="mt-8">
            <h3 className="font-bold text-gray-800 mb-3">Follow Us</h3>

            <div className="flex gap-4 text-blue-600 text-2xl">

              <span className="cursor-pointer hover:scale-125 transition">📘</span>
              <span className="cursor-pointer hover:scale-125 transition">🐦</span>
              <span className="cursor-pointer hover:scale-125 transition">📸</span>
              <span className="cursor-pointer hover:scale-125 transition">💼</span>

            </div>
          </div>

          {/* LIVE SUPPORT */}
          <div className="mt-10 bg-blue-600 text-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold">Live Support</h3>
            <p className="mt-2 text-blue-100">
              Chat with our support team instantly for help.
            </p>

            <button className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-xl font-semibold">
              Start Chat
            </button>
          </div>

        </div>

        {/* RIGHT FORM */}
        <div className="bg-white rounded-3xl shadow-xl p-10">

          <h2 className="text-3xl font-bold mb-8">Send Message</h2>

          <form className="space-y-5">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border p-4 rounded-xl focus:border-blue-500 outline-none"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border p-4 rounded-xl focus:border-blue-500 outline-none"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full border p-4 rounded-xl focus:border-blue-500 outline-none"
            />

            <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition">
              Send Message
            </button>

          </form>

        </div>

      </section>

      {/* MAP SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-center mb-8">
          Find Us
        </h2>

        <div className="rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18..."
            className="w-full h-80"
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-5xl mx-auto px-6 pb-20">

        <h2 className="text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-bold">How can I enroll in courses?</h3>
            <p className="text-gray-600 mt-2">
              You can browse courses and click enroll button.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-bold">Is this platform free?</h3>
            <p className="text-gray-600 mt-2">
              Some courses are free and some are paid.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-bold">Do you provide certificates?</h3>
            <p className="text-gray-600 mt-2">
              Yes, certificates are provided after completion.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Contact;