export interface AppLayoutProps {
  title?: string;
  description?: string;
  children?: any;
  type: "app" | "community";
  slug?: string;
}
