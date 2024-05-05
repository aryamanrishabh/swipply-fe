import Select from "react-select";

const customSelectStyles = {
  container: (baseStyles) => ({
    ...baseStyles,
    width: "100%",
  }),
  control: (baseStyles) => ({
    ...baseStyles,
    boxShadow: "none",
    minHeight: "unset",
    fontSize: "0.875rem",
    borderColor: "rgb(156 163 175)",
  }),
  valueContainer: (baseStyles) => ({
    ...baseStyles,
    justifyContent: "flex-start",
  }),
  indicatorSeparator: () => ({ display: "none" }),
};

const SelectDropdown = (props) => (
  <Select styles={customSelectStyles} {...props} />
);

export default SelectDropdown;
