import React, { useState } from 'react';
import Footer from '../Home/Footer';

const FAQ: React.FC = () => {
  const faqs = [
    {
      id: 1,
      question: 'How do I place an order?',
      answer: 'Browse products, add to cart, and proceed through checkout. You\'ll receive an email confirmation.',
    },
    {
      id: 2,
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, Apple Pay, and Google Pay.',
    },
    {
      id: 3,
      question: 'How do I track my order?',
      answer: 'Use our Track Order tool by entering your order number from your confirmation email.',
    },
    {
      id: 4,
      question: 'What is your return policy?',
      answer: 'Items can be returned within 30 days in original condition. Some exclusions apply.',
    },
    {
      id: 5,
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship to most countries worldwide with rates calculated at checkout.',
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  //   const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="container py-4 mt-5" style={{ backgroundColor: 'white' }}>
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <h2 className="mb-4 text-black">Frequently Asked Questions</h2>
            <div className="card border-black mb-4">
              <div className="card-header bg-black text-white">
                <h5 className="mb-0">Search FAQs</h5>
              </div>
              <div className="card-body">
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {filteredFaqs.length > 0 ? (
                  <div className="accordion" id="faqAccordion">
                    {filteredFaqs.map((faq, index) => (
                      <div className="accordion-item border-0 mb-2" key={faq.id}>
                        <h3 className="accordion-header">
                          <button
                            className={`accordion-button ${index === 0 ? '' : 'collapsed'} bg-danger text-white`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse-${faq.id}`}
                          >
                            {faq.question}
                          </button>
                        </h3>
                        <div
                          id={`collapse-${faq.id}`}
                          className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                          data-bs-parent="#faqAccordion"
                        >
                          <div className="accordion-body bg-light text-black">
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-black">No FAQs match your search criteria.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

    </div>
  );
};

export default FAQ;
