import { createReader } from "@keystatic/core/reader";
import config from "../keystatic.config";

export const reader = createReader("", config);

// Use in Server Components or Server Actions
export async function getAllPosts() {
  return await reader.collections.posts.all();
}

export async function getPost(slug: string) {
  return await reader.collections.posts.read(slug);
}

export async function getAllHomePosts() {
  return await reader.collections.homePage.all();
}

export async function getRatesAndServices() {
  return await reader.collections.ratesAndServices.all();
}

export async function getTestimonials() {
  return await reader.collections.testimonials.all();
}

export async function getContactSection() {
  return await reader.collections.contactSection.all();
}
