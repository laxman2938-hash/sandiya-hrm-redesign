"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

// ============================================================================
// VALIDATION SCHEMAS
// ============================================================================

// Public Schemas
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(7, "Invalid phone number."),
  subject: z.string().min(3, "Subject must be at least 3 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

// Admin Schemas
const galleryImageSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  image: z.string().min(1, "Image is required."),
});

const teamMemberSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  designation: z.string().optional(),
  image: z.string().min(1, "Image is required."),
});

const employmentCategorySchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  image: z.string().min(1, "Image is required."),
});

const legalDocumentSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  image: z.string().min(1, "Image is required."),
});

const achievementSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  image: z.string().min(1, "Image is required."),
});

const clientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  logo: z.string().min(1, "Logo is required."),
});

const demandLetterSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  image: z.string().min(1, "Image is required."),
});

const testimonialSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  company: z.string().optional(),
  quote: z.string().min(10, "Quote must be at least 10 characters."),
});

// ============================================================================
// TYPES
// ============================================================================

export interface FormState {
  success: boolean;
  message: string;
  data?: unknown;
  errors?: Record<string, string[]>;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Helper function to validate form data against a Zod schema
 */
function validateFormData<T extends z.ZodSchema>(
  schema: T,
  data: Record<string, unknown>
): { success: true; data: z.infer<T> } | { success: false; errors: Record<string, string[]> } {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors: Record<string, string[]> = {};
    result.error.issues.forEach((issue) => {
      const path = issue.path.join(".");
      if (!errors[path]) errors[path] = [];
      errors[path].push(issue.message);
    });
    return { success: false, errors };
  }

  return { success: true, data: result.data };
}

/**
 * Helper function to handle database errors
 */
function handleError(error: unknown, defaultMessage: string = "Database error."): string {
  if (error instanceof Error) {
    console.error(error);
    return error.message;
  }
  console.error(error);
  return defaultMessage;
}

/**
 * Helper function to convert file to base64
 */
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
}

/**
 * Helper function to get file from FormData
 */
async function getFileFromFormData(
  formData: FormData,
  fieldName: string
): Promise<File | null> {
  const file = formData.get(fieldName);
  if (file instanceof File && file.size > 0) {
    return file;
  }
  return null;
}

// ============================================================================
// PUBLIC ACTIONS
// ============================================================================

/**
 * Submit contact form message
 * @param prevState - Previous form state
 * @param formData - Form data from the client
 */
export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validation = validateFormData(contactSchema, {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!validation.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: validation.errors,
    };
  }

  try {
    const { name, email, phone, subject, message } = validation.data;
    await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
        status: "pending",
      },
    });

    revalidatePath("/contact");

    return {
      success: true,
      message: "Thank you for your message! We will get back to you soon.",
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error, "Failed to submit contact form."),
    };
  }
}

// ============================================================================
// ADMIN ACTIONS - GALLERY IMAGES
// ============================================================================

/**
 * Create a new gallery image
 * @requires Authentication
 */
export async function createGalleryImage(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // TODO: Add authentication check
  // const session = await getAuth();
  // if (!session?.user?.isAdmin) {
  //   return { success: false, message: "Not authorized." };
  // }

  try {
    // Get file from FormData
    const file = await getFileFromFormData(formData, "image");
    let imageData = "";

    if (file) {
      // Convert file to base64
      imageData = await fileToBase64(file);
    } else {
      return {
        success: false,
        message: "Image file is required.",
      };
    }

    const validation = validateFormData(galleryImageSchema, {
      title: formData.get("title"),
      image: imageData,
    });

    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed.",
        errors: validation.errors,
      };
    }

    const record = await prisma.galleryImage.create({
      data: validation.data,
    });

    revalidatePath("/gallery");

    return {
      success: true,
      message: "Gallery image created successfully.",
      data: record,
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error, "Failed to create gallery image."),
    };
  }
}

/**
 * Update a gallery image
 * @requires Authentication
 */
