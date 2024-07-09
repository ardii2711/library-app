import { useEffect } from "react";

function useTitle(newTitle: string) {
  const changeTitle = () => {
    document.title = newTitle;
  };

  useEffect(() => {
    document.title = newTitle ?? "Libary App";
  }, [newTitle]);

  return changeTitle;
}

export default useTitle;
