import { FaStar } from "react-icons/fa";

const reviews = [
  {
    name: "Ayesha Khan",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    testimonial: "Amazing service! My home has never been cleaner. Highly recommended."
  },
  {
    name: "Rohit Sharma",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    testimonial: "Very professional team. They took care of everything quickly and efficiently."
  },
  {
    name: "Sara Ali",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    testimonial: "Excellent work and friendly staff. Will definitely hire again!"
  }
];

const CustomerReviews = () => {
  return (
    <section className="section-margin">
        <h2 className="section-title">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-secondary/10 rounded-xl shadow-lg p-6 flex flex-col items-center text-center"
            >
              <img
                src={review.photo}
                alt={review.name}
                className="w-20 h-20 rounded-full object-cover mb-4"
              />
              <h3 className="font-semibold text-lg mb-2">{review.name}</h3>
              <div className="flex mb-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 mx-0.5" />
                ))}
              </div>
              <p className="text-gray-600">{review.testimonial}</p>
            </div>
          ))}
        </div>
   
    </section>
  );
};

export default CustomerReviews;
