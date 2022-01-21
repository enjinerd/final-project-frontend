import { Container } from "components/ui/container";
import { useHistory } from "react-router";
import { Breadcrumbs } from "components/user";

export const PageContent = ({ children }) => {
  const history = useHistory();

  return (
    <div className="flex flex-col flex-1 px-4 pb-12">
      <Breadcrumbs path={history.location.pathname} />
      <Container>{children}</Container>
    </div>
  );
};
