import { z } from 'zod';

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];


export const user = z.object({
  name: z.string()
    .max(40, "Name is Too Long")
    .regex(/^[A-Za-z\s]+$/, "Accepting only Alphabets"),
  backgroundcolor: z.string()
   .regex(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/, "Must be a valid hex color code"),
  Imageupload: z  
    .instanceof (File)
    .refine((file)=> file.size <= MAX_FILE_SIZE ,`Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  requestenabled: z.boolean(),
  //rank: z.number.int()
});