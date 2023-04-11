import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Input, Label, Button } from 'reactstrap';

const CustomerSupp = () => {
  const { register, handleSubmit, reset } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    setSubmitting(true);
    setError(null);

    try {
      await axios.post('/api/contact', data);
      setSuccess(true);
      reset();
    } catch (err) {
      setError(err.response.data.message);
    }

    setSubmitting(false);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Contact Customer Support</h1>

      {success ? (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          <p className="font-bold">Success!</p>
          <p>Your message has been sent.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Label for="name" className="block mb-2">Name</Label>
            <Input type="text" name="name" id="name" placeholder="Enter your name" innerRef={register({ required: true })} />
          </div>

          <div className="mb-4">
            <Label for="email" className="block mb-2">Email</Label>
            <Input type="email" name="email" id="email" placeholder="Enter your email" innerRef={register({ required: true })} />
          </div>

          <div className="mb-4">
            <Label for="message" className="block mb-2">Message</Label>
            <textarea name="message" id="message" placeholder="Enter your message" rows="5" className="w-full p-2 border border-gray-400" innerRef={register({ required: true })} />
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          <Button type="submit" disabled={submitting} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" block>
            {submitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      )}
    </div>
  );
};

export default CustomerSupp;
