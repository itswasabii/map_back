import { useRef, useState } from "react";

const useDisclose = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navRef = useRef(null);

  const toggleDisclose = () => {
    if (navRef.current) {
      if (isOpen) {
        navRef.current.style.display = "block";
        
      } else {
        navRef.current.style.display = "none";
      }
      setIsOpen(!isOpen);
    }
  };

  return { isOpen, toggleDisclose, navRef };
};

export default useDisclose;
