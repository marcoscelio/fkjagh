import { ReactNode } from "react";

interface FormTemplateProps {
  children: ReactNode;
  loading: boolean;
  error?: boolean;
}

const FormTemplate = ({ children, loading }: FormTemplateProps) => {
  return (
    <div id="form_template" className={`flex p-1`}>
      <div className={`flex flex-col ${loading ? "" : ""}`}>{children}</div>
      {loading && (
        <div className="absolute right-1/2 h-screen top-1/2">
          <span className="loading loading-spinner text-success loading-lg"></span>
        </div>
      )}
    </div>
  );
};

export default FormTemplate;
