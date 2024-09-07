import "./globals.css";

export const metadata = {
  title: "Recurring Date Picker",
  description: "A tool to help you create recurring dates",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