export async function updateGalleryImage(
  id: number,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // TODO: Add authentication check

  try {
    // Get file from FormData if provided
    const file = await getFileFromFormData(formData, "image");
    let updateData: Record<string, any> = {
      title: formData.get("title"),
    };

    if (file) {
      updateData.image = await fileToBase64(file);
    }

    const validation = validateFormData(galleryImageSchema, updateData);

    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed.",
        errors: validation.errors,
      };
    }

    const record = await prisma.galleryImage.update({
      where: { id },
      data: validation.data,
    });

    revalidatePath("/gallery");

    return {
      success: true,
      message: "Gallery image updated successfully.",
      data: record,
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error, "Failed to update gallery image."),
    };
  }
}

/**
 * Delete a gallery image
 * @requires Authentication
 */
export async function deleteGalleryImage(id: number): Promise<FormState> {
  // TODO: Add authentication check

  try {
    await prisma.galleryImage.delete({
      where: { id },
    });

    revalidatePath("/gallery");

    return {
      success: true,
      message: "Gallery image deleted successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error, "Failed to delete gallery image."),
    };
  }
}

// ============================================================================
// ADMIN ACTIONS - TEAM MEMBERS
// ============================================================================

/**
 * Create a new team member
 * @requires Authentication
 */
export async function createTeamMember(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // TODO: Add authentication check

  try {
    const file = await getFileFromFormData(formData, "image");
    let imageData = "";

    if (file) {
      imageData = await fileToBase64(file);
    } else {
      return {
        success: false,
        message: "Image file is required.",
      };
    }

    const validation = validateFormData(teamMemberSchema, {
      name: formData.get("name"),
      designation: formData.get("designation"),
      image: imageData,
    });

    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed.",
        errors: validation.errors,
      };
    }

    const record = await prisma.teamMember.create({
      data: validation.data,
    });

    revalidatePath("/team");

    return {
      success: true,
      message: "Team member created successfully.",
      data: record,
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error, "Failed to create team member."),
    };
  }
}

/**
 * Update a team member
 * @requires Authentication
 */
export async function updateTeamMember(
  id: number,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // TODO: Add authentication check

  try {
    const file = await getFileFromFormData(formData, "image");
    let updateData: Record<string, any> = {
      name: formData.get("name"),
      designation: formData.get("designation"),
    };

    if (file) {
      updateData.image = await fileToBase64(file);
    }

    const validation = validateFormData(teamMemberSchema, updateData);

    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed.",
        errors: validation.errors,
      };
    }

    const record = await prisma.teamMember.update({
      where: { id },
      data: validation.data,
    });

    revalidatePath("/team");

    return {
      success: true,
      message: "Team member updated successfully.",
      data: record,
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error, "Failed to update team member."),
    };
  }
}

/**
 * Delete a team member
 * @requires Authentication
 */
export async function deleteTeamMember(id: number): Promise<FormState> {
  // TODO: Add authentication check

  try {
    await prisma.teamMember.delete({
      where: { id },
    });

    revalidatePath("/team");

    return {
      success: true,
      message: "Team member deleted successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error, "Failed to delete team member."),
    };
  }
}

// ============================================================================
// ADMIN ACTIONS - EMPLOYMENT CATEGORIES
// ============================================================================

/**
 * Create a new employment category
 * @requires Authentication
 */
export async function createEmploymentCategory(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // TODO: Add authentication check

  try {
    const file = await getFileFromFormData(formData, "image");
    let imageData = "";

    if (file) {
      imageData = await fileToBase64(file);
    } else {
      return {
        success: false,
        message: "Image file is required.",
      };
    }

    const validation = validateFormData(employmentCategorySchema, {
      title: formData.get("title"),
      image: imageData,
    });

    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed.",
        errors: validation.errors,
      };
    }

    const record = await prisma.employmentCategory.create({
      data: validation.data,
    });

    revalidatePath("/employment-categories");

    return {
      success: true,
      message: "Employment category created successfully.",
      data: record,
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error, "Failed to create employment category."),
    };
  }
}

