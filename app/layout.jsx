// app/layout.js or app/layout.jsx
import './globals.css';
import { DataProvider } from './DataContext'; // Adjust path if needed

export const metadata = {
  title: 'Your App',
  description: 'App description',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DataProvider>
          {children}
        </DataProvider>
      </body>
    </html>
  );
}
