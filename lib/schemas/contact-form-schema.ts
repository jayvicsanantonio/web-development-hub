import { z } from 'zod';
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(50, { message: 'Name must be less than 50 characters' }),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' }),
  subject: z
    .string()
    .min(5, { message: 'Subject must be at least 5 characters long' })
    .max(100, { message: 'Subject must be less than 100 characters' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters long' })
    .max(1000, { message: 'Message must be less than 1000 characters' }),
  consent: z
    .boolean()
    .refine((val) => val === true, { 
      message: 'You must agree to the privacy policy' 
    }),
});
export type ContactFormValues = z.infer<typeof contactFormSchema>;
