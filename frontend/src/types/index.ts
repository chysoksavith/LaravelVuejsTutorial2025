export interface LoginForm {
  email: string;
  password: string;
}
export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
export interface User {
  id: number;
  name: string;
  email: string;
}
export type Post = {
  id: number;
  slug: string;
  title: string;
  body: string;
  is_published: boolean;
  createdAt: string;
};
export type Category = {
  id: number;
  name: string;
  created_at: string;
};
export type categoryForm = {
  name: string;
};
export type postForm = {
  title: string;
  body: string;
};
export type Product = {
  id: number;
  category: { id: number; name: string };
  name: string;
  description: string;
  image: string;
  price: number;
  created_at: string;
};

export type ProductForm = {
  category_id: number;
  name: string;
  description: string;
  image: File | string; 
  price: number;
};
export interface LaravelResponseCollection<T> {
  data: T[];
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  path: string;
  first_page_url: string | null;
  last_page_url: string | null;
  next_page_url: string | null;
  prev_page_url: string | null;
}
