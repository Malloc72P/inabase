import { CustomLinkModel } from 'src/components/custom-link';
import { useNavigator } from 'src/hooks/use-navigator';

export function usePublicHeaderLinkModel() {
  const navigator = useNavigator();

  const onHomeClick = () => {
    navigator.moveTo.public.landing();
  };

  const onMainClick = () => {
    navigator.moveTo.protected.shows();
  };

  const onProjectClick = () => {
    navigator.moveTo.external.inabaseGithub();
  };

  const onDeveloperClick = () => {
    navigator.moveTo.external.malloc72pGithub();
  };

  const links: CustomLinkModel[] = [
    { label: 'Home', onClick: onHomeClick },
    { label: 'Shows', onClick: onMainClick },
    { label: 'Project', onClick: onProjectClick },
    { label: 'Developer', onClick: onDeveloperClick },
  ];

  return {
    links,
  };
}
