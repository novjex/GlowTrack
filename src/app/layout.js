// app/layout.jsx
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>GlowTrack</title>
      </head>
      <body className="bg-gray-50 text-gray-800 flex flex-col min-h-screen">
        <main className="flex-grow">{children}</main>
        <footer className="bg-transparent text-center py-4 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} GlowTrack. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
