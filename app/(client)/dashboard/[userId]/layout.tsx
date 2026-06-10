export default async function Layout({ 
  children,
  params
}: { 
  children: React.ReactNode;
  params: Promise<{ userId: string }>;
}) {
  await params;

  return children;
}
