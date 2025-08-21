import React from 'react';

const ShippingInfo: React.FC = () => {
  const shippingOptions = [
    {
      name: 'Standard Shipping',
      cost: '$5.99',
      timeframe: '3-5 business days',
      description: 'Fully tracked shipping with delivery confirmation'
    },
    {
      name: 'Express Shipping',
      cost: '$12.99',
      timeframe: '2 business days',
      description: 'Priority processing with tracking'
    },
    {
      name: 'Overnight',
      cost: '$19.99',
      timeframe: 'Next business day',
      description: 'Guaranteed next day delivery'
    }
  ];

  return (
    <div className="container py-4 mt-5" style={{ backgroundColor: 'white' }}>
      <div className="row justify-content-center">
        <div className="col-lg-12">
          <h2 className="mb-4 text-black">Shipping Information</h2>
          <div className="alert alert-danger mb-4">
            <h5>Free standard shipping on all orders over $50!</h5>
          </div>
          <div className="card border-black mb-4">
            <div className="card-header bg-black text-white">
              <h5 className="mb-0">Shipping Options</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th className="text-danger">Method</th>
                      <th className="text-danger">Cost</th>
                      <th className="text-danger">Timeframe</th>
                      <th className="text-danger">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shippingOptions.map((option, index) => (
                      <tr key={index}>
                        <td className="text-black">{option.name}</td>
                        <td className="text-black">{option.cost}</td>
                        <td className="text-black">{option.timeframe}</td>
                        <td className="text-black">{option.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="card border-danger">
            <div className="card-header bg-danger text-white">
              <h5 className="mb-0">International Shipping</h5>
            </div>
            <div className="card-body">
              <ul className="list-unstyled text-black">
                <li className="mb-2"><strong>Canada:</strong> $14.99, 7-10 business days</li>
                <li className="mb-2"><strong>Europe:</strong> $19.99, 10-14 business days</li>
                <li className="mb-2"><strong>Australia/Asia:</strong> $24.99, 14-21 business days</li>
              </ul>
              <p className="text-black"><strong>Note:</strong> International orders may be subject to customs fees</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;
