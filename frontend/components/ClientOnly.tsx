import React, { useEffect, useState } from "react";

export default function ClientOnly({
  children,
  ...delegated
}: {
  children: React.ReactNode;
}) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    console.log(null);
    
    return null;
  }

  return <div {...delegated}>{children}</div>;
}
