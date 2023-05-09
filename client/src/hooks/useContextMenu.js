import { useEffect, useCallback, useState } from 'react';

const useContextMenu = () => {
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [showBannerMenu, setShowBannerMenu] = useState(false);
  const [showTitleMenu, setShowTitleMenu] = useState(false);
  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      if (
        event.target.className === 'user_game_banner_img' &&
        !showBannerMenu
      ) {
        setAnchorPoint({ x: event.offsetX, y: event.pageY });
        setShowBannerMenu(true);
        setShowTitleMenu(false);
      }
      if (event.target.className === 'title_list__item') {
        setAnchorPoint({ x: event.movementX + 5, y: event.y + 20 });
        setShowTitleMenu(true);
        setShowBannerMenu(false);
      }
    },
    [setAnchorPoint]
  );

  const handleClick = useCallback(() => {
    if (showTitleMenu) setShowTitleMenu(false);
    if (showBannerMenu) setShowBannerMenu(false);
  }, [showTitleMenu, showBannerMenu]);

  const resetContext = () => {
    setShowBannerMenu(false);
    setShowTitleMenu(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  });
  return { anchorPoint, showTitleMenu, showBannerMenu, resetContext };
};

export default useContextMenu;