/**
 * Update an employment category
 * @requires Authentication
 */
export async function updateEmploymentCategory(
  id: number,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // TODO: Add authentication check

  try {
    const file = await getFileFromFormData(formData, "image");
    let updateData: Record<string, any> = {
      title: formData.get("title"),
    };

    if (file) {
      updateData.image = await fileToBase64(file);
    }

    const validation = validateFormData(employmentCategorySchema, updateData);

    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed.",
        errors: validation.errors,
      };
    }

    const record = await prisma.employmentCategory.update({
      where: { id },
      data: validation.data,
    });

    revalidatePath("/employment-categories");

    return {
      success: true,
      message: "Employment category updated successfully.",
      data: record,
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error, "Failed to update employment category."),
    };
  }
}

/**
 * Delete an employment category
 * @requires Authentication
 */
export async function deleteEmploymentCategory(id: number): Promise<FormState> {
  // TODO: Add authentication check

  try {
    await prisma.employmentCategory.delete({
      where: { id },
    });

    revalidatePath("/employment-categories");

    return {
      success: true,
      message: "Employment category deleted successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error, "Failed to delete employment category."),
    };
  }
}

// ============================================================================
// ADMIN ACTIONS - LEGAL DOCUMENTS
// ============================================================================

/**
 * Create a new legal document
 * @requires Authentication
 */
export async function createLegalDocument(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // TODO: Add authentication check

  try {
    const file = await getFileFromFormData(formData, "image");
    let imageData = "";

    if (file) {
      imageData = await fileToBase64(file);
    } else {
      return {
        success: false,
        message: "Image file is required.",
      };
    }

    const validation = validateFormData(legalDocumentSchema, {
      title: formData.get("title"),
      image: imageData,
    });

    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed.",
        errors: validation.errors,
      };
    }

    const record = await prisma.legalDocument.create({
      data: validation.data,
    });

    revalidatePath("/legal-documents");

    return {
      success: true,
      message: "Legal document created successfully.",
      data: record,
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error, "Failed to create legal document."),
    };
  }
}

/**
 * Update a legal document
 * @requires Authentication
 */
export async function updateLegalDocument(
  id: number,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // TODO: Add authentication check

  try {
    const file = await getFileFromFormData(formData, "image");
    let updateData: Record<string, any> = {
      title: formData.get("title"),
    };

    if (file) {
      updateData.image = await fileToBase64(file);
    }

    const validation = validateFormData(legalDocumentSchema, updateData);

    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed.",
        errors: validation.errors,
      };
    }

    const record = await prisma.legalDocument.update({
      where: { id },
      data: validation.data,
    });

    revalidatePath("/legal-documents");

    return {
      success: true,
      message: "Legal document updated successfully.",
      data: record,
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error, "Failed to update legal document."),
    };
  }
}

/**
 * Delete a legal document
 * @requires Authentication
 */
export async function deleteLegalDocument(id: number): Promise<FormState> {
  // TODO: Add authentication check

  try {
    await prisma.legalDocument.delete({
      where: { id },
    });

    revalidatePath("/legal-documents");

    return {
      success: true,
      message: "Legal document deleted successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error, "Failed to delete legal document."),
    };
  }
}

// ============================================================================
// ADMIN ACTIONS - ACHIEVEMENTS
// ============================================================================

/**
 * Create a new achievement
 * @requires Authentication
 */
export async function createAchievement(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // TODO: Add authentication check

  try {
    const file = await getFileFromFormData(formData, "image");
    let imageData = "";

    if (file) {
      imageData = await fileToBase64(file);
    } else {
      return {
        success: false,
        message: "Image file is required.",
      };
    }

    const validation = validateFormData(achievementSchema, {
      title: formData.get("title"),
      image: imageData,
    });

    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed.",
        errors: validation.errors,
      };
    }

    const record = await prisma.achievement.create({
      data: validation.data,
    });

    revalidatePath("/achievements");

    return {
      success: true,
      message: "Achievement created successfully.",
      data: record,
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error, "Failed to create achievement."),
    };
  }
}

