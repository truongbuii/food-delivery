import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";

const useRouterProgress = () => {
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  useEffect(() => {
    // Check if the pathname has changed
    if (pathname !== prevPathname) {
      NProgress.start();
      setPrevPathname(pathname); // Update the previous pathname to the current one
    }

    return () => {
      NProgress.done();
    };
  }, [pathname, prevPathname]);

  return null;
};

export default useRouterProgress;
