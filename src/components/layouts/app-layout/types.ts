export interface AppLayoutProps {
  title?: string;
  description?: string;
  children?: any;
  subMenuLinks?: { label: string; pathname: string }[];
}
