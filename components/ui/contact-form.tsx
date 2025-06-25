import React from 'react';
'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormValues } from '@/lib/schemas/contact-form-schema';
export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      consent: false,
    },
  });
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitError('');
    try {
      console.log('Form data submitted:', data);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      reset();
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Failed to submit the form. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 ${
              errors.name
                ? 'border-error focus:ring-error'
                : 'border-border focus:ring-accent-neon'
            } bg-background`}
            placeholder="Your name"
            aria-describedby="name-error"
            {...register('name')}
          />
          {errors.name && (
            <p id="name-error" className="text-sm text-error">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 ${
              errors.email
                ? 'border-error focus:ring-error'
                : 'border-border focus:ring-accent-neon'
            } bg-background`}
            placeholder="Your email address"
            aria-describedby="email-error"
            {...register('email')}
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-error">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium">
            Subject
          </label>
          <input
            id="subject"
            type="text"
            className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 ${
              errors.subject
                ? 'border-error focus:ring-error'
                : 'border-border focus:ring-accent-neon'
            } bg-background`}
            placeholder="Subject of your message"
            aria-describedby="subject-error"
            {...register('subject')}
          />
          {errors.subject && (
            <p id="subject-error" className="text-sm text-error">
              {errors.subject.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            className={`flex w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 ${
              errors.message
                ? 'border-error focus:ring-error'
                : 'border-border focus:ring-accent-neon'
            } bg-background`}
            placeholder="Your message"
            aria-describedby="message-error"
            {...register('message')}
          />
          {errors.message && (
            <p id="message-error" className="text-sm text-error">
              {errors.message.message}
            </p>
          )}
        </div>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="consent"
              type="checkbox"
              className="w-4 h-4 text-accent-neon focus:ring-accent-neon border-border rounded bg-background"
              {...register('consent')}
            />
          </div>
          <div className="ml-3">
            <label htmlFor="consent" className="text-sm">
              I agree to the{' '}
              <a href="#" className="text-accent-neon hover:underline">
                privacy policy
              </a>
            </label>
            {errors.consent && (
              <p className="text-sm text-error">{errors.consent.message}</p>
            )}
          </div>
        </div>
        {submitError && (
          <div className="p-3 rounded-md bg-error/10 border border-error/20 text-error text-sm">
            {submitError}
          </div>
        )}
        {submitSuccess && (
          <div className="p-3 rounded-md bg-accent-neon/10 border border-accent-neon/20 text-accent-neon text-sm">
            Thank you! Your message has been sent successfully.
          </div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full justify-center rounded-md bg-accent-neon px-4 py-2.5 text-sm font-medium text-background shadow-sm hover:bg-accent-neon/90 focus:outline-none focus:ring-2 focus:ring-accent-neon focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-background"
                xmlns="http:
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </div>
  );
}
