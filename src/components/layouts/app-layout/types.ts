export interface AppLayoutProps {
  title?: string;
  description?: string;
  children?: any;
  type: "app" | "community" | "settings";
  slug?: string;
}
