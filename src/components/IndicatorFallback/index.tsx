import { useRouteContext } from '@tanstack/react-router';
import { useIsFetching } from '@tanstack/react-query';

import { InfoBarWrapper, InfoBarWrapperInactive } from './NavBarIndicator.styles';

function InfoBar() {
  const { getStatusFieldsFromBoxQueryOptions } = useRouteContext({ from: '__root__' });
  const numberOFetches = useIsFetching({
    queryKey: getStatusFieldsFromBoxQueryOptions.queryKey,
  });

  const isFetching = numberOFetches > 0;
  const Component = isFetching ? InfoBarWrapper : InfoBarWrapperInactive;

  return (
    <Component
      role={isFetching ? 'status' : undefined}
      aria-live={isFetching ? 'polite' : undefined}
      aria-atomic="true"
    >
      {isFetching ? 'New box data is being fetched' : ''}
    </Component>
  );
}

export { InfoBar };
