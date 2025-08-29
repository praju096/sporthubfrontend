import React, { useState } from 'react';
import Footer from '../Home/Footer';

const ReturnsExchanges: React.FC = () => {
  const faqs = [
    {
      id: 1,
      question: 'What is your return policy?',
      answer: 'We accept returns within 30 days of purchase. Items must be unused with original tags attached.',
    },
    {
      id: 2,
      question: 'How do I initiate a return?',
      answer: 'Log in to your account, go to order history, select the item(s) you want to return, and follow the prompts.',
    },
    {
      id: 3,
      question: 'How long will my refund take?',
      answer: 'Refunds are processed within 3-5 business days after we receive your return. Bank processing may take additional time.',
    }
  ];

  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const toggleQuestion = (id: number) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div>
      <div className="container py-4 mt-5" style={{ backgroundColor: 'white' }}>
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <h2 className="mb-4 text-black">Returns & Exchanges</h2>
            <div className="alert alert-danger mb-4">
              <strong>Important:</strong> We cannot accept returns of final sale items or items without original tags.
            </div>
            <div className="card border-black mb-4">
              <div className="card-header bg-black text-white">
                <h5 className="mb-0">Frequently Asked Questions</h5>
              </div>
              <div className="card-body">
                {faqs.map(faq => (
                  <div key={faq.id} className="mb-3">
                    <button
                      className={`btn w-100 text-start ${activeQuestion === faq.id ? 'text-danger' : 'text-black'}`}
                      onClick={() => toggleQuestion(faq.id)}
                    >
                      <h6>{faq.question}</h6>
                    </button>
                    {activeQuestion === faq.id && (
                      <div className="p-3 bg-light text-black">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="card border-danger">
              <div className="card-header bg-danger text-white">
                <h5 className="mb-0">Return Process</h5>
              </div>
              <div className="card-body">
                <ol className="text-black">
                  <li className="mb-2">Log in to your account</li>
                  <li className="mb-2">Select "Order History"</li>
                  <li className="mb-2">Click "Return Items" next to your order</li>
                  <li className="mb-2">Select items and reason for return</li>
                  <li className="mb-2">Print return label</li>
                  <li className="mb-2">Package items securely and attach label</li>
                  <li className="mb-2">Drop off at shipping carrier</li>
                </ol>
                <button className="btn btn-outline-danger">Start Return</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReturnsExchanges;
