import { Container } from "@/components/ui/container";

export const PageContent = ({ children }) => {
  return (
    <div className="flex flex-col flex-1 px-4 pb-12">
      <Container>{children}</Container>
    </div>
  );
};
