import { z } from "zod";
export const projectTypes = [
  "AI & Machine Learning",
  "Web Development",
  "Software Engineering",
  "UI/UX & Digital Experiences",
  "Cybersecurity Solutions",
  "Cloud & Deployment",
  "Something else",
] as const;
export const budgetRanges = [
  "Let’s discuss",
  "Under $2,500 USD",
  "$2,500–$10,000 USD",
  "$10,000–$25,000 USD",
  "$25,000+ USD",
] as const;
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter at least two characters.")
    .max(100, "Please use no more than 100 characters.")
    .regex(/^[^\r\n<>]+$/, "Please enter a valid name."),
  email: z.email("Please enter a valid email address.").max(254),
  projectType: z.enum(projectTypes, { error: "Choose a project type." }),
  budget: z.enum(budgetRanges, { error: "Choose a budget range." }),
  message: z
    .string()
    .trim()
    .min(20, "Tell us a little more — at least 20 characters.")
    .max(5000, "Please keep your message under 5,000 characters."),
  consent: z
    .boolean()
    .refine((value) => value, "Please acknowledge the privacy notice."),
  website: z.string().max(200).optional(),
  turnstileToken: z.string().max(2048).optional(),
  startedAt: z.number().finite(),
  submissionId: z.uuid(),
});
export type ContactInput = z.infer<typeof contactSchema>;