/**
 * Update an achievement
 * @requires Authentication
 */
export async function updateAchievement(
  id: number,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // TODO: Add authentication check

  try {
    const file = await getFileFromFormData(formData, "image");
    let updateData: Record<string, any> = {
      title: formData.get("title"),
    };

    if (file) {
      updateData.image = await fileToBase64(file);
    }

    const validation = validateFormData(achievementSchema, updateData);

    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed.",
        errors: validation.errors,
      };
    }

    const record = await prisma.achievement.update({
      where: { id },
      data: validation.data,
    });

    revalidatePath("/achievements");

    return {
      success: true,
      message: "Achievement updated successfully.",
      data: record,
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error, "Failed to update achievement."),
    };
  }
}

/**
 * Delete an achievement
 * @requires Authentication
 */
export async function deleteAchievement(id: number): Promise<FormState> {
  // TODO: Add authentication check

  try {
    await prisma.achievement.delete({
      where: { id },
    });

    revalidatePath("/achievements");

    return {
      success: true,
      message: "Achievement deleted successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error, "Failed to delete achievement."),
    };
  }
}

// ============================================================================
// ADMIN ACTIONS - CLIENTS
// ============================================================================

/**
 * Create a new client
 * @requires Authentication
 */
export async function createClient(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // TODO: Add authentication check

  try {
    const file = await getFileFromFormData(formData, "logo");
    let logoData = "";

    if (file) {
      logoData = await fileToBase64(file);
    } else {
      return {
        success: false,
        message: "Logo file is required.",
      };
    }

    const validation = validateFormData(clientSchema, {
      name: formData.get("name"),
      logo: logoData,
    });

    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed.",
        errors: validation.errors,
      };
    }

    const record = await prisma.client.create({
      data: validation.data,
    });

    revalidatePath("/clients");

    return {
      success: true,
      message: "Client created successfully.",
      data: record,
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error, "Failed to create client."),
    };
  }
}

/**
 * Update a client
 * @requires Authentication
 */
export async function updateClient(
  id: number,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // TODO: Add authentication check

  try {
    const file = await getFileFromFormData(formData, "logo");
    let updateData: Record<string, any> = {
      name: formData.get("name"),
    };

    if (file) {
      updateData.logo = await fileToBase64(file);
    }

    const validation = validateFormData(clientSchema, updateData);

    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed.",
        errors: validation.errors,
      };
    }

    const record = await prisma.client.update({
      where: { id },
      data: validation.data,
    });

    revalidatePath("/clients");

    return {
      success: true,
      message: "Client updated successfully.",
      data: record,
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error, "Failed to update client."),
    };
  }
}

/**
 * Delete a client
 * @requires Authentication
 */
export async function deleteClient(id: number): Promise<FormState> {
  // TODO: Add authentication check

  try {
    await prisma.client.delete({
      where: { id },
    });

    revalidatePath("/clients");

    return {
      success: true,
      message: "Client deleted successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error, "Failed to delete client."),
    };
  }
}

// ============================================================================
// ADMIN ACTIONS - DEMAND LETTERS
// ============================================================================

/**
 * Create a new demand letter
 * @requires Authentication
 */
export async function createDemandLetter(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // TODO: Add authentication check

  try {
    const file = await getFileFromFormData(formData, "image");
    let imageData = "";

    if (file) {
      imageData = await fileToBase64(file);
    } else {
      return {
        success: false,
        message: "Image file is required.",
      };
    }

    const validation = validateFormData(demandLetterSchema, {
      title: formData.get("title"),
      image: imageData,
    });

    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed.",
        errors: validation.errors,
      };
    }

    const record = await prisma.demandLetter.create({
      data: validation.data,
    });

    revalidatePath("/active-demands");

    return {
      success: true,
      message: "Demand letter created successfully.",
      data: record,
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error, "Failed to create demand letter."),
    };
  }
}

