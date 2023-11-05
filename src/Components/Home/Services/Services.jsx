/** @format */

const Services = () => {
  return (
    <div className="mb-40 container mx-auto p-4">
      <p className="text-2xl-font-semibold base-txt text-center">What We Do</p>
      <h2 className="text-5xl text-black font-bold text-center">
        Our Best Services
      </h2>
      <div className="service-container my-20">
        <div className="lg:flex items-center gap-4 group">
          <div className="flex-1 max-h-[400px] overflow-hidden rounded-lg">
            <img
              src="https://i.ibb.co/HnJfSVy/photo-1615461066841-6116e61058f4-auto-format-fit-crop-q-60-w-500-ixlib-rb-4-0.jpg"
              alt="Donor_image"
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
            />
          </div>
          <div className="flex-1 p-10 space-y-4">
            <h2 className="text-6xl text-base-300 font-bold">01</h2>
            <h3 className="text-black text-4xl font-bold">Blood Donation</h3>
            <p>
              Blood donation is of paramount importance as it saves lives.
              Donated blood is crucial for medical emergencies, surgeries,
              cancer patients, and trauma victims. It can be a lifeline for
              those with chronic illnesses and rare blood disorders. Regular
              donations maintain an adequate blood supply, ensuring swift
              response during crises. Moreover, one donation can help multiple
              patients as blood components like plasma, platelets, and red cells
              are separated for specific needs. It&apos;s a simple yet impactful
              way for individuals to contribute to their community&apos;s
              well-being, and every donor can be a hero, potentially impacting
              countless lives with a single act of generosity.
            </p>
            <button className="btn-base">Read More</button>
          </div>
        </div>

        <div className="lg:flex items-center gap-4 group">
          <div className="flex-1 max-h-[400px] overflow-hidden rounded-lg">
            <img
              src="https://i.ibb.co/LJZBwKF/photo-1578307897391-4dd85585bf5a-auto-format-fit-crop-q-60-w-500-ixlib-rb-4-0.jpg"
              alt="Donor_image"
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
            />
          </div>
          <div className="flex-1 p-10 space-y-4">
            <h2 className="text-6xl text-base-300 font-bold">02</h2>
            <h3 className="text-black text-4xl font-bold">Health Check</h3>
            <p>
              Regular health check-ups are essential for early disease
              detection, preventive care, and peace of mind. These examinations
              help identify health issues at their onset, enabling timely
              intervention and cost-effective treatment. They also provide
              guidance on lifestyle changes and preventive measures. Knowing
              that your health is regularly monitored reduces anxiety and
              ensures a better quality of life, managing chronic conditions for
              a longer, healthier life. Personalized health plans can be
              developed based on these assessments. In a nutshell, health
              check-ups are a proactive and cost-efficient approach to safeguard
              your well-being and enhance your overall quality of life.
            </p>
            <button className="btn-base">Read More</button>
          </div>
        </div>

        <div className="lg:flex items-center gap-4 group">
          <div className="flex-1 max-h-[400px] overflow-hidden rounded-lg">
            <img
              src="https://i.ibb.co/02DNrsp/photo-1582719471327-5bd41fcf7f7f-auto-format-fit-crop-q-60-w-500-ixlib-rb-4-0.jpg"
              alt="Donor_image"
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
            />
          </div>
          <div className="flex-1 p-10 space-y-4">
            <h2 className="text-6xl text-base-300 font-bold">03</h2>
            <h3 className="text-black text-4xl font-bold">Blood Bank</h3>
            <p>
              Blood banks are essential for providing a reliable supply of blood
              and blood products, ensuring immediate response to medical
              emergencies, life-saving procedures, and disaster relief. They
              contribute to public health through rigorous testing and community
              engagement, promoting altruistic blood donation. Blood banks are a
              cornerstone of healthcare, safeguarding lives through readily
              available and safe blood supplies.
            </p>
            <button className="btn-base">Read More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
