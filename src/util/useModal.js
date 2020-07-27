import { useState } from "react";

const useModal = () => {
  const [open, setOpen] = useState(false);
  function toggleModal() {
    setOpen(!open);
  }
  return {
    open,
    toggleModal,
  };
};

export default useModal;