/**
 * Update a demand letter
 * @requires Authentication
 */
export async function updateDemandLetter(
  id: number,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // TODO: Add authentication check

  try {
    const file = await getFileFromFormData(formData, "image");
    let updateData: Record<string, any> = {
      title: formData.get("title"),
    };

    if (file) {
      updateData.image = await fileToBase64(file);
    }

    const validation = validateFormData(demandLetterSchema, updateData);

    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed.",
        errors: validation.errors,
      };
    }

    const record = await prisma.demandLetter.update({
      where: { id },
      data: validation.data,
    });

    revalidatePath("/active-demands");

    return {
      success: true,
      message: "Demand letter updated successfully.",
      data: record,
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error, "Failed to update demand letter."),
    };
  }
}

/**
 * Delete a demand letter
 * @requires Authentication
 */
export async function deleteDemandLetter(id: number): Promise<FormState> {
  // TODO: Add authentication check

  try {
    await prisma.demandLetter.delete({
      where: { id },
    });

    revalidatePath("/active-demands");

    return {
      success: true,
      message: "Demand letter deleted successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error, "Failed to delete demand letter."),
    };
  }
}

// ============================================================================
// ADMIN ACTIONS - TESTIMONIALS
// ============================================================================

/**
 * Create a new testimonial
 * @requires Authentication
 */
export async function createTestimonial(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // TODO: Add authentication check

  const validation = validateFormData(testimonialSchema, {
    name: formData.get("name"),
    company: formData.get("company"),
    quote: formData.get("quote"),
  });

  if (!validation.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: validation.errors,
    };
  }

  try {
    const record = await prisma.testimonial.create({
      data: validation.data,
    });

    revalidatePath("/testimonials");

    return {
      success: true,
      message: "Testimonial created successfully.",
      data: record,
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error, "Failed to create testimonial."),
    };
  }
}

/**
 * Update a testimonial
 * @requires Authentication
 */
export async function updateTestimonial(
  id: number,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // TODO: Add authentication check

  const validation = validateFormData(testimonialSchema, {
    name: formData.get("name"),
    company: formData.get("company"),
    quote: formData.get("quote"),
  });

  if (!validation.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: validation.errors,
    };
  }

  try {
    const record = await prisma.testimonial.update({
      where: { id },
      data: validation.data,
    });

    revalidatePath("/testimonials");

    return {
      success: true,
      message: "Testimonial updated successfully.",
      data: record,
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error, "Failed to update testimonial."),
    };
  }
}

/**
 * Delete a testimonial
 * @requires Authentication
 */
export async function deleteTestimonial(id: number): Promise<FormState> {
  // TODO: Add authentication check

  try {
    await prisma.testimonial.delete({
      where: { id },
    });

    revalidatePath("/testimonials");

    return {
      success: true,
      message: "Testimonial deleted successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error, "Failed to delete testimonial."),
    };
  }
}

// ============================================================================
// ADMIN ACTIONS - CONTACT MESSAGES (Management)
// ============================================================================

/**
 * Update contact message status (mark as read, replied, etc.)
 * @requires Authentication
 */
export async function updateContactMessageStatus(
  id: number,
  status: "pending" | "read" | "replied"
): Promise<FormState> {
  // TODO: Add authentication check

  if (!["pending", "read", "replied"].includes(status)) {
    return {
      success: false,
      message: "Invalid status.",
    };
  }

  try {
    const record = await prisma.contactMessage.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/admin/messages");

    return {
      success: true,
      message: "Message status updated successfully.",
      data: record,
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error, "Failed to update message status."),
    };
  }
}

/**
 * Delete a contact message
 * @requires Authentication
 */
export async function deleteContactMessage(id: number): Promise<FormState> {
  // TODO: Add authentication check

  try {
    await prisma.contactMessage.delete({
      where: { id },
    });

    revalidatePath("/admin/messages");

    return {
      success: true,
      message: "Contact message deleted successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error, "Failed to delete contact message."),
    };
  }
}
