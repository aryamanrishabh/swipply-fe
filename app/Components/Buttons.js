export const SolidButton = (props) => {
  let className = `w-fit py-2 px-7 text-sm font-semibold tracking-widest rounded-lg text-white bg-slate-500 border-[2px] border-slate-500 ${props.className}`;
  const disabledClassName = "opacity-60 pointer-events-none";

  if (props.disabled) className = `${className} ${disabledClassName}`;

  return (
    <button {...props} className={className}>
      {props.children}
    </button>
  );
};

export const OutlineButton = (props) => {
  let className = `w-fit py-2 px-7 text-sm font-semibold tracking-widest rounded-lg bg-transparent border-[2px] text-slate-600 border-slate-500 ${props?.className}`;
  const disabledClassName = "opacity-60 pointer-events-none";

  if (props.disabled) className = `${className} ${disabledClassName}`;

  return (
    <button {...props} className={className}>
      {props.children}
    </button>
  );
};
