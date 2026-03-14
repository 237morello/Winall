import React from "react";

export const page = () => {
  React.useEffect(() => {
    setTimeout(() => {
      alert("bonjour");
    }, 3000);
  });
  return <div>page</div>;
};
