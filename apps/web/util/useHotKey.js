import React from "react";

const createKeyChecker = (hotkeys = []) => {
  let index = 0;
  const TAIL = hotkeys.length - 1;

  return (key) => {
    if (key !== hotkeys[index]) {
      index = 0;
      return false;
    }

    if (index === TAIL) {
      index = 0;
      return true;
    }

    index++;
    return false;
  };
};

function useHotKey(hotKeys, onMatch) {
  const keyCrawler = React.useMemo(
    () => createKeyChecker([].concat(hotKeys)),
    [hotKeys]
  );

  const listen = ({ key }) => {
    if (keyCrawler(key)) {
      onMatch();
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", listen);
    return () => window.removeEventListener("keydown", listen);
  });
}

export default useHotKey;
