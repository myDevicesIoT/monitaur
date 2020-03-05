import { useState, useEffect } from 'react';

const useDialog = (showing, callback) => {
  const [isShowing, setIsShowing] = useState(showing);
  const [confirm, setConfirm] = useState(false)

  useEffect(() => {
      if (confirm && confirm === true) {
        callback(confirm)
      }
  }, [confirm])

  function toggle(decision) {
    setIsShowing(!isShowing);
    setConfirm(decision)
  }

  return {
    isShowing,
    toggle,
  }
};

export default useDialog;