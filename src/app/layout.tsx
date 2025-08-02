// import './globals.css';

export const metadata = {
  title: 'CrewCraft - AI Agent Platform',
  description: 'Build powerful AI agent teams with Cerebras',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, sans-serif' }}>{children}</body>
    </html>
  );
}