import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eisenhower Matrix - Todo App",
  description:
    "The Eisenhower Matrix is a task management tool that helps you organize and prioritize tasks by urgency and importance. It divides tasks into four boxes based on the tasks you'll do first, the tasks you'll schedule for later, the tasks you'll delegate, and the tasks you'll delete.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
