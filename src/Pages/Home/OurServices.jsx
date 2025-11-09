const services = [
  {
    title: "Cleaning",
    image: "https://images.unsplash.com/photo-1581579181873-c0f1b06e8fa2",
    description: "Expert home and office cleaning services to keep your space spotless."
  },
  {
    title: "Plumbing",
    image: "https://images.unsplash.com/photo-1590080878232-71d6f204f0e3",
    description: "Reliable plumbing services for leak repairs, pipe installation, and maintenance."
  },
  {
    title: "Electrical",
    image: "https://images.unsplash.com/photo-1581090700227-1f7b9c05ef4a",
    description: "Professional electrical services including wiring, repairs, and installations."
  },
  {
    title: "Painting",
    image: "https://images.unsplash.com/photo-1591012911209-2b6c0f3220f2",
    description: "Quality interior and exterior painting services for homes and offices."
  }
];

const OurServices = () => {
  return (
    <section className="section-margin">
        <h2 className="section-title">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-secondary/10 rounded-lg shadow-lg overflow-hidden flex flex-col"
            >
             
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-gray-600 flex-1">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Info Block */}
        <div className="mt-12 bg-linear-to-r from-primary to-secondary text-white rounded-lg p-8 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Get in Touch</h3>
            <p className="mb-1">📞 Phone: +880 1234 567890</p>
            <p className="mb-1">✉️ Email: info@homehero.com</p>
            <p>🏠 Address: 123, Example Street, Dhaka, Bangladesh</p>
          </div>
          <div>
            <a
              href="mailto:info@yourbusiness.com"
              className="btns"
            >
              Contact Us
            </a>
          </div>
        </div>
    
    </section>
  );
};

export default OurServices;