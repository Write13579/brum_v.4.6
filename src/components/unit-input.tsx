import clsx from "clsx";

const UnitInput = ({
  unit,
  label,
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  id: string;
  unit?: string;
  label?: string;
}) => {
  return (
    <div className="flex flex-row items-center justify-center gap-2 group relative">
      {label && (
        <label
          htmlFor={props.id}
          className="font-bold w-36 after:absolute group-hover:after:w-16 after:w-0 after:h-[1.5px] after:bottom-0 after:left-0 after:bg-blue-400 transition-all after:duration-300 after:ease-in-out after:opacity-0 after:group-hover:opacity-100"
        >
          {label}:
        </label>
      )}

      <div className="flex items-center">
        <input
          type="phone"
          className={clsx(
            "bg-white/10 text-white px-4 h-8 max-w-36",
            unit ? "rounded-l-md" : "rounded-md"
          )}
          {...props}
        />
        {unit && (
          <div className="bg-white/20 text-white font-bold h-8 flex justify-center items-center px-4 rounded-r-md">
            {unit}
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitInput;
