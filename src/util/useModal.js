import { useState } from "react";

const useModal = () => {
  const [open, setOpen] = useState(false);
  function toggleModal() {
    setOpen(!open);
    if (open) {
      document.body.removeAttribute("style");
    } else {
      document.body.style.overflow = "hidden";
    }
  }
  return {
    open,
    toggleModal,
  };
};

export default useModal;
