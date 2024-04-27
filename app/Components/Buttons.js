export const SolidButton = (props) => {
  let className =
    "w-fit py-2 px-7 text-sm font-semibold tracking-wide rounded-full bg-slate-300 border-[1px] border-slate-300";
  const disabledClassName = "opacity-60 pointer-events-none";

  if (props.disabled) className = `${className} ${disabledClassName}`;

  return (
    <button
      {...props}
      className="w-fit py-2 px-7 text-sm font-semibold tracking-wide rounded-full bg-slate-300 border-[1px] border-slate-300"
    >
      {props.children}
    </button>
  );
};

export const OutlineButton = (props) => (
  <button
    {...props}
    className="w-fit py-2 px-7 text-sm font-semibold tracking-wide rounded-full bg-transparent border-[1px] border-black"
  >
    {props.children}
  </button>
);
