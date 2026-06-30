function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-14 px-6">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo */}
        <div>
          <h1 className="text-3xl font-bold text-blue-400">
            AI Platform
          </h1>

          <p className="mt-4 text-gray-400 leading-7">
            Smart AI Powered Institute Management and Learning Platform.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-5">
            Quick Links
          </h2>

          <ul className="space-y-3 text-gray-400">
            <li>Home</li>
            <li>About</li>
            <li>Courses</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h2 className="text-xl font-semibold mb-5">
            Features
          </h2>

          <ul className="space-y-3 text-gray-400">
            <li>AI Study Assistant</li>
            <li>Analytics Dashboard</li>
            <li>Assignments</li>
            <li>Quiz System</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-semibold mb-5">
            Contact
          </h2>

          <ul className="space-y-3 text-gray-400">
            <li>Email: support@aiplatform.com</li>
            <li>Phone: +91 9876543210</li>
            <li>India</li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500">
        © 2026 AI Platform. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;