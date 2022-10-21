import { useEffect, useCallback, useState } from 'react';

const useContextMenu = () => {
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [showBannerMenu, setShowBannerMenu] = useState(false);
  const [showTitleMenu, setShowTitleMenu] = useState(false);

  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      if (event.target.className === 'user_game_banner_img') {
        setAnchorPoint({ x: event.offsetX, y: event.pageY });
        setShowBannerMenu(true);
        setShowTitleMenu(false);
      }
      if (event.target.className === 'title_list__item') {
        setAnchorPoint({ x: event.offsetX, y: event.pageY });
        setShowTitleMenu(true);
        setShowBannerMenu(false);
      }
    },
    [setShowBannerMenu, setShowTitleMenu, setAnchorPoint]
  );

  const handleClick = useCallback(() => {
    if (showTitleMenu) setShowTitleMenu(false);
    else if (showBannerMenu) setShowBannerMenu(false);
    else return null;
    // showTitleMenu ? setShowTitleMenu(false) : null;
    // showBannerMenu ? setShowBannerMenu(false) : null;
  }, [showTitleMenu, showBannerMenu]);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  });
  return { anchorPoint, showTitleMenu, showBannerMenu };
};

export default useContextMenu;
