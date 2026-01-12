export interface Issue {
  id: number;
  number: number;
  title: string;
  state: "open" | "closed";
  comments: number;
  body: string | null;
  html_url: string;
  created_at: string;
  user: {
    login: string;
    avatar_url: string;
  };
  labels: {
    name: string;
    color: string;
  }[];
}
