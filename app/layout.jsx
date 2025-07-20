// app/layout.jsx
import './globals.css';
import { DataProvider } from './DataContext';
import DynamicHead from './DynamicHead';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DataProvider>
          <DynamicHead />
          {children}
        </DataProvider>
      </body>
    </html>
  );
}
